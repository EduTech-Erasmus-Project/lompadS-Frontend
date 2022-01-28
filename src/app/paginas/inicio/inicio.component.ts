import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LompadService } from 'src/app/servicios/lompad.service';
import { AppMainComponent } from '../../app.main.component';

import { Message } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  fileCharger: boolean = false;
  switch: boolean = false;

  eventSubscription: any;

  form: FormGroup;
  message: Message[] = [];

  constructor(public formBuilder: FormBuilder,
    private lompadService: LompadService,
    private appMain: AppMainComponent,
    private cookieService: CookieService) {

    this.form = this.formBuilder.group({
      file: [null]
    });
  }


  ngOnInit(): void {
    this.preLoad();
  }

  preLoad() {//Usado para mostrar mensaje 
    //  var datosGenerales=JSON.parse(localStorage.getItem("perfil_hash"));//recuperacion DAtos
    if (this.cookieService.check("perfil")) {//PILAS AQUI PUEDE SER EL PERFIL O TAMBIEN EL HASH    
      this.fileCharger = true;
      this.appMain.staticMenuActive = true;
      this.message = [];
      this.message.push({ severity: 'info', summary: 'OK', detail: 'Objeto de aprendizaje cargado.' });
    } else {
      this.message = [];
      this.message.push({ severity: 'info', summary: '', detail: 'Por favor cargue un objeto de aprendizaje.' });
    }
  }

  async onUpload(event) {
    const file = event.files[0];

    this.form.patchValue({
      file: file
    });

    this.form.get('file').updateValueAndValidity();

    var formData: any = new FormData();
    formData.append("file", this.form.get('file').value);

    this.cookieService.set("tipoArchivo", file.name.split(".")[1]);

    let uploadedData: any;
    let readData: any;

    await this.lompadService.sendMetadataFile(formData).then((response) => {
      uploadedData = response;
    });

    console.log('[DEBUG] Inicio Component> Response 1', uploadedData);

    if (uploadedData['statusCode'] == 200) {
      this.appMain.staticMenuActive = true;

      this.message = [];
      this.message.push({
        severity: 'success',
        summary: 'Correcto:',
        detail: 'Objeto de aprendizaje cargado.'
      });

    } else {
      console.log('[ERROR] Inicio Component> Subir Archivo');

      this.appMain.staticMenuActive = false;

      this.message = [];
      this.message.push({
        severity: 'error',
        summary: 'Error:',
        detail: 'Algo ha ocurrido, intente nuevamente.'
      });
    }

    // this.router.navigateByUrl("/paginas/general");
  }

  showDownloadWarning() {
    this.message = [];
    this.message.push({ severity: 'warn', summary: 'Advertencia: ', detail: 'Asegúrese de haber descargado el objeto de aprendizaje anteriormente cargado.' });
  }

}
