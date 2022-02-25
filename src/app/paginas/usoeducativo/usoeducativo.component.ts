import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ObjOptions } from 'src/app/modelo/objOptions';
import { LompadService } from '../../servicios/lompad.service';

@Component({
  selector: 'app-usoeducativo',
  templateUrl: './usoeducativo.component.html',
  styleUrls: ['./usoeducativo.component.css']
})
export class UsoeducativoComponent implements OnInit {
  educationalObject: any = {
    "interactivityType": {
      "source": [],
      "value": []
    },
    "learningResourceType": {
      "source": [],
      "value": []
    },
    "interactivityLevel": {
      "source": [],
      "value": []
    },
    "intendedEndUserRole": {
      "source": [],
      "value": []
    },
    "semanticDensity": {
      "source": [],
      "value": []
    },
    "context": {
      "source": [],
      "value": []
    },
    "difficulty": {
      "source": [],
      "value": []
    },
    "description": {
      "description": []
    },
    "typicalAgeRange": {
      "typicalAgeRange": []
    },
    "typicalLearningTime": {
      "duration": [],
      "description": []
    },
    "language": {
      "language": []
    }
  };
  objectOptions: ObjOptions = new ObjOptions();

  // Listas predefinidas
  interactivityTypeOptions: any[];
  interactivityTypeSelected: string;

  learningResourceTypeOptions: any[];
  learningResourceTypeSelected: string;

  interactivityLevelOptions: any[];
  interactivityLevelSelected: string;

  semanticDensityOptions: any[];
  semanticDensitySelected: string;

  intendedEndUserRoleOptions: any[];
  intendedEndUserRoleSelected: string;

  contextOptions: any[];
  contextSelected: string;

  difficultyOptions: any[];
  difficultySelected: string;
  // -----

  // Referente a los valores
  description: string;

  flag: boolean = false;

