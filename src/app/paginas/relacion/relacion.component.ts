import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ObjOptions } from 'src/app/modelo/objOptions';
import { LompadService } from '../../servicios/lompad.service';

@Component({
  selector: 'app-relacion',
  templateUrl: './relacion.component.html',
  styleUrls: ['./relacion.component.css']
})
export class RelacionComponent implements OnInit {
  relationObject: any;
  objectOptions: ObjOptions = new ObjOptions();
  
  // Listas predefinidas
  kindOptions: any[];
  kindSelected: string;
  // -----

  // Referente a los valores
  resourceIdentifierCatalog: any;
  resourceIdentifierEntry: any;
  resourceDescription: any;

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService
  ) { }

  ngOnInit(): void {
    this.loadRelationData();

    this.kindOptions = [
      { label: 'es parte de', value: 'ispartof', code: 'ipo' },
      { label: 'tiene parte', value: 'haspart', code: 'hp' },
      { label: 'es versión de', value: 'isversionof', code: 'ivo' },
      { label: 'tiene versión', value: 'hasversion', code: 'hv' },
      { label: 'es formato de', value: 'isformatof', code: 'ifo' },
      { label: 'tiene formato', value: 'hasformat', code: 'hf' },
      { label: 'referencia', value: 'references', code: 'rf' },
      { label: 'es referenciado por', value: 'isreferencedby', code: 'irfb' },
      { label: 'se basa en', value: 'isbasedon', code: 'ibo' },
      { label: 'es base para', value: 'isbasisfor', code: 'ibf' },
      { label: 'requiere', value: 'requires', code: 'rq' },
      { label: 'es requerido por', value: 'isrequiredby', code: 'irqb' }
    ];

    this.objectOptions = this.componentePrincipal.objOptions;
    console.log('[INFO]> Rights Component: ', this.relationObject);

    this.setRelationData();
  }

  loadRelationData() {
    this.relationObject = this.lompadservice.objPricipal['data']['relation'];
  }

  setRelationData() {
    this.kindSelected = this.relationObject['kind']['value'][0];
    this.resourceIdentifierCatalog = this.relationObject['resource']['catalog'][0];
    this.resourceIdentifierEntry = this.relationObject['resource']['entry'][0];
    this.resourceDescription = this.relationObject['resource']['description'][0];
  }

  changeKind() {
    console.log(this.kindSelected);
    this.relationObject['kind']['value'][0] = this.kindSelected;
  }

  ngOnDestroy(): void {
    console.log('[INFO]> Destroy Relation');

    this.relationObject['resource']['catalog'][0] = this.resourceIdentifierCatalog;
    this.relationObject['resource']['entry'][0] = this.resourceIdentifierEntry;
    this.relationObject['resource']['description'][0] = this.resourceDescription;

    this.lompadservice.objPricipal['data']['relation'] = this.relationObject;
    this.lompadservice.saveObjectLompad(this.relationObject, 'relation');
  }

}
