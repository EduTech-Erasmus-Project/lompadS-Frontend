import { Component, OnInit, enableProdMode } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { ObjOptions } from 'src/app/modelo/objOptions';
import { LompadService } from '../../servicios/lompad.service';

@Component({
  selector: 'app-derechos',
  templateUrl: './derechos.component.html',
  styleUrls: ['./derechos.component.css']
})
export class DerechosComponent implements OnInit {
  decision:any[];
  coste:any[];
  decisionSelect:string;
  costeSelect:string;
  objderechos:any;
  
  ObjOptions:ObjOptions=new ObjOptions();
  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice:LompadService
  ) { }

  loadDatos(){
    this.objderechos=this.lompadservice.objPricipal['DATA']['rights'];
  }
     
     
  ngOnDestroy():void {
    console.log("Destroy Derechos");    
    this.lompadservice.objPricipal['DATA']['rights']=this.objderechos;
    this.lompadservice.saveObjectLompad(this.objderechos,"rights");  
  } 
          
  ngOnInit(): void {
    this.loadDatos();
    this.decision=[
      {label: 'si', value: 'yes', code: 'yes'},
      {label: 'no', value: 'no', code: 'no'}
    ];
    this.coste=[
      {label: 'si', value: 'yes', code: 'yes'},
      {label: 'no', value: 'no', code: 'no'}
    ];
    // this.objderechos=this.lompadservice.getDerechos();
    console.log("DEsde Derechos: ",this.objderechos);
    this.ObjOptions=this.componentePrincipal.objOptions;
    this.costeSelect=this.objderechos['Cost'];
    this.decisionSelect=this.objderechos['Copyright and Other Restrictions'];     
  }


  
    
  cambio_costeSelect(){
    console.log(this.costeSelect);
    this.objderechos['Cost']=this.costeSelect;
  }

  cambio_decisionSelect(){
    console.log(this.decisionSelect);
    this.objderechos['Copyright and Other Restrictions']=this.decisionSelect;    
  }
    
    
  // saveInfo(){
  //   this.lompadservice.setDerechos(this.objderechos);
  // }

}
