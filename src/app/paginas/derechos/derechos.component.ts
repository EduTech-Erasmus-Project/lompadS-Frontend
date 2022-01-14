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
  rightsObject: any;
  objectOptions: ObjOptions = new ObjOptions();

  // Listas predefinidas
  costOptions: any[];
  costSelected: string;

  copyrightOptions: any[];
  copyrightSelected: string;
  // -----

  // Referentes a los valores
  description: string;

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService
  ) { }

  ngOnInit(): void {
    this.loadRightsData();

    this.costOptions = [
      { label: 'si', value: 'yes', code: 'yes' },
      { label: 'no', value: 'no', code: 'no' }
    ];

    this.copyrightOptions = [
      { label: 'si', value: 'yes', code: 'yes' },
      { label: 'no', value: 'no', code: 'no' }
    ];
    
    console.log('[INFO]> Rights Component: ', this.rightsObject);
    this.objectOptions = this.componentePrincipal.objOptions;

    this.setRightsData();
  }

  loadRightsData() {
    this.rightsObject = this.lompadservice.objPricipal['DATA']['rights'];
  }

  setRightsData() {
    this.description = this.rightsObject['Description']['Description'][0];
    this.costSelected = this.rightsObject['Cost']['Value'][0];
    this.copyrightSelected = this.rightsObject['CopyrightAndOtherRestrictions']['Value'][0];
  }

  changeCost() {
    console.log(this.costSelected);
    this.rightsObject['Cost']['Value'][0] = this.costSelected;
  }

  changeCopyright() {
    console.log(this.copyrightSelected);
    this.rightsObject['CopyrightAndOtherRestrictions']['Value'][0] = this.copyrightSelected;
  }

  ngOnDestroy(): void {
    console.log('Destroy Derechos');
    this.rightsObject['Description']['Description'][0] = this.description;

    this.lompadservice.objPricipal['DATA']['rights'] = this.rightsObject;
    this.lompadservice.saveObjectLompad(this.rightsObject, 'rights');
  }

}
