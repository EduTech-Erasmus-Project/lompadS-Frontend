import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ObjOptions } from 'src/app/modelo/objOptions';
import { LompadService } from '../../servicios/lompad.service';

@Component({
  selector: 'app-livecicle',
  templateUrl: './livecicle.component.html',
  styleUrls: ['./livecicle.component.css']
})
export class LivecicleComponent implements OnInit, OnDestroy {
  lifeCycleObject: any = {
    "version": {
      "version": []
    },
    "status": {
      "source": [],
      "value": []
    },
    "contribute": {
      "source": [],
      "role": [],
      "entity": [],
      "dateTime": [],
      "description": []
    }
  };
  objectOptions: ObjOptions = new ObjOptions();

  // Listas predefinidas
  roleOptions: any[];
  roleSelected: string;

  statusOptions: any[];
  statusSelected: string;
  // ----- 

  // Referente a los valores
  version: any[];
  entityName: string;
  entityLastname: string;
  entityEmail: string;
  entityOrganization: string;
  date: Date;
  dateDescription: string;

  flag: boolean = false;

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService
  ) { }

  ngOnInit(): void {
    this.loadLifeCycleData();

    this.roleOptions = [
      { label: 'Common.contribute.role.author', value: 'author', code: 'au' },
      { label: 'Common.contribute.role.validator', value: 'validator', code: 'rv' },
      { label: 'Common.contribute.role.unknown', value: 'unknown', code: 'des' },
      { label: 'Common.contribute.role.initiator', value: 'initiator', code: 'in' },
      { label: 'Common.contribute.role.terminator', value: 'terminator', code: 'ter' },
      { label: 'Common.contribute.role.publisher', value: 'publisher', code: 'ed' },
      { label: 'Common.contribute.role.editor', value: 'editor', code: '324' },
      { label: 'Common.contribute.role.graphicalDesigner', value: 'graphical designer', code: '324' },
      { label: 'Common.contribute.role.technicalImplementer', value: 'technical implementer', code: '345' },
      { label: 'Common.contribute.role.contentProvider', value: 'content provider', code: '645' },
      { label: 'Common.contribute.role.technicalValidator', value: 'technical validator', code: '6654' },
      { label: 'Common.contribute.role.educationalValidator', value: 'educational validator', code: '6654' },
      { label: 'Common.contribute.role.scriptWriter', value: 'script writer', code: '54' },
      { label: 'Common.contribute.role.instructionalDesigner', value: 'instructional designer', code: '76' },
      { label: 'Common.contribute.role.subjectMatterExpert', value: 'subject matter expert', code: '57' },
    ];

    this.statusOptions = [
      { label: 'LifeCycle.status.draft', value: 'draft', code: 'brr' },
      { label: 'LifeCycle.status.final', value: 'final', code: 'fin' },
      { label: 'LifeCycle.status.revised', value: 'revised', code: 'rev' },
      { label: 'LifeCycle.status.unavailable', value: 'unavailable', code: 'ndis' }
    ];

    this.objectOptions = this.componentePrincipal.objOptions;
    console.log('[INFO]> LifeCycle Component:', this.lifeCycleObject);

    this.setLifeCycleData();
  }

  loadLifeCycleData() {
    if (this.isEmpty(this.lompadservice.objPricipal['lifeCycle'])) {
      this.lifeCycleObject = this.lompadservice.objPricipal['lifeCycle'];
      this.flag = true;
    }
  }

  setLifeCycleData() {
    if (this.flag) {
      this.version = this.lifeCycleObject['version']['version'][0];
      this.statusSelected = this.lifeCycleObject['status']['value'][0];
      this.roleSelected = this.lifeCycleObject['contribute']['role'][0];
      if (this.lifeCycleObject['contribute']['entity'][0] != undefined) {
        this.castVcard(this.lifeCycleObject['contribute']['entity'][0]); 
      }
      if (this.lifeCycleObject['contribute']['dateTime'][0] != undefined) {
        this.date = new Date(this.lifeCycleObject['contribute']['dateTime'][0]); 
      }
      this.dateDescription = this.lifeCycleObject['contribute']['description'][0];
    }
  }

  castVcard(card: string) {//lanzar desde ngOninit    
    //en caso de que las vcard esten llegando sin saltos de linea
    const vcardElements = [' VERSION', ' FN', ' N', ' EMAIL', ' ORG', ' END:VCARD'];

    vcardElements.forEach(element => {
      card = card.replace(element, element.replace(' ', '\n'));
    });

    var fullNameExpression = /FN:(.*)/g;
    var organizationExpression = /ORG:(.*)/g;
    var emailExpression = /EMAIL;[^:]*:(.*)/g;
    var emptyVcard = 'BEGIN:VCARD\nVERSION:3.0\nN:ApellidoEntidad;Entidad1;;;\nFN:Entidad1 ApellidoEntidad\nEMAIL;TYPE=INTERNET:Sin Correo\nORG:Sin organizacion\nEND:VCARD';

    const mname = fullNameExpression.exec(card);
    const morg = organizationExpression.exec(card);
    const mmail = emailExpression.exec(card);

    // console.log(mname?.[1]);
    // console.log(morg?.[1]);
    // console.log(mmail?.[1]);

    var nombre = mname?.[1];
    var listnombreApell = nombre.split(' ');
    this.entityName = listnombreApell[0];
    this.entityLastname = listnombreApell[1];
    this.entityEmail = mmail?.[1];
    this.entityOrganization = morg?.[1];
  }

  updateVcard() {//lanzar desde ngOnDestroy
    if (this.entityLastname == undefined) {
      this.entityLastname = '';
    }

    if (this.entityName == undefined) {
      this.entityName = '';
    }

    if (this.entityEmail == undefined) {
      this.entityEmail = '';
    }

    if (this.entityOrganization == undefined) {
      this.entityOrganization = '';
    }

    const card = `BEGIN:VCARD\nVERSION:3.0
    N:${this.entityLastname?.trim()};${this.entityName?.trim()};;;
    FN:${this.entityName?.trim()} ${this.entityLastname?.trim()}
    EMAIL;TYPE=INTERNET:${this.entityEmail?.trim()}
    ORG:${this.entityOrganization?.trim()}
    END:VCARD`;

    this.lifeCycleObject['contribute']['entity'][0] = card;
  }

  changeStatus() {
    this.lifeCycleObject['status']['value'][0] = this.statusSelected;
  }

  changeContributeRole() {
    this.lifeCycleObject['contribute']['role'][0] = this.roleSelected;
  }

  isEmpty(value: any[]) {
    if (typeof value !== 'undefined' && value) {
      return value;
    };
  }

  ngOnDestroy(): void {
    console.log('[INFO]> Destroy LifeCycle');

    this.lifeCycleObject['version']['version'][0] = this.version; 
    this.updateVcard();
    if (this.date != undefined) {
      this.lifeCycleObject['contribute']['dateTime'][0] = this.date.toISOString();
    }
    this.lifeCycleObject['contribute']['description'][0] = this.dateDescription;

    this.lompadservice.objPricipal['lifeCycle'] = this.lifeCycleObject;
    this.lompadservice.sendNewMetadata(this.lifeCycleObject, 'lifeCycle');
  }

}
