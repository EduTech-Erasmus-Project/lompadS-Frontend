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
  metametadataObject: any;
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

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService
  ) { }

  ngOnInit(): void {
    this.loadMetametadataData();
    
    this.roleOptions = [
      { label: 'Creador', value: 'creator', code: 'cre' },
      { label: 'Revisor', value: 'validator', code: 'vie' }
    ];

    this.objectOptions = this.componentePrincipal.objOptions;
    console.log("[INFO]> Metametadata Component: ", this.metametadataObject);

    this.setMetametadataData();
  }

  loadMetametadataData() {
    this.metametadataObject = this.lompadservice.objPricipal['DATA']['metaMetadata'];
  }

  setMetametadataData() {
    this.identifierCatalog = this.metametadataObject["Identifier"]["Catalog"][0];
    this.identifierEntry = this.metametadataObject["Identifier"]["Entry"][0];
    this.roleSelected = this.metametadataObject["Contribute"]["Value"][0];
    this.castVcard(this.metametadataObject["Contribute"]["Entity"][0]);
    this.date = new Date(this.metametadataObject["Contribute"]["Date"][0]);
    this.metadataSchema = this.metametadataObject["MetadataSchema"]["Values"][0];
  }

  castVcard(card: string) {//lanzar desde ngOninit    
    //en caso de que las vcard esten llegando sin saltos de linea
    const vcardElements = [" VERSION", " FN", " N", " EMAIL", " ORG", " END:VCARD"];

    vcardElements.forEach(element => {
      card = card.replace(element, element.replace(" ", "\n"));
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
    var listnombreApell = nombre.split(" ");
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

    this.metametadataObject["Contribute"]["Entity"][0] = card;
  }

  changeRole() {
    console.log(this.roleSelected)
    this.metametadataObject["Contribute"]["Value"][0] = this.roleSelected;

  }

  ngOnDestroy(): void {
    console.log("Destroy Metadatos");
    this.metametadataObject["Identifier"]["Catalog"][0] = this.identifierCatalog;
    this.metametadataObject["Identifier"]["Entry"][0] = this.identifierEntry;
    this.updateVcard();
    this.metametadataObject["Contribute"]["Date"][0] = this.date.toISOString();
    this.metametadataObject["MetadataSchema"]["Values"][0] = this.metadataSchema;

    this.lompadservice.objPricipal['DATA']['metaMetadata'] = this.metametadataObject;
    this.lompadservice.saveObjectLompad(this.metametadataObject, "metaMetadata");
  }

}
