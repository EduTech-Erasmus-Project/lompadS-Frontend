import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ObjOptions } from 'src/app/modelo/objOptions';
import { LompadService } from '../../servicios/lompad.service';

@Component({
  selector: 'app-derechos',
  templateUrl: './derechos.component.html',
  styleUrls: ['./derechos.component.css']
})
export class DerechosComponent implements OnInit {
  rightsObject: any = {
    "cost": {
      "source": [],
      "value": []
    },
    "copyrightAndOtherRestrictions": {
      "source": [],
      "value": []
    },
    "description": {
      "description": []
    },
    "access": {
      "source": [],
      "value": [],
      "description": []
    }
  };
  objectOptions: ObjOptions = new ObjOptions();

  // Listas predefinidas
  costOptions: any[];
  costSelected: string;

  copyrightOptions: any[];
  copyrightSelected: string;
  // -----

  // Referentes a los valores
  description: string;

  flag: boolean = false;

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService
  ) { }

  ngOnInit(): void {
    this.loadRightsData();

    this.costOptions = [
      { label: 'Rights.yes', value: 'yes', code: 'yes' },
      { label: 'Rights.no', value: 'no', code: 'no' }
    ];

    this.copyrightOptions = [
      { label: 'Rights.yes', value: 'yes', code: 'yes' },
      { label: 'Rights.no', value: 'no', code: 'no' }
    ];
    
    // console.log('[INFO]> Rights Component: ', this.rightsObject);
    this.objectOptions = this.componentePrincipal.objOptions;

    this.setRightsData();
  }

  loadRightsData() {
    if (this.isEmpty(this.lompadservice.objPricipal['rights'])) {
      this.rightsObject = this.lompadservice.objPricipal['rights'];
      this.flag = true;
    }
  }

  setRightsData() {
    if (this.flag) {
      this.description = this.rightsObject['description']['description'][0];
      this.costSelected = this.rightsObject['cost']['value'][0];
      this.copyrightSelected = this.rightsObject['copyrightAndOtherRestrictions']['value'][0];
    }
  }

  changeCost() {
    this.rightsObject['cost']['value'][0] = this.costSelected;
  }

  changeCopyright() {
    this.rightsObject['copyrightAndOtherRestrictions']['value'][0] = this.copyrightSelected;
  }

  isEmpty(value: any[]) {
    if (typeof value !== 'undefined' && value) {
      return value;
    };
  }

  ngOnDestroy(): void {
    // console.log('[INFO]> Destroy Rights');

    this.rightsObject['description']['description'][0] = this.description;

    this.lompadservice.objPricipal['rights'] = this.rightsObject;
    this.lompadservice.sendNewMetadata(this.rightsObject, 'rights');
  }

}
