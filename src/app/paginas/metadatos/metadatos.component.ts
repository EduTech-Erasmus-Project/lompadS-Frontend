import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ObjOptions } from 'src/app/modelo/objOptions';
import { LompadService } from '../../servicios/lompad.service';

@Component({
  selector: 'app-metadatos',
  templateUrl: './metadatos.component.html',
  styleUrls: ['./metadatos.component.css']
})
export class MetadatosComponent implements OnInit {
  metametadataObject: any = {
    "identifier": {
      "catalog": [],
      "entry": []
    },
    "metadataSchema": {
      "metadataSchema": []
    },
    "language": {
      "language": []
    },
    "contribute": {
      "source": [],
      "value": [],
      "entity": [],
      "date": [],
      "description": []
    }
  };
  objectOptions: ObjOptions = new ObjOptions();

  // Listas predefinidas
  roleOptions: any[];
  roleSelected: string;
  // ----- 
  
  // Referente a los valores
  identifierCatalog: string;
  identifierEntry: string;
  entityName: string;
  entityLastname: string;
  entityEmail: string;
  entityOrganization: string;
  date: any;
  metadataSchema: string;

  flag: boolean = false;

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService
  ) { }

  ngOnInit(): void {
    this.loadMetametadataData();
    
    this.roleOptions = [
      { label: 'Common.contribute.role.creator', value: 'creator', code: 'cre' },
      { label: 'Common.contribute.role.validator', value: 'validator', code: 'vie' }
    ];

    this.objectOptions = this.componentePrincipal.objOptions;
    console.log('[INFO]> Metametadata Component: ', this.metametadataObject);

    this.setMetametadataData();
  }

  loadMetametadataData() {
    if (this.isEmpty(this.lompadservice.objPricipal['metaMetadata'])) {
      this.metametadataObject = this.lompadservice.objPricipal['metaMetadata'];
      this.flag = true;
    }
  }

  setMetametadataData() {
    if (this.flag) {
      this.identifierCatalog = this.metametadataObject['identifier']['catalog'][0];
      this.identifierEntry = this.metametadataObject['identifier']['entry'][0];
      this.roleSelected = this.metametadataObject['contribute']['value'][0];
      if (this.metametadataObject['contribute']['entity'][0] != undefined) {
        this.castVcard(this.metametadataObject['contribute']['entity'][0]); 
      }
      if (this.metametadataObject['contribute']['date'][0] != undefined) {
        this.date = new Date(this.metametadataObject['contribute']['date'][0]);
      }
      this.metadataSchema = this.metametadataObject['metadataSchema']['metadataSchema'][0];
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
    N:${this.entityLastname.trim()};${this.entityName.trim()};;;
    FN:${this.entityName.trim()} ${this.entityLastname.trim()}
    EMAIL;TYPE=INTERNET:${this.entityEmail.trim()}
    ORG:${this.entityOrganization.trim()}
    END:VCARD`;

    this.metametadataObject['contribute']['entity'][0] = card;
  }

  changeRole() {
    this.metametadataObject['contribute']['value'][0] = this.roleSelected;
  }

  isEmpty(value: any[]) {
    if (typeof value !== 'undefined' && value) {
      return value;
    };
  }

  ngOnDestroy(): void {
    console.log('[INFO]> Destroy Meta-Metadata');

    this.metametadataObject['identifier']['catalog'][0] = this.identifierCatalog;
    this.metametadataObject['identifier']['entry'][0] = this.identifierEntry;
    this.updateVcard();
    if (this.date != undefined) {
      this.metametadataObject['contribute']['date'][0] = this.date.toISOString();
    }
    this.metametadataObject['metadataSchema']['metadataSchema'][0] = this.metadataSchema;

    this.lompadservice.objPricipal['metaMetadata'] = this.metametadataObject;
    this.lompadservice.sendNewMetadata(this.metametadataObject, 'metaMetadata');
  }

}