  typicalAgeRange: number;
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService
  ) { }

  ngOnInit(): void {
    this.loadEducationalData();

    this.interactivityTypeOptions = [
      { label: 'Educational.interactivityType.active', value: 'active', code: 'ac' },
      { label: 'Educational.interactivityType.expositive', value: 'expositive', code: 'ex' },
      { label: 'Educational.interactivityType.mixed', value: 'mixed', code: 'com' }
    ];

    this.learningResourceTypeOptions = [
      { label: 'Educational.learningResourceType.exercise', value: 'exercise', code: 'ejer' },
      { label: 'Educational.learningResourceType.simulation', value: 'simulation', code: 'sim' },
      { label: 'Educational.learningResourceType.questionnaire', value: 'questionnarie', code: 'cuest' },
      { label: 'Educational.learningResourceType.diagram', value: 'diagram', code: 'dia' },
      { label: 'Educational.learningResourceType.figure', value: 'figure', code: 'fig' },
      { label: 'Educational.learningResourceType.graph', value: 'graph', code: 'gra' },
      { label: 'Educational.learningResourceType.index', value: 'index', code: 'in' },
      { label: 'Educational.learningResourceType.slide', value: 'slide', code: 'in' },
      { label: 'Educational.learningResourceType.table', value: 'table', code: 'in' },
      { label: 'Educational.learningResourceType.narrativeText', value: 'narrative text', code: 'in' },
      { label: 'Educational.learningResourceType.exam', value: 'exam', code: 'in' },
      { label: 'Educational.learningResourceType.experiment', value: 'experiment', code: 'in' },
      { label: 'Educational.learningResourceType.problemStatement', value: 'problem statement', code: 'in' },
      { label: 'Educational.learningResourceType.selfAssessment', value: 'self assessment', code: 'in' },
      { label: 'Educational.learningResourceType.lecture', value: 'lecture', code: 'in' },
    ];

    this.interactivityLevelOptions = [
      { label: 'Common.levels.veryLow', value: 'very low', code: 'mb' },
      { label: 'Common.levels.low', value: 'low', code: 'baj' },
      { label: 'Common.levels.medium', value: 'medium', code: 'med' },
      { label: 'Common.levels.high', value: 'high', code: 'alt' },
      { label: 'Common.levels.veryHigh', value: 'very high', code: '34523' },
    ];

    this.semanticDensityOptions = [
      { label: 'Common.levels.veryLow', value: 'very low', code: 'mb' },
      { label: 'Common.levels.low', value: 'low', code: 'baj' },
      { label: 'Common.levels.medium', value: 'medium', code: 'med' },
      { label: 'Common.levels.high', value: 'high', code: 'alt' },
      { label: 'Common.levels.veryHigh', value: 'very high', code: '34523' },
    ];

    this.intendedEndUserRoleOptions = [
      { label: 'Educational.intendedEndUserRole.author', value: 'author', code: 'aut' },
      { label: 'Educational.intendedEndUserRole.teacher', value: 'teacher', code: 'pro' },
      { label: 'Educational.intendedEndUserRole.learner', value: 'learner', code: 'aprend' },
      { label: 'Educational.intendedEndUserRole.manager', value: 'manager', code: 'mana' }
    ];

    this.contextOptions = [
      { label: 'Educational.context.school', value: 'school', code: 'es' },
      { label: 'Educational.context.higherEducation', value: 'higher education', code: 'edu_s' },
      { label: 'Educational.context.training', value: 'training', code: 'entre' },
      { label: 'Educational.context.other', value: 'other', code: 'otro' },
    ];

    this.difficultyOptions = [
      { label: 'Educational.difficulty.veryEasy', value: 'very easy', code: 'mf' },
      { label: 'Educational.difficulty.easy', value: 'easy', code: 'f' },
      { label: 'Educational.difficulty.medium', value: 'medium', code: 'm' },
      { label: 'Educational.difficulty.difficult', value: 'difficult', code: 'd' },
      { label: 'Educational.difficulty.veryDifficult', value: 'very difficult', code: 'md' }
    ];

    this.objectOptions = this.componentePrincipal.objOptions;
    console.log('[INFO]> Educational Component: ', this.educationalObject);

    this.setEducationalData();
  }

  loadEducationalData() {
    if (this.isEmpty(this.lompadservice.objPricipal['educational'])) {
      this.educationalObject = this.lompadservice.objPricipal['educational'];
      this.flag = true;
    }
  }

  setEducationalData() {
    if (this.flag) {
      if (this.educationalObject['interactivityType']['value'] != undefined) {
        this.interactivityTypeSelected = this.educationalObject['interactivityType']['value'][0]; 
      }
      if (this.educationalObject['learningResourceType']['value'] != undefined) {
        this.learningResourceTypeSelected = this.educationalObject['learningResourceType']['value'][0]; 
      }
      if (this.educationalObject['interactivityLevel']['value'] != undefined) {
        this.interactivityLevelSelected = this.educationalObject['interactivityLevel']['value'][0];
      }
      if (this.educationalObject['semanticDensity']['value'] != undefined) {
        this.semanticDensitySelected = this.educationalObject['semanticDensity']['value'][0];
      }
      if (this.educationalObject['intendedEndUserRole']['value'] != undefined) {
        this.intendedEndUserRoleSelected = this.educationalObject['intendedEndUserRole']['value'][0];
      }
      if (this.educationalObject['context']['value'] != undefined) {
        this.contextSelected = this.educationalObject['context']['value'][0];
      }
      if (this.educationalObject['typicalAgeRange']['typicalAgeRange'] != undefined) {
        this.typicalAgeRange = this.educationalObject['typicalAgeRange']['typicalAgeRange'][0];
      }
      if (this.educationalObject['difficulty']['value'] != undefined) {
        this.difficultySelected = this.educationalObject['difficulty']['value'][0]; 
      }
      if (this.educationalObject['typicalLearningTime']['duration'][0] != undefined) {
        this.castTime(this.educationalObject['typicalLearningTime']['duration'][0]); 
      }
      if (this.educationalObject['description']['description'] != undefined) {
        this.description = this.educationalObject['description']['description'][0]; 
      }
    }
  }

  changeInteractivityType() {
    this.educationalObject['interactivityType']['value'][0] = this.interactivityTypeSelected;
  }

  changeLearningResourceType() {
    this.educationalObject['learningResourceType']['value'][0] = this.learningResourceTypeSelected;
  }

  changeInteractivityLevel() {
    this.educationalObject['interactivityLevel']['value'][0] = this.interactivityLevelSelected;
  }

  changeSemanticDensity() {
    this.educationalObject['semanticDensity']['value'][0] = this.semanticDensitySelected;
  }

  changeIntentedEndUserRole() {
    this.educationalObject['intendedEndUserRole']['value'][0] = this.intendedEndUserRoleSelected;
  }

  changeContext() {
    this.educationalObject['context']['value'][0] = this.contextSelected;
  }

  changeDifficulty() {
    this.educationalObject['difficulty']['value'][0] = this.difficultySelected;
  }

  castTime(duration: string) {
    try {
      console.log('duracion', duration)
      var auxDuration1 = duration.split('DT')[0];
      var auxDuration2 = duration.split('DT')[1];

      auxDuration1 = auxDuration1.substr(1, auxDuration1.length);

      this.years = + auxDuration1.split('Y')[0];
      this.months = + auxDuration1.split('Y')[1].split('M')[0];
      this.days = + auxDuration1.split('Y')[1].split('M')[1];

      this.hours = + auxDuration2.split('H')[0];
      this.minutes = + auxDuration2.split('H')[1].split('M')[0];
    } catch (error) {
      console.log('[ERROR]> Technical: Something went wrong with casting duration!', error);
    }
  }

  saveTime() {
    this.educationalObject['typicalLearningTime']['duration'][0] = 'P' + this.years + 'Y' + this.months + 'M' + this.days + 'DT' + this.hours + 'H' + this.minutes + 'M';
  }

  isEmpty(value: any[]) {
    if (typeof value !== 'undefined' && value) {
      return value;
    };
  }

  ngOnDestroy(): void {
    console.log('[INFO]> Destroy Educational');
    
    this.educationalObject['typicalAgeRange']['typicalAgeRange'][0] = this.typicalAgeRange;
    this.educationalObject['description']['description'][0] = this.description;
    this.saveTime();

    this.lompadservice.objPricipal['educational'] = this.educationalObject;
    this.lompadservice.sendNewMetadata(this.educationalObject, 'educational');
  }

}
