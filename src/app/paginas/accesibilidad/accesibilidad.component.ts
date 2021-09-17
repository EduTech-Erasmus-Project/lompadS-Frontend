import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from '../../app.component';
import { LompadService } from '../../servicios/lompad.service';
import { ObjOptions } from '../../modelo/objOptions';

@Component({
  selector: 'app-accesibilidad',
  templateUrl: './accesibilidad.component.html',
  styleUrls: ['./accesibilidad.component.css']
})
export class AccesibilidadComponent implements OnInit, OnDestroy {
  accessFeatures:any[];
  accessHazard:any[];
  accessControl:any[];
  accessApi:any[]; 
  objAccess:any;
  ObjOptions:ObjOptions=new ObjOptions();
  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService    
  ) { } 

  loadDatos(){
    this.objAccess=this.lompadservice.objPricipal['DATA']['accesibility'];
    var accessF:[]=this.objAccess['Accessibility Features']['Resource Content']['br'];
    var accessH:[]=this.objAccess['Accessibility Hazard']['Properties']['br'];
    var accessC:[]=this.objAccess['Accessibility Control']['Methods']['br'];
    var accessA:[]=this.objAccess['Accessibility API']['Compatible Resource']['br'];
            
    this.mapValues(accessF,this.accessFeatures);
    this.mapValues(accessH,this.accessHazard);
    this.mapValues(accessC,this.accessControl);
    this.mapValues(accessA,this.accessApi);
  }

  mapValues(param:any[], local:any[]){    
    param.forEach(element => {           
      const busqueda=local.find(dato => dato.label==element);      
      if(busqueda!=undefined){  
        // console.log("MATCH: ",busqueda);
        var palabra= (element) => element === busqueda;
        var index= local.findIndex(palabra);
        local[index].value=true;
      }       
    });
  }

  updateArray(param:any[]){
    const array=[];
    param.forEach(element => {      
      if(element.value==true){        
        array.push(element.label);
      }
    });
    return array;
  }

  updateValues(){
    // var accessH_update:any[]=this.updateArray(this.accessApi);
    this.objAccess['Accessibility Features']['Resource Content']['br']=this.updateArray(this.accessFeatures);
    this.objAccess['Accessibility Hazard']['Properties']['br']=this.updateArray(this.accessHazard);
    this.objAccess['Accessibility Control']['Methods']['br']=this.updateArray(this.accessControl);
    this.objAccess['Accessibility API']['Compatible Resource']['br']=this.updateArray(this.accessApi);
    
  }
  

   
  ngOnDestroy():void{
    console.log("Destroy Accesibilidad: ")
    this.updateValues();
    this.lompadservice.objPricipal['DATA']['accesibility']=this.objAccess;
    this.lompadservice.saveObjectLompad(this.objAccess,"accesibility");  
  }
  ngOnInit(): void {        
    this.ObjOptions=this.componentePrincipal.objOptions;                                    
    this.accessFeatures=[
      {label: 'alternativeText', value: false, code: '1'},            
      {label: 'annotations', value: false, code: '1'},            
      {label: 'printPageNumbers', value: false, code: '1'},            
      {label: 'audioDescription', value: false, code: 'ac'},            
      {label: 'bookmarks', value: false, code: 'ac'},            
      {label: 'readingOrder', value: false, code: 'ac'},            
      {label: 'captions', value: false, code: 'ac'},
      {label: 'braille', value: false, code: 'ac'},            
      {label: 'rubyAnnotations', value: false, code: 'ac'},              
      {label: 'highContrastDisplay', value: false, code: 'ac'},            
      {label: 'chemML', value: false, code: 'ac'},            
      {label: 'tableOfContents', value: false, code: 'ac'},  
      {label: 'jongDescription', value: false, code: 'ac'},            
      {label: 'describeMath', value: false, code: 'ac'},            
      {label: 'taggedPDF ', value: false, code: 'ac'},  
      {label: 'signLanguage', value: false, code: 'ac'},  
      {label: 'index', value: false, code: 'ac'},            
      {label: 'tactileGraphic', value: false, code: 'ac'},            
      {label: 'structuralNavigation', value: false, code: 'ac'},            
      {label: 'largePrint', value: false, code: 'ac'},            
      {label: 'tactileObject', value: false, code: 'ac'},  
      {label: 'synchronizedAudioText', value: false, code: 'ac'},            
      {label: 'latex', value: false, code: 'ac'},            
      {label: 'ttsMarkup', value: false, code: 'ac'},  
      {label: 'timingControl', value: false, code: 'ac'},            
      {label: 'mathML', value: false, code: 'ac'},            
      {label: 'unlocked', value: false, code: 'ac'},  
      {label: 'transcript', value: false, code: 'ac'}, 
      {label: 'none', value: false, code: 'ac'},                  
    ];     
        
    this.accessHazard=[      
      {label: 'FlashingHazard', value: false, code: '1'},            
      {label: 'noFlashingHazard', value: false, code: '1'},            
      {label: 'motionSimulationHazard', value: false, code: '1'},            
      {label: 'noMotionSimulationHazard', value: false, code: '1'},            
      {label: 'soundHazard', value: false, code: '1'},            
      {label: 'noSoundHazard', value: false, code: '1'}                 
    ]
                             
    this.accessControl=[
      {label: 'fullKeyboardControl', value: false, code: '1'},            
      {label: 'fullSwitchControl', value: false, code: '1'},            
      {label: 'fullMouseControl', value: false, code: '1'},            
      {label: 'fullTouchControl', value: false, code: '1'},            
      {label: 'fullVoiceControl', value: false, code: '1'},            
      {label: 'fullVideoControl', value: false, code: '1'},            

    ]                                           
    
    this.accessApi=[
      {label: 'ARIA', value: false, code: '1'},            
      {label: 'androidAccessibility', value: false, code: '1'},            
      {label: 'iosAccessibility', value: false, code: '1'},            
      {label: 'ATK', value: false, code: '1'},            
      {label: 'javaAccessibility', value: false, code: '1'},            
      {label: 'AT-SPI', value: false, code: '1'},            
      {label: 'macOsxAccessibility', value: false, code: '1'},            
      {label: 'blackberryAccessibility', value: false, code: '1'},            
      {label: 'MSAA', value: false, code: '1'},            
      {label: 'iAccessible2', value: false, code: '1'},            
      {label: 'ulAutomation', value: false, code: '1'}               
    ]
    this.loadDatos();
  }

  changeAccessFeatures(event, param){
    console.log("parametro : ",event.checked);
  }

}
