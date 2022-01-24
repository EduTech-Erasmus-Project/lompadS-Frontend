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
  lifeCycleObject: any;
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

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService
  ) { }

  ngOnInit(): void {
    this.loadLifeCycleData();

    this.roleOptions = [
      { label: 'Autor', value: 'author', code: 'au' },
      { label: 'Revisor', value: 'validator', code: 'rv' },
      { label: 'Desconocido', value: 'unknown', code: 'des' },
      { label: 'iniciador', value: 'initiator', code: 'in' },
      { label: 'terminador', value: 'terminator', code: 'ter' },
      { label: 'editor', value: 'publisher', code: 'ed' },
      { label: 'escritor', value: 'editor', code: '324' },
      { label: 'diseñador grafico', value: 'graphical designer', code: '324' },
      { label: 'desarrollador técnico', value: 'technical implementer', code: '345' },
      { label: 'proveedor de contenido', value: 'content provider', code: '645' },
      { label: 'revisor técnico', value: 'technical validator', code: '6654' },
      { label: 'revisor educativo', value: 'educational validator', code: '6654' },
      { label: 'guionista', value: 'script writer', code: '54' },
      { label: 'diseñador educativo', value: 'instructional designer', code: '76' },
      { label: 'experto en la materia', value: 'subject matter expert', code: '57' },
    ];

    this.statusOptions = [
      { label: 'borrador', value: 'draft', code: 'brr' },
      { label: 'final', value: 'final', code: 'fin' },
      { label: 'revisado', value: 'revised', code: 'rev' },
      { label: 'no disponible', value: 'unavailable', code: 'ndis' }
    ];

    this.objectOptions = this.componentePrincipal.objOptions;
    console.log('[INFO]> LifeCycle Component:', this.lifeCycleObject);

    this.setLifeCycleData();
  }

  loadLifeCycleData() {
    this.lifeCycleObject = this.lompadservice.objPricipal['lifeCycle'];
  }

  setLifeCycleData() {
    this.version = this.lifeCycleObject['version']['version'][0];
    this.statusSelected = this.lifeCycleObject['status']['value'][0];
    this.roleSelected = this.lifeCycleObject['contribute']['role'][0];
    this.castVcard(this.lifeCycleObject['contribute']['entity'][0]);
    this.date = new Date(this.lifeCycleObject['contribute']['dateTime'][0]);
    this.dateDescription = this.lifeCycleObject['contribute']['description'][0];
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

    console.log(mname?.[1]);
    console.log(morg?.[1]);
    console.log(mmail?.[1]);

    var nombre = mname?.[1];
    var listnombreApell = nombre.split(' ');
    this.entityName = listnombreApell[0];
    this.entityLastname = listnombreApell[1];
    this.entityEmail = mmail?.[1];
    this.entityOrganization = morg?.[1];
  }

  updateVcard() {//lanzar desde ngOnDestroy
    const card = `BEGIN:VCARD\nVERSION:3.0
    N:${this.entityLastname.trim()};${this.entityName.trim()};;;
    FN:${this.entityName.trim()} ${this.entityLastname.trim()}
    EMAIL;TYPE=INTERNET:${this.entityEmail.trim()}
    ORG:${this.entityOrganization.trim()}
    END:VCARD`;

    this.lifeCycleObject['contribute']['entity'][0] = card;
  }

  changeStatus() {
    console.log(this.statusSelected);
    this.lifeCycleObject['Status']['value'][0] = this.statusSelected;
  }

  changeContributeRole() {
    console.log(this.roleSelected);
    this.lifeCycleObject['contribute']['role'][0] = this.roleSelected;
  }

  ngOnDestroy(): void {
    console.log('[INFO]> Destroy LifeCycle');
    
    this.lifeCycleObject['version']['version'][0] = this.version;
    this.updateVcard();
    this.lifeCycleObject['contribute']['dateTime'][0] = this.date.toISOString();
    this.lifeCycleObject['contribute']['description'][0] = this.dateDescription;

    this.lompadservice.objPricipal['lifeCycle'] = this.lifeCycleObject;
    this.lompadservice.saveObjectLompad(this.lifeCycleObject, 'lifeCycle');
  }

}
