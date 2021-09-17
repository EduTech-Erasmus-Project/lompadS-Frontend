import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ObjOptions } from 'src/app/modelo/objOptions';
import { LompadService } from '../../servicios/lompad.service';

@Component({
  selector: 'app-anotacion',
  templateUrl: './anotacion.component.html',
  styleUrls: ['./anotacion.component.css']
})
export class AnotacionComponent implements OnInit {
  ObjOptions:ObjOptions=new ObjOptions();
  modo_acceso:any[];
  modo_suficiente:any[];
  rol:any[];
  fecha:any;

  modo_accesoSelect:string;
  modo_suficienteSelect:string;
  rolSelect:string;

  nombreNew:string;
  apellidoNew:string;
  mailNew:string;
  organizacionNew:string;

  objAnotacion:any;
  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService
  ) { }

  loadDatos(){
    this.objAnotacion=this.lompadservice.objPricipal['DATA']['annotation'];
  }      
  ngOnDestroy():void {
    console.log("Destroy ciclo de vida");    
    this.actualizarVcard();
    this.objAnotacion["Date"]=this.fecha.toISOString();
    this.lompadservice.objPricipal['DATA']['annotation']=this.objAnotacion;
    this.lompadservice.saveObjectLompad(this.objAnotacion,"annotation");  
  }     
  ngOnInit(): void {
    this.loadDatos();
    this.castVcard(this.objAnotacion["Entity"]);
    this.ObjOptions=this.componentePrincipal.objOptions;
    this.modo_acceso=[
      {label: 'visual', value: 'visual', code: 'visu'},
      {label: 'auditivo', value:  'auditory', code: 'wartg'},
      {label: 'texto', value:  'tex', code: 'text'},
      {label: 'tactil', value: 'tactile', code: 'tac'}
    ];

    this.modo_suficiente=[
      {label: 'visual', value: 'visual', code: 'visu'},
      {label: 'auditivo', value:  'auditory', code: 'audi'},
      {label: 'texto', value:  'tex', code: 'text'},
      {label: 'tactil', value: 'tactile', code: 'tac'}
    ];

    this.rol=[
      {label: 'Estudiantes', value:  'student', code: 'est'},
      {label: 'Profesores', value:  'teachers', code: 'prof'},
      {label: 'Aplicación', value: 'application', code: 'app'}      
    ];
    
    this.modo_accesoSelect=this.objAnotacion["Mode Access"];
    this.modo_suficienteSelect=this.objAnotacion["Mode Access Sufficient"];
    this.rolSelect=this.objAnotacion["Rol"];
    this.fecha=new Date(this.objAnotacion["Date"]);    
    console.log("Desde Anotacion: ",this.objAnotacion);
    
  }

  castVcard(card:string){//lanzar desde ngOninit    
    //en caso de que las vcard esten llegando sin saltos de linea
    const keyys=[" VERSION", " FN", " N", " EMAIL", " ORG", " END:VCARD"];

    keyys.forEach(element =>{
      card=card.replace(element,element.replace(" ","\n"))
    });

    // var inicial=card;
    // inicial=inicial.replace(" ","_");
    // var list=inicial.split("\n");
    // // console.log(list);

    // var varN=list[2].substring(2,list[2].length);
    // var list_varN=varN.split(";")      
    // var nombre=list_varN[1];
    // var apellido=list_varN[0];

    // var mail=list[4].split(":")[1];
    // var organization=list[5].split(":")[1];

    var fname = /FN:(.*)/g;
    var org = /ORG:(.*)/g;
    var mail = /EMAIL;[^:]*:(.*)/g;
    var str = 'BEGIN:VCARD\nVERSION:3.0\nN:ApellidoEntidad;Entidad1;;;\nFN:Entidad1 ApellidoEntidad\nEMAIL;TYPE=INTERNET:Sin Correo\nORG:Sin organizacion\nEND:VCARD';
    
    
    const mname = fname.exec(str);
    const morg = org.exec(str);
    const mmail = mail.exec(str);


    console.log(mname?.[1]);
    console.log(morg?.[1]);
    console.log(mmail?.[1]);

    var nombre=mname?.[1];
    var listnombreApell=nombre.split(" ");
    this.nombreNew=listnombreApell[0];
    this.apellidoNew=listnombreApell[1];
    
    this.mailNew=mmail?.[1];
    
    this.organizacionNew=morg?.[1];
                 

}

actualizarVcard(){//lanzar desde ngOnDestroy

  const card=`BEGIN:VCARD\nVERSION:3.0
    N:${this.apellidoNew.trim()};${this.nombreNew.trim()};;;
    FN:${this.nombreNew.trim()} ${this.apellidoNew.trim()}
    EMAIL;TYPE=INTERNET:${this.mailNew.trim()}
    ORG:${this.organizacionNew.trim()}
    END:VCARD`          
    this.objAnotacion["Entity"]=card;
  // var carrd=card;
  // var inicial=card;
  //   inicial=inicial.replace(" ","_");
  //   var list=inicial.split("\n");
    

  //   var varN=list[2].substring(2,list[2].length);
  //   var list_varN=varN.split(";")      
  //   var nombre=list_varN[1];
  //   var apellido=list_varN[0];

  //   var mail=list[4].split(":")[1];
  //   var organization=list[5].split(":")[1];
  
  //   carrd=carrd.replace(nombre,this.nombreNew.trim());
  //   carrd=carrd.replace(apellido,this.apellidoNew.trim());
  //   carrd=carrd.replace(mail,this.mailNew.trim());
  //   carrd=carrd.replace(organization,this.organizacionNew.trim());   
  //   const temFN=carrd.split("\n");
  //   temFN[3]="FN:"+this.nombreNew.trim()+" "+this.apellidoNew.trim();
  //   var final:string="";
  //   temFN.forEach(element => {
  //     final+=element+"\n";        
  //   });
  //   final=final.substring(0,final.length-1);
  //   console.log("fiNal card: ",final);
}


  cambio_modo_accesoSelect(){
    console.log(this.modo_accesoSelect);
    this.objAnotacion["Mode Access"]=this.modo_accesoSelect;
  }    

  cambio_modo_suficienteSelect(){
    console.log(this.modo_suficienteSelect);
    this.objAnotacion["Mode Access Sufficient"]=this.modo_suficienteSelect;
  }

  cambio_rolSelect(){
    console.log(this.rolSelect);
    this.objAnotacion["Rol"]=this.rolSelect; 
  }
    
     

}
