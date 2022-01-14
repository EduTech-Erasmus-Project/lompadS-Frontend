import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LompadService } from 'src/app/servicios/lompad.service';
import { ObjOptions } from '../../modelo/objOptions';
import { MessageService } from 'primeng/api';

import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-general',
  styles: [`
  .box {
      background-color: var(--surface-e);
      text-align: center;
      padding: 1.25rem;
      font-size: 1.5rem;
      border-radius: 4px;
      box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  }

  .box-stretched {
      height: 100%;
  }

  .vertical-container {
      margin: 0;
      height: 200px;
      background: var(--surface-d);
      border-radius: 4px;
  }

  .nested-grid .p-col-4 {
      padding-bottom: 1rem;
  }
  `],
  animations: [
    trigger('animation', [
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate(('250ms ease-in'), style({
          height: 0,
          opacity: 0,
          transform: 'translateX(50%)'
        }))
      ])
    ])
  ],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers: [MessageService],
})
export class GeneralComponent implements OnInit, OnDestroy {
  generalObject: any;
  objectOptions: ObjOptions = new ObjOptions();

  // Listas predefinidas
  structureOptions: any = [];
  structureSelected: string;

  aggregationLevelOptions: any = [];
  aggregationLevelSelected: string;

  languageOptions: any = [];
  languageSelected: string;
  // -----

  // Referentes a los valores
  identifierCatalog: any;
  identifierEntry: any;
  title: any[];
  description: any[];
  coverage: any[];
  keywords: any[];
  // -----

  // Auxiliares
  word: string;
  keywordDialog: boolean;

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService
  ) { }

  ngOnInit(): void {
    this.loadGeneralObject();

    this.structureOptions = [
      { label: 'atómica', value: 'atomic', code: 'ato' },
      { label: 'colección', value: 'collection', code: 'coll' },
      { label: 'en red', value: 'networked', code: 'red' },
      { label: 'jerárquica', value: 'hiperarchical', code: 'je' },
      { label: 'lineal', value: 'linear', code: 'li' },
    ];

    this.aggregationLevelOptions = [
      { label: '1', value: '1', code: '1' },
      { label: '2', value: '2', code: '2' },
      { label: '3', value: '3', code: '3' },
      { label: '4', value: '4', code: '4' },
    ];

    this.languageOptions = [
      { label: 'none', value: 'none', code: 'none' },
      { label: 'fra', value: 'fra', code: 'fra' },
      { label: 'fra-CA', value: 'fra-CA', code: 'fra-CA' },
      { label: 'fra-FR', value: 'fra-FR', code: 'fra-FR' },
      { label: 'eng', value: 'eng', code: 'eng' },
      { label: 'eng-AU', value: 'eng-AU', code: 'eng-AU' },
      { label: 'eng-CA', value: 'eng-CA', code: 'eng-CA' },
      { label: 'eng-GB', value: 'eng-GB', code: 'eng-GB' },
      { label: 'eng-US', value: 'eng-US', code: 'eng-US' },
      { label: 'deu', value: 'deu', code: 'deu' },
      { label: 'esl', value: 'esl', code: 'esl' },
      { label: 'ita', value: 'ita', code: 'ita' },
      { label: 'por', value: 'por', code: 'por' },
      { label: 'fr', value: 'fr', code: 'fr' },
      { label: 'fr-CA', value: 'fr-CA', code: 'fr-CA' },
      { label: 'fr-FR', value: 'fr-FR', code: 'fr-FR' },
      { label: 'en', value: 'en', code: 'en' },
      { label: 'en-AU', value: 'en-AU', code: 'en-AU' },
      { label: 'en-CA', value: 'en-CA', code: 'en-CA' },
      { label: 'en-GB', value: 'en-GB', code: 'en-GB' },
      { label: 'en-US', value: 'en-US', code: 'en-US' },
      { label: 'de', value: 'de', code: 'de' },
      { label: 'es', value: 'es', code: 'es' },
      { label: 'it', value: 'it', code: 'it' },
      { label: 'pt', value: 'pt', code: 'pt' },
    ];

    this.objectOptions = this.componentePrincipal.objOptions;
    console.log('[INFO]> General Component:', this.generalObject);

    this.setGeneralData();
  }

  loadGeneralObject() {
    this.generalObject = this.lompadservice.objPricipal['data']['general'];
  }

  setGeneralData() {
    this.identifierCatalog = this.generalObject['identifier']['catalog'][0];
    this.identifierEntry = this.generalObject['identifier']['entry'][0];
    this.title = this.generalObject['title']['title'][0];
    this.description = this.generalObject['description']['description'][0];
    this.coverage = this.generalObject['coverage']['coverage'][0];

    this.structureSelected = this.generalObject['structure']['value'][0];
    this.aggregationLevelSelected = this.generalObject['aggregationLevel']['value'][0];
    this.languageSelected = this.generalObject['language']['language'][0];

    this.showInfo('Aggregation Level Selected', this.aggregationLevelSelected);
    this.showInfo('Structure', this.structureSelected);
    this.showInfo('Language Selected', this.languageSelected);

    this.loadKeywords();
  }

  loadKeywords() {
    this.keywords = [];
    let keys: [] = this.generalObject['keyword']['keyword'][0];

    if (keys != null) {
      keys.forEach((element) => {
        console.log('elementos ', element);
        this.keywords.push(element);
      });
    }
  }

  addKeyword() {
    this.keywordDialog = true;
  }

  removeLastKeyword() {
    this.keywords.splice(-1, 1);
  }

  cancel() {
    this.keywordDialog = false;
  }

  saveNewKeyword() {
    console.log(this.word);
    this.keywordDialog = false;
    this.keywords.push(this.word);
    this.word = '';
  }

  changeStructure() {
    this.generalObject['structure']['value'][0] = this.structureSelected;
  }

  changeAggregationLevel() {
    this.generalObject['aggregationLevel']['value'][0] = this.aggregationLevelSelected;
  }

  changeLanguage() {
    this.generalObject['language']['language'][0] = this.languageSelected;
  }

  showInfo(key: any, value: any) {
    console.log('[INFO] General>', key, ': ', value);
  }

  ngOnDestroy(): void {
    console.log('[INFO]> Destroy General');

    this.generalObject['identifier']['catalog'][0] = this.identifierCatalog;
    this.generalObject['identifier']['entry'][0] = this.identifierEntry;
    this.generalObject['title']['title'][0] = this.title;
    this.generalObject['description']['description'][0] = this.description;
    this.generalObject['coverage']['coverage'][0] = this.coverage;
    this.generalObject['keyword']['keyword'][0] = this.keywords;

    this.lompadservice.objPricipal['data']['general'] = this.generalObject;
    this.lompadservice.saveObjectLompad(this.generalObject, 'general');
  }

}
