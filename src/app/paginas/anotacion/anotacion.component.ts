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
  annotationObject: any;
  objectOptions: ObjOptions = new ObjOptions();

  // Listas predefinidas
  accessModeOptions: any[];
  accessModeSelected: string;

  accessModeSufficientOptions: any[];
  accessModeSufficientSelected: string;

  rolOptions: any[];
  rolSelected: string;
  // -----

  // Referente a los valores
  description: string;
  entityName: string;
  entityLastname: string;
  entityEmail: string;
  entityOrganization: string;
  date: any;

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService
  ) { }

  ngOnInit(): void {
    this.loadAnnotationData();

    this.accessModeOptions = [
      { label: 'Annotation.accessModeType.visual', value: 'visual', code: 'am-vis' },
      { label: 'Annotation.accessModeType.auditory', value: 'auditory', code: 'am-aud' },
      { label: 'Annotation.accessModeType.text', value: 'tex', code: 'am-txt' },
      { label: 'Annotation.accessModeType.tactil', value: 'tactile', code: 'am-tcl' }
    ];

    this.accessModeSufficientOptions = [
      { label: 'Annotation.accessModeType.visual', value: 'visual', code: 'ams-vis' },
      { label: 'Annotation.accessModeType.auditory', value: 'auditory', code: 'ams-aud' },
      { label: 'Annotation.accessModeType.text', value: 'tex', code: 'ams-txt' },
      { label: 'Annotation.accessModeType.tactil', value: 'tactile', code: 'ams-tcl' }
    ];

    this.rolOptions = [
      { label: 'Annotation.role.student', value: 'student', code: 'std' },
      { label: 'Annotation.role.teacher', value: 'teachers', code: 'tch' },
      { label: 'Annotation.role.application', value: 'application', code: 'app' }
    ];

    this.objectOptions = this.componentePrincipal.objOptions;
    console.log('[INFO]> Annotation Component: ', this.annotationObject);

    this.setAnnotationData();
  }

  loadAnnotationData() {
    this.annotationObject = this.lompadservice.objPricipal['annotation'];
  }

  setAnnotationData() {
    this.castVcard(this.annotationObject['entity']['entity'][0]);
    this.date = new Date(this.annotationObject['date']['dateTime'][0]);
    this.description = this.annotationObject['description']['description'][0];
    this.accessModeSelected = this.annotationObject['modeAccess']['value'][0];
    this.accessModeSufficientSelected = this.annotationObject['modeAccessSufficient']['value'][0];
    this.rolSelected = this.annotationObject['rol']['value'][0];
  }

  castVcard(card: string) {//lanzar desde ngOninit    
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

    this.annotationObject['entity']['entity'][0] = card;
  }

  changeAccessMode() {
    this.annotationObject['modeAccess']['value'][0] = this.accessModeSelected;
  }

  changeAccessModeSufficient() {
    this.annotationObject['modeAccessSufficient']['value'][0] = this.accessModeSufficientSelected;
  }

  changeRol() {
    this.annotationObject['rol']['value'][0] = this.rolSelected;
  }

  ngOnDestroy(): void {
    console.log('[INFO]> Destroy Annotation');

    this.updateVcard();
    this.annotationObject['date']['dateTime'][0] = this.date.toISOString();
    this.annotationObject['description']['description'][0] = this.description;

    this.lompadservice.objPricipal['annotation'] = this.annotationObject;
    this.lompadservice.sendNewMetadata(this.annotationObject, 'annotation');
  }

}
