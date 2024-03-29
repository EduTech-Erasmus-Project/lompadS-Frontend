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
  relationObject: any = {
    "kind": {
      "source": [],
      "value": []
    },
    "resource": {
      "catalog": [],
      "entry": [],
      "description": []
    }
  };
  objectOptions: ObjOptions = new ObjOptions();
  
  // Listas predefinidas
  kindOptions: any[];
  kindSelected: string;
  // -----

  // Referente a los valores
  resourceIdentifierCatalog: any;
  resourceIdentifierEntry: any;
  resourceDescription: any;

  flag: boolean = false;

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService
  ) { }

  ngOnInit(): void {
    this.loadRelationData();

    this.kindOptions = [
      { label: 'Relation.kind.isPartOf', value: 'ispartof', code: 'ipo' },
      { label: 'Relation.kind.hasPart', value: 'haspart', code: 'hp' },
      { label: 'Relation.kind.isVersionOf', value: 'isversionof', code: 'ivo' },
      { label: 'Relation.kind.hasVersion', value: 'hasversion', code: 'hv' },
      { label: 'Relation.kind.isFormatOf', value: 'isformatof', code: 'ifo' },
      { label: 'Relation.kind.hasFormat', value: 'hasformat', code: 'hf' },
      { label: 'Relation.kind.references', value: 'references', code: 'rf' },
      { label: 'Relation.kind.isReferencedBy', value: 'isreferencedby', code: 'irfb' },
      { label: 'Relation.kind.isBasedOn', value: 'isbasedon', code: 'ibo' },
      { label: 'Relation.kind.isBasisFor', value: 'isbasisfor', code: 'ibf' },
      { label: 'Relation.kind.requires', value: 'requires', code: 'rq' },
      { label: 'Relation.kind.isRequiredBy', value: 'isrequiredby', code: 'irqb' }
    ];

    this.objectOptions = this.componentePrincipal.objOptions;
    // console.log('[INFO]> Rights Component: ', this.relationObject);

    this.setRelationData();
  }

  loadRelationData() {
    if (this.isEmpty(this.lompadservice.objPricipal['relation'])) {
      this.relationObject = this.lompadservice.objPricipal['relation'];
      this.flag = true;
    }
  }

  setRelationData() {
    if (this.flag) {
      this.kindSelected = this.relationObject['kind']['value'][0];
      this.resourceIdentifierCatalog = this.relationObject['resource']['catalog'][0];
      this.resourceIdentifierEntry = this.relationObject['resource']['entry'][0];
      this.resourceDescription = this.relationObject['resource']['description'][0];
    }
  }

  changeKind() {
    this.relationObject['kind']['value'][0] = this.kindSelected;
  }

  isEmpty(value: any[]) {
    if (typeof value !== 'undefined' && value) {
      return value;
    };
  }

  ngOnDestroy(): void {
    // console.log('[INFO]> Destroy Relation');

    this.relationObject['resource']['catalog'][0] = this.resourceIdentifierCatalog;
    this.relationObject['resource']['entry'][0] = this.resourceIdentifierEntry;
    this.relationObject['resource']['description'][0] = this.resourceDescription;

    this.lompadservice.objPricipal['relation'] = this.relationObject;
    this.lompadservice.sendNewMetadata(this.relationObject, 'relation');
  }

}
