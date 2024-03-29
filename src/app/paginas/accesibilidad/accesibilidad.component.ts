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
  accesibilityObject: any = {
    "accessibilityApi": {
      "compatibleResource":[]
    },
    "accessibilityControl": {
      "methods":[]
    },
    "accessibilityFeatures": {
      "resourceContent":[]
    },
    "accessibilityHazard": {
      "properties":[]
    },
    "description": {
      "description":[]
    }
  };
  objectOptions: ObjOptions = new ObjOptions();

  description: string;
  accessFeatures: any[];
  accessHazard: any[];
  accessControl: any[];
  accessApi: any[];

  flag: boolean = false;

  constructor(
    private componentePrincipal: AppComponent,
    private lompadService: LompadService
  ) { }

  ngOnInit(): void {
    this.loadAccesibilityData();

    this.accessFeatures = [
      { label: 'alternativeText', value: false, code: '1' },
      { label: 'annotations', value: false, code: '1' },
      { label: 'printPageNumbers', value: false, code: '1' },
      { label: 'audioDescription', value: false, code: 'ac' },
      { label: 'bookmarks', value: false, code: 'ac' },
      { label: 'readingOrder', value: false, code: 'ac' },
      { label: 'captions', value: false, code: 'ac' },
      { label: 'braille', value: false, code: 'ac' },
      { label: 'rubyAnnotations', value: false, code: 'ac' },
      { label: 'highContrastDisplay', value: false, code: 'ac' },
      { label: 'chemML', value: false, code: 'ac' },
      { label: 'tableOfContents', value: false, code: 'ac' },
      { label: 'longDescription', value: false, code: 'ac' },
      { label: 'describeMath', value: false, code: 'ac' },
      { label: 'taggedPDF ', value: false, code: 'ac' },
      { label: 'signLanguage', value: false, code: 'ac' },
      { label: 'index', value: false, code: 'ac' },
      { label: 'tactileGraphic', value: false, code: 'ac' },
      { label: 'structuralNavigation', value: false, code: 'ac' },
      { label: 'largePrint', value: false, code: 'ac' },
      { label: 'tactileObject', value: false, code: 'ac' },
      { label: 'synchronizedAudioText', value: false, code: 'ac' },
      { label: 'latex', value: false, code: 'ac' },
      { label: 'ttsMarkup', value: false, code: 'ac' },
      { label: 'timingControl', value: false, code: 'ac' },
      { label: 'mathML', value: false, code: 'ac' },
      { label: 'unlocked', value: false, code: 'ac' },
      { label: 'transcript', value: false, code: 'ac' },
      { label: 'none', value: false, code: 'ac' },
    ];

    this.accessHazard = [
      { label: 'flashingHazard', value: false, code: '1' },
      { label: 'noFlashingHazard', value: false, code: '1' },
      { label: 'motionSimulationHazard', value: false, code: '1' },
      { label: 'noMotionSimulationHazard', value: false, code: '1' },
      { label: 'soundHazard', value: false, code: '1' },
      { label: 'noSoundHazard', value: false, code: '1' }
    ]

    this.accessControl = [
      { label: 'fullKeyboardControl', value: false, code: '1' },
      { label: 'fullSwitchControl', value: false, code: '1' },
      { label: 'fullMouseControl', value: false, code: '1' },
      { label: 'fullTouchControl', value: false, code: '1' },
      { label: 'fullVoiceControl', value: false, code: '1' },
      { label: 'fullVideoControl', value: false, code: '1' },
    ]

    this.accessApi = [
      { label: 'ARIA', value: false, code: '1' },
      { label: 'androidAccessibility', value: false, code: '1' },
      { label: 'iosAccessibility', value: false, code: '1' },
      { label: 'ATK', value: false, code: '1' },
      { label: 'javaAccessibility', value: false, code: '1' },
      { label: 'AT-SPI', value: false, code: '1' },
      { label: 'macOSXAccessibility', value: false, code: '1' },
      { label: 'blackberryAccessibility', value: false, code: '1' },
      { label: 'MSAA', value: false, code: '1' },
      { label: 'iAccessible2', value: false, code: '1' },
      { label: 'uiAutomation', value: false, code: '1' }
    ]

    this.objectOptions = this.componentePrincipal.objOptions;

    this.setAccesibilityData();
  }

  loadAccesibilityData() {
    if (this.isEmpty(this.lompadService.objPricipal['accesibility'])) {
      this.accesibilityObject = this.lompadService.objPricipal['accesibility'];
      this.flag = true;
    }
  }

  setAccesibilityData() {
    if (this.flag) {
      this.description = this.accesibilityObject['description']['description'][0];
      console.log(" -------   "+this.accesibilityObject['accessibilityFeatures']['value']);
      var accessF: [] = this.accesibilityObject['accessibilityFeatures']['value'];
      var accessH: [] = this.accesibilityObject['accessibilityHazard']['value'];
      var accessC: [] = this.accesibilityObject['accessibilityControl']['value'];
      var accessA: [] = this.accesibilityObject['accessibilityApi']['value'];

      this.mapValues(accessF, this.accessFeatures);
      this.mapValues(accessH, this.accessHazard);
      this.mapValues(accessC, this.accessControl);
      this.mapValues(accessA, this.accessApi);
    } 
  }

  mapValues(param: any[], local: any[]) {
    param.forEach(element => {
      const busqueda = local.find(dato => dato.label == element);
      if (busqueda != undefined) {
        var palabra = (element) => element === busqueda;
        var index = local.findIndex(palabra);
        local[index].value = true;
      }
    });
  }

  updateArray(param: any[]) {
    const array = [];
    param.forEach(element => {
      if (element.value == true) {
        array.push(element.label);
      }
    });
    return array;
  }

  updateValues() {
    this.accesibilityObject['accessibilityFeatures']['resourceContent'] = this.updateArray(this.accessFeatures);
    this.accesibilityObject['accessibilityHazard']['properties'] = this.updateArray(this.accessHazard);
    this.accesibilityObject['accessibilityControl']['methods'] = this.updateArray(this.accessControl);
    this.accesibilityObject['accessibilityApi']['compatibleResource'] = this.updateArray(this.accessApi);
  }

  isEmpty(value: any[]) {
    if (typeof value !== 'undefined' && value) {
      return value;
    };
  }

  ngOnDestroy(): void {
    // console.log('[INFO]> Destroy Accessibility');

    this.accesibilityObject['description']['description'][0] = this.description;
    this.updateValues();

    this.lompadService.objPricipal['accesibility'] = this.accesibilityObject;
    this.lompadService.sendNewMetadata(this.accesibilityObject, 'accesibility');
  }

}
