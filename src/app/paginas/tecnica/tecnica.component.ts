import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ObjOptions } from 'src/app/modelo/objOptions';
import { LompadService } from '../../servicios/lompad.service';


@Component({
  selector: 'app-tecnica',
  templateUrl: './tecnica.component.html',
  styleUrls: ['./tecnica.component.css']
})
export class TecnicaComponent implements OnInit {
  tiposOr:any[];
  tiposSystem:any[];
  objTecnica:any;
  req_tipo_select:string;
  nombreSelect:string
  years:number;
  months:number;
  days:number;
  hours:number;
  minutes:number;


  ObjOptions:ObjOptions=new ObjOptions();
  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice:LompadService
    ) { }
   
    loadDatos(){
      this.objTecnica=this.lompadservice.objPricipal['DATA']['technical'];
      try {
        this.castTime(this.objTecnica['Duration']); 
      } catch (error) {
        console.log("Controlado: años meses ...etc");
      }
      
    }
    castTime(param:string){
      var one=param.split('DT')[0];
      var dos=param.split('DT')[1];
      one=one.substr(1,one.length);
      this.years=+one.split("Y")[0];
      this.months=+one.split("Y")[1].split("M")[0];      
      this.days=+one.split("Y")[1].split("M")[1];

      this.hours=+dos.split("H")[0];
      this.minutes=+dos.split("H")[1].split('M')[0];    
      
    }

    saveTime(){
      this.objTecnica['Duration']="P"+this.years+"Y"+this.months+"M"+this.days+"DT"+this.hours+"H"+this.minutes+"M"
      // console.log("P"+this.years+"Y"+this.months+"M"+this.days+"DT"+this.hours+"H"+this.minutes+"M")
    }
          
     
    ngOnDestroy():void {
      console.log("Destroy tecnica"); 
      this.saveTime();
      this.lompadservice.objPricipal['DATA']['technical']=this.objTecnica;
      this.lompadservice.saveObjectLompad(this.objTecnica,"technical");  
    }
         
  ngOnInit(): void {
    this.loadDatos();
    this.tiposOr=[
      {label: 'Sistema Operativo', value:  'operating system', code: 'sys_o'},
      {label: 'Navegador', value:  'browser', code: 'nav'}    
    ];

    this.tiposSystem=[
      {label: 'pc-dos', value:  'pc-dos', code: 'sys_o'},
      {label: 'ms-windows', value:  'ms-windows', code: 'nav'},    
      {label: 'macos', value:  'macos', code: 'nav'},    
      {label: 'unix', value:  'unix', code: 'nav'},    
      {label: 'multi-os', value:  'multi-os', code: 'nav'},    
      {label: 'Ninguno', value:  'none', code: 'nav'}
    ];

    this.ObjOptions=this.componentePrincipal.objOptions;
    // this.objTecnica=this.lompadservice.getObjTecnica();
    console.log("DEsde TEcnica: ",this.objTecnica);
    this.req_tipo_select=this.objTecnica['Requirement']['OrComposite']['Type'];
    this.nombreSelect=this.objTecnica['Requirement']['OrComposite']['Name'];
    
  }


  cambioreq_tipo_select(){
    console.log(this.req_tipo_select);
    this.objTecnica['Requirement']['OrComposite']['Type']=this.req_tipo_select
  }

  cambioreq_nombre(){
    console.log(this.nombreSelect);    
    this.objTecnica['Requirement']['OrComposite']['Name']=this.nombreSelect;
  }
      

}
