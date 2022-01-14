import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ObjOptions } from 'src/app/modelo/objOptions';
import { LompadService } from '../../servicios/lompad.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit {
  classificationObject: any;
  objectOptions: ObjOptions = new ObjOptions();

  // Listas predefinidas
  purposeOptions: any[];
  purposeSelected: string;
  // -----

  // Referente a los valores
  taxonPathEntry: string;
  taxonPathId: string;
  taxonPathSource: string;
  description: string;
  keywords: any[];

  
  columns: any[];
  palabra: string;
  palabraDialog: boolean;
  
  constructor(
    private componentePrincipal: AppComponent,
    private lompadService: LompadService
  ) { }

  ngOnInit(): void {
    this.loadClassificationData();

    this.purposeOptions = [
      { label: 'disciplina', value: 'discipline', code: 'dis' },
      { label: 'idea', value: 'idea', code: 'id' },
      { label: 'prerequisito', value: 'prerequisite', code: 'pre' },
      { label: 'objetivo educativo', value: 'educational objective', code: 'o_b' },
      { label: 'accesibilidad', value: 'accessibility restrictions', code: 'acc' },
      { label: 'nivel educativo', value: 'educational level', code: 'n_ed' },
      { label: 'nivel de habilidad', value: 'skill level', code: 'n_hab' },
      { label: 'nivel de seguridad', value: 'security level', code: 'n_seg' },
      { label: 'competencia', value: 'competency', code: 'n_segsr' }
    ];

    this.objectOptions = this.componentePrincipal.objOptions;
    console.log('DEsde Calsificacion: ', this.classificationObject);

    this.setClassificationData();
  }

  loadClassificationData() {
    this.classificationObject = this.lompadService.objPricipal['DATA']['classification'];
  }

  setClassificationData() {
    this.columns = [];
    this.purposeSelected = this.classificationObject['Purpose']['Value'][0];
    this.taxonPathEntry = this.classificationObject['Taxon Path']['Entry'][0];
    this.taxonPathId = this.classificationObject['Taxon Path']['Id'][0];
    this.taxonPathSource = this.classificationObject['Taxon Path']['Source'][0];
    this.description = this.classificationObject['Description']['Description'][0];
  }

  addPalabra() {
    this.palabraDialog = true;
  }

  cancelPalabra() {
    this.palabraDialog = false;
  }

  removeColumn() {
    this.columns.splice(-1, 1);
  }

  savePalabra() {
    console.log(this.palabra);
    this.palabraDialog = false;
    this.columns.push(this.palabra);
    this.palabra = '';
  }

  changePurpose() {
    console.log(this.purposeSelected)
    this.classificationObject['Purpose'] = this.purposeSelected;
  }

  ngOnDestroy(): void {
    console.log('[INFO]> Destroy Classification');


    this.lompadService.objPricipal['DATA']['classification'] = this.classificationObject;
    this.lompadService.saveObjectLompad(this.classificationObject, 'classification');
  }

}
