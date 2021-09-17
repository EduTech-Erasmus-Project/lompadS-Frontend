import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LompadService } from 'src/app/servicios/lompad.service';
import { AppMainComponent } from '../../app.main.component';

import { Message } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  objson: JSON;
  variable:any;
  mostrar:any;
  uploadedFiles: any[] = [];
  fileCharger:boolean=false;
  switch:boolean=false;
  

  form: FormGroup;  
    
  msgs: Message[] = [];
  
  

 constructor(
   public fb: FormBuilder,     
   private lompadservice: LompadService,
   private appMain:AppMainComponent,
   private cookieService:CookieService 
   
   ) 
   {
    this.form = this.fb.group({
      file: [null]
    });
    

   
  
}

mostrarAdvertencia(){
  this.msgs = [];
  this.msgs.push({ severity: 'warn', summary: 'Advertencia: ', detail: 'Asegúrese de haber descargado el objeto de aprendizaje anteriormente cargado.' });
}


ngOnInit(): void {   
  this.pregarga();  
}

pregarga(){//Usado para mostrar mensaje 
  //  var datosGenerales=JSON.parse(localStorage.getItem("perfil_hash"));//recuperacion DAtos
  if(this.cookieService.check("perfil")){//PILAS AQUI PUEDE SER EL PERFIL O TAMBIEN EL HASH    
    this.fileCharger=true;    
    this.appMain.staticMenuActive=true;
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'OK', detail: 'Objeto de aprendizaje cargado.' });
  }else{
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: '', detail: 'Por favor carge un objeto de aprendizaje.' });
  }   
  
}

// comprobacion(){
//   if (this.lompadservice.revLocal()!=null){
//     this.lompadservice.getobject(); 
//     this.appMain.staticMenuActive=true;
//     this.router.navigateByUrl("/paginas/general");    
//   }
// }

onUpload(event) {    
  // const file = (event.target as HTMLInputElement).files[0];
  const file = event.files[0];
  this.form.patchValue({
    file: file
  });
  this.form.get('file').updateValueAndValidity()   
     
  var formData: any = new FormData();
  formData.append("file", this.form.get('file').value);  
  this.cookieService.set("tipoArchivo",file.name.split(".")[1]);
  
  this.lompadservice.setArchivo(formData);
  this.appMain.staticMenuActive=true;
   //info warn error success
   this.msgs = [];
   this.msgs.push({ severity: 'success', summary: 'Correcto', detail: 'Objeto de aprendizaje cargado.' });
  // this.router.navigateByUrl("/paginas/general");
}

upload(event) {
    console.log("subir evento")
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      file: file
    });
    this.form.get('file').updateValueAndValidity()
 }



}

