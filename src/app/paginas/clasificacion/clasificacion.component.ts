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
  
  constructor(
    private componentePrincipal: AppComponent,
    private lompadService: LompadService
  ) { }

  ngOnInit(): void {
    this.loadClassificationData();

    this.purposeOptions = [
      { label: 'Classification.purpose.discipline', value: 'discipline', code: 'dis' },
      { label: 'Classification.purpose.idea', value: 'idea', code: 'id' },
      { label: 'Classification.purpose.prerequisite', value: 'prerequisite', code: 'pre' },
      { label: 'Classification.purpose.educationalObjetive', value: 'educational objective', code: 'o_b' },
      { label: 'Classification.purpose.accessibilityRestrictions', value: 'accessibility restrictions', code: 'acc' },
      { label: 'Classification.purpose.educationalLevel', value: 'educational level', code: 'n_ed' },
      { label: 'Classification.purpose.skillLevel', value: 'skill level', code: 'n_hab' },
      { label: 'Classification.purpose.securityLevel', value: 'security level', code: 'n_seg' },
      { label: 'Classification.purpose.competency', value: 'competency', code: 'n_segsr' }
    ];

    this.objectOptions = this.componentePrincipal.objOptions;
    console.log('[INFO]> Classification Component: ', this.classificationObject);

    this.setClassificationData();
  }

  loadClassificationData() {
    this.classificationObject = this.lompadService.objPricipal['classification'];
  }

  setClassificationData() {
    this.purposeSelected = this.classificationObject['purpose']['value'][0];
    this.taxonPathEntry = this.classificationObject['taxonPath']['entry'][0];
    this.taxonPathId = this.classificationObject['taxonPath']['id'][0];
    this.taxonPathSource = this.classificationObject['taxonPath']['source'][0];
    this.description = this.classificationObject['description']['description'][0];
  }

  changePurpose() {
    this.classificationObject['purpose']['value'][0] = this.purposeSelected;
  }

  ngOnDestroy(): void {
    console.log('[INFO]> Destroy Classification');
    this.classificationObject['taxonPath']['entry'][0] = this.taxonPathEntry;
    this.classificationObject['taxonPath']['id'][0] = this.taxonPathId;
    this.classificationObject['taxonPath']['source'][0] = this.taxonPathSource;
    this.classificationObject['description']['description'][0] = this.description;

    this.lompadService.objPricipal['classification'] = this.classificationObject;
    this.lompadService.sendNewMetadata(this.classificationObject, 'classification');
  }

}
