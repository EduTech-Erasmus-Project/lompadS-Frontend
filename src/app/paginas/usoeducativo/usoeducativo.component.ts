import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ObjOptions } from 'src/app/modelo/objOptions';
import { LompadService } from '../../servicios/lompad.service';

@Component({
  selector: 'app-usoeducativo',
  templateUrl: './usoeducativo.component.html',
  styleUrls: ['./usoeducativo.component.css']
})
export class UsoeducativoComponent implements OnInit {

  
  ObjOptions:ObjOptions=new ObjOptions();
  tiposActividad:any[];
  tiposRecursEducativos:any[];
  nivelesInteractividad:any[];
  densiadesSemanticas:any[];
  destinatarios:any[];
  contextos:any[];
  dificultades:any[];
  edad:number;
  objUsoEdu:any[];

  //asdlkfjasdklj
  tiposActividadSelect:string
  tiposRecursEducativosSelect:string
  nivelesInteractividadSelect:string
  densiadesSemanticasSelect:string
  destinatariosSelect:string
  contextosSelect:string
  dificultadesSelect:string
  //
  years:number;
  months:number;
  days:number;
  hours:number;
  minutes:number;

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice:LompadService
    ) { }

  loadDatos(){
    this.objUsoEdu=this.lompadservice.objPricipal['DATA']['educational'];
  }
     
     
  ngOnDestroy():void {
    console.log("Destroy Uso Educativo");    
    this.saveTime();
    this.lompadservice.objPricipal['DATA']['educational']=this.objUsoEdu;
    this.lompadservice.saveObjectLompad(this.objUsoEdu,"educational");  
  }

  castTime(param:string){
    try {
      var one=param.split('DT')[0];
      var dos=param.split('DT')[1];
      one=one.substr(1,one.length);
      this.years=+one.split("Y")[0];
      this.months=+one.split("Y")[1].split("M")[0];      
      this.days=+one.split("Y")[1].split("M")[1];
  
      this.hours=+dos.split("H")[0];
      this.minutes=+dos.split("H")[1].split('M')[0];    
      
    } catch (error) {
      console.log(error)
    }
    
  }

  saveTime(){
    this.objUsoEdu['Typical Learning Time']="P"+this.years+"Y"+this.months+"M"+this.days+"DT"+this.hours+"H"+this.minutes+"M"
    // console.log("P"+this.years+"Y"+this.months+"M"+this.days+"DT"+this.hours+"H"+this.minutes+"M")
  }
   
       

  ngOnInit(): void {
    this.loadDatos();
    this.castTime(this.objUsoEdu['Typical Learning Time']);
    this.tiposActividad=[
      {label: 'Activo', value: 'active', code: 'ac'},
      {label: 'Expositivo', value: 'expositive', code: 'ex'},    
      {label: 'Combinado', value:  'mixed', code: 'com'} 
    ];

    this.tiposRecursEducativos=[
      {label: 'Ejercicio', value: 'exercise', code: 'ejer'},
      {label: 'Simulación', value: 'simulation', code: 'sim'},
      {label: 'Cuestionario', value: 'questionnarie', code: 'cuest'},
      {label: 'Diagrama', value: 'diagram', code: 'dia'},
      {label: 'Figura', value: 'figure', code: 'fig'},
      {label: 'Gráfico', value: 'graph', code: 'gra'},
      {label: 'Indice', value:  'index', code: 'in'},
      {label: 'Diapositiva', value:  'slide', code: 'in'},
      {label: 'tabla', value:  'table', code: 'in'},
      {label: 'texto narrativo', value:  'narrative text', code: 'in'},
      {label: 'examen', value:  'exam', code: 'in'},
      {label: 'experimento', value:  'experiment', code: 'in'},
      {label: 'planteamiento del problema', value:  'problem statement', code: 'in'},
      {label: 'autoevaluacion', value:  'self assessment', code: 'in'},
      {label: 'conferencia', value:  'lecture', code: 'in'},
      
     
    ];
    this.nivelesInteractividad=[
      {label: 'muy bajo', value: 'very low', code: 'mb'},
      {label: 'bajo', value: 'low', code: 'baj'},
      {label: 'medio', value: 'medium', code: 'med'},
      {label: 'alto', value: 'high', code: 'alt'},
      {label: 'muy alto', value: 'very high', code: '34523'},
    ];
    this.densiadesSemanticas=[
      {label: 'muy bajo', value: 'very low', code: 'mb'},
      {label: 'bajo', value: 'low', code: 'baj'},
      {label: 'medio', value: 'medium', code: 'med'},
      {label: 'alto', value: 'high', code: 'alt'},
      {label: 'muy alto', value: 'very high', code: '34523'},
    ];
    this.destinatarios=[
      {label: 'autor', value: 'author', code: 'aut'},
      {label: 'profesor', value: 'theacher', code: 'pro'},
      {label: 'aprendiz', value: 'learner', code: 'aprend'},
      {label: 'admimistrador', value: 'manager', code: 'mana'}  
    ];
    this.contextos=[
      {label: 'escuela', value:  'school', code: 'es'},    
      {label: 'educación secundaria', value: 'higher education', code: 'edu_s'},    
      {label: 'entrenamiento', value: 'training', code: 'entre'},    
      {label: 'otro', value:  'other', code: 'otro'},    

    ];
    this.dificultades=[
      {label: 'muy facíl', value:  'very easy', code: 'mf'},    
      {label: 'facíl', value: 'easy', code: 'f'},    
      {label: 'medio', value: 'medium', code: 'm'},    
      {label: 'dificíl', value: 'difficult', code: 'd'},
      {label: 'muy dificíl', value:'very difficult', code: 'md'}
    ];

    this.ObjOptions=this.componentePrincipal.objOptions;

    // this.objUsoEdu=this.lompadservice.getUsoEducativo();
    console.log("DEsde Uso Edu: ", this.objUsoEdu);

    this.tiposActividadSelect=this.objUsoEdu["Interactivity Type"];
    this.tiposRecursEducativosSelect=this.objUsoEdu["Learning Resource Type"];
    this.nivelesInteractividadSelect=this.objUsoEdu["Interactivity Level"];
    this.densiadesSemanticasSelect=this.objUsoEdu["Semantic Density"];
    this.destinatariosSelect=this.objUsoEdu["Intended End User Roles"];
    this.contextosSelect=this.objUsoEdu["Context"];
    this.dificultadesSelect=this.objUsoEdu["Difficulty"];

    this.edad=+this.objUsoEdu["Typical Age Range"];


    
  }



  
                                  
    cambio_tiposActividad(){
      console.log(this.tiposActividadSelect)
      this.objUsoEdu["Interactivity Type"]=this.tiposActividadSelect;
    }

    cambio_tiposRecursEducativos(){
      console.log(this.tiposRecursEducativosSelect);
      this.objUsoEdu["Learning Resource Type"]=this.tiposRecursEducativosSelect;
    }
    
    cambio_nivelesInteractividadSelect(){
      console.log(this.nivelesInteractividadSelect);
      this.objUsoEdu["Interactivity Level"]=this.nivelesInteractividadSelect;
    }

    cambio_densiadesSemanticasSelect(){
      console.log(this.densiadesSemanticasSelect);
      this.objUsoEdu["Semantic Density"]=this.densiadesSemanticasSelect;
    }
    
    cambio_destinatariosSelect(){
      console.log(this.destinatariosSelect);
      this.objUsoEdu["Intended End User Roles"]=this.destinatariosSelect;
    }
    
    cambio_contextosSelect(){
      console.log(this.contextosSelect)  
      this.objUsoEdu["Context"]=this.contextosSelect;
    }
    
    cambio_dificultadesSelect(){
      console.log(this.dificultadesSelect);
      this.objUsoEdu["Difficulty"]=this.dificultadesSelect;
    }


}
