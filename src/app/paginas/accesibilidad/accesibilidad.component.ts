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
  accesibilityObject: any;
  objectOptions: ObjOptions = new ObjOptions();

  description: string;
  accessFeatures: any[];
  accessHazard: any[];
  accessControl: any[];
  accessApi: any[];

  constructor(
    private componentePrincipal: AppComponent,
    private lompadService: LompadService
  ) { }

  ngOnInit(): void {
    this.loadAccesibilityData();

    this.accessFeatures = [
      { label: 'Accessibility.accessibilityFeatures.alternativeText', value: false, code: '1' },
      { label: 'Accessibility.accessibilityFeatures.annotations', value: false, code: '1' },
      { label: 'Accessibility.accessibilityFeatures.printPageNumbers', value: false, code: '1' },
      { label: 'Accessibility.accessibilityFeatures.audioDescription', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.bookmarks', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.readingOrder', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.captions', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.braille', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.rubyAnnotations', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.highContrastDisplay', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.chemML', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.tableOfContents', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.longDescription', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.describeMath', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.taggedPDF ', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.signLanguage', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.index', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.tactileGraphic', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.structuralNavigation', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.largePrint', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.tactileObject', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.synchronizedAudioText', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.latex', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.ttsMarkup', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.timingControl', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.mathML', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.unlocked', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.transcript', value: false, code: 'ac' },
      { label: 'Accessibility.accessibilityFeatures.none', value: false, code: 'ac' },
    ];

    this.accessHazard = [
      { label: 'Accessibility.accessibilityHazard.flashingHazard', value: false, code: '1' },
      { label: 'Accessibility.accessibilityHazard.noFlashingHazard', value: false, code: '1' },
      { label: 'Accessibility.accessibilityHazard.motionSimulationHazard', value: false, code: '1' },
      { label: 'Accessibility.accessibilityHazard.noMotionSimulationHazard', value: false, code: '1' },
      { label: 'Accessibility.accessibilityHazard.soundHazard', value: false, code: '1' },
      { label: 'Accessibility.accessibilityHazard.noSoundHazard', value: false, code: '1' }
    ]

    this.accessControl = [
      { label: 'Accessibility.accessibilityControl.fullKeyboardControl', value: false, code: '1' },
      { label: 'Accessibility.accessibilityControl.fullSwitchControl', value: false, code: '1' },
      { label: 'Accessibility.accessibilityControl.fullMouseControl', value: false, code: '1' },
      { label: 'Accessibility.accessibilityControl.fullTouchControl', value: false, code: '1' },
      { label: 'Accessibility.accessibilityControl.fullVoiceControl', value: false, code: '1' },
      { label: 'Accessibility.accessibilityControl.fullVideoControl', value: false, code: '1' },
    ]

    this.accessApi = [
      { label: 'Accessibility.accessibilityAPI.aria', value: false, code: '1' },
      { label: 'Accessibility.accessibilityAPI.androidAccessibility', value: false, code: '1' },
      { label: 'Accessibility.accessibilityAPI.iosAccessibility', value: false, code: '1' },
      { label: 'Accessibility.accessibilityAPI.atk', value: false, code: '1' },
      { label: 'Accessibility.accessibilityAPI.javaAccessibility', value: false, code: '1' },
      { label: 'Accessibility.accessibilityAPI.atSPI', value: false, code: '1' },
      { label: 'Accessibility.accessibilityAPI.macOSXAccessibility', value: false, code: '1' },
      { label: 'Accessibility.accessibilityAPI.blackberryAccessibility', value: false, code: '1' },
      { label: 'Accessibility.accessibilityAPI.msaa', value: false, code: '1' },
      { label: 'Accessibility.accessibilityAPI.iAccessible2', value: false, code: '1' },
      { label: 'Accessibility.accessibilityAPI.uiAutomation', value: false, code: '1' }
    ]

    this.objectOptions = this.componentePrincipal.objOptions;

    this.setAccesibilityData();
  }

  loadAccesibilityData() {
    this.accesibilityObject = this.lompadService.objPricipal['accesibility'];
  }

  setAccesibilityData() {
    this.description = this.accesibilityObject['description']['description'][0];
    var accessF: [] = this.accesibilityObject['accessibilityFeatures']['resourceContent'];
    var accessH: [] = this.accesibilityObject['accessibilityHazard']['properties'];
    var accessC: [] = this.accesibilityObject['accessibilityControl']['methods'];
    var accessA: [] = this.accesibilityObject['accessibilityApi']['compatibleResource'];

    this.mapValues(accessF, this.accessFeatures);
    this.mapValues(accessH, this.accessHazard);
    this.mapValues(accessC, this.accessControl);
    this.mapValues(accessA, this.accessApi);
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

  ngOnDestroy(): void {
    console.log('[INFO]> Destroy Accessibility');

    this.accesibilityObject['description']['description'][0] = this.description;
    this.updateValues();

    this.lompadService.objPricipal['accesibility'] = this.accesibilityObject;
    this.lompadService.sendNewMetadata(this.accesibilityObject, 'accesibility');
  }

}
