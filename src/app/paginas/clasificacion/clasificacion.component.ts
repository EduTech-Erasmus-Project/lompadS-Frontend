import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ObjOptions } from 'src/app/modelo/objOptions';
import { LompadService } from '../../servicios/lompad.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit {
  propositos:any[];
  propositosSelect:string
  ObjOptions:ObjOptions=new ObjOptions();

  columns:any[];
  palabra:string;
  palabraDialog:boolean;
  objClasification:any;

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice:LompadService
  ) { }
  loadDatos(){
    this.objClasification=this.lompadservice.objPricipal['DATA']['classification'];
  }      
  ngOnDestroy():void {
    console.log("Destroy ciclo de vida");    
    this.lompadservice.objPricipal['DATA']['classification']=this.objClasification;
    this.lompadservice.saveObjectLompad(this.objClasification,"classification");  
  }       
  ngOnInit(): void {
    this.loadDatos();
    this.propositos=[
      {label: 'disciplina', value: 'discipline', code: 'dis'},
      {label: 'idea', value: 'idea', code: 'id'},
      {label: 'prerequisito', value:'prerequisite', code: 'pre'},
      {label: 'objetivo educativo', value:  'educational objective', code: 'o_b'},
      {label: 'accesibilidad', value: 'accessibility restrictions', code: 'acc'},
      {label: 'nivel educativo', value: 'educational level', code: 'n_ed'},
      {label: 'nivel de habilidad', value:  'skill level', code: 'n_hab'},
      {label: 'nivel de seguridad', value: 'security level', code: 'n_seg'},
      {label: 'competencia', value: 'competency', code: 'n_segsr'}
    ];

    this.ObjOptions=this.componentePrincipal.objOptions;
    this.columns = [];
    
    this.propositosSelect=this.objClasification["Purpose"];
    console.log("DEsde Calsificacion: ", this.objClasification);
    
  }

  addPalabra() {
    this.palabraDialog=true;
    
  }
  
  cancelPalabra(){
    this.palabraDialog=false;
  }
  
  removeColumn() {
    this.columns.splice(-1, 1);
  }
  
  savePalabra(){
    console.log(this.palabra);
    this.palabraDialog=false;
    this.columns.push(this.palabra);
    this.palabra="";
    
  }

  cambio_propositosSelect(){
    console.log(this.propositosSelect)
    this.objClasification["Purpose"]=this.propositosSelect;
  }






}
