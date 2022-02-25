import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LompadService } from 'src/app/servicios/lompad.service';
import { AppMainComponent } from '../../app.main.component';

import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(public formBuilder: FormBuilder,
    private lompadService: LompadService,
    private appMain: AppMainComponent,
    private cookieService: CookieService,
    private translate: TranslateService,
    private messageService: MessageService) {

    this.form = this.formBuilder.group({
      file: [null]
    });
  }

  ngOnInit(): void {
    this.preLoad();
  }

  preLoad() {
    // Se puede usar el perfil o el hash code
    if (this.cookieService.check("perfil")) {
      this.fileCharger = true;
      this.appMain.staticMenuActive = true;
      this.messageService.clear();

      this.translate.get("Home.messageInfo").subscribe((mess: string) => {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: mess });
      });
    } else {
      this.messageService.clear();
      this.translate.get("Home.messageUpload").subscribe((mess: string) => {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: mess });
      });
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

    await this.lompadService.sendMetadataFile(formData).then((response) => {
      uploadedData = response;
    });

    // console.log('[DEBUG] Inicio Component> Response 1', uploadedData);
    if (uploadedData['statusCode'] == 200) {
      this.appMain.staticMenuActive = true;

      this.messageService.clear();
      this.translate.get("Home.messageInfo").subscribe((mess: string) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: mess });
      });
      
    } else {
      console.log('[ERROR] Inicio Component> Subir Archivo');
      this.appMain.staticMenuActive = false;

      this.messageService.clear();
      this.translate.get("Home.messageError").subscribe((mess: string) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: mess });
      });
      
    }

  }

  showDownloadWarning() {
    this.messageService.clear();
    this.translate.get("Home.messageWarning").subscribe((mess: string) => {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: mess });
    });
  }

}
