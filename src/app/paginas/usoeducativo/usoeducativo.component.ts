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
  educationalObject: any;
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
      { label: 'Activo', value: 'active', code: 'ac' },
      { label: 'Expositivo', value: 'expositive', code: 'ex' },
      { label: 'Combinado', value: 'mixed', code: 'com' }
    ];

    this.learningResourceTypeOptions = [
      { label: 'Ejercicio', value: 'exercise', code: 'ejer' },
      { label: 'Simulación', value: 'simulation', code: 'sim' },
      { label: 'Cuestionario', value: 'questionnarie', code: 'cuest' },
      { label: 'Diagrama', value: 'diagram', code: 'dia' },
      { label: 'Figura', value: 'figure', code: 'fig' },
      { label: 'Gráfico', value: 'graph', code: 'gra' },
      { label: 'Indice', value: 'index', code: 'in' },
      { label: 'Diapositiva', value: 'slide', code: 'in' },
      { label: 'tabla', value: 'table', code: 'in' },
      { label: 'texto narrativo', value: 'narrative text', code: 'in' },
      { label: 'examen', value: 'exam', code: 'in' },
      { label: 'experimento', value: 'experiment', code: 'in' },
      { label: 'planteamiento del problema', value: 'problem statement', code: 'in' },
      { label: 'autoevaluacion', value: 'self assessment', code: 'in' },
      { label: 'conferencia', value: 'lecture', code: 'in' },
    ];

    this.interactivityLevelOptions = [
      { label: 'muy bajo', value: 'very low', code: 'mb' },
      { label: 'bajo', value: 'low', code: 'baj' },
      { label: 'medio', value: 'medium', code: 'med' },
      { label: 'alto', value: 'high', code: 'alt' },
      { label: 'muy alto', value: 'very high', code: '34523' },
    ];

    this.semanticDensityOptions = [
      { label: 'muy bajo', value: 'very low', code: 'mb' },
      { label: 'bajo', value: 'low', code: 'baj' },
      { label: 'medio', value: 'medium', code: 'med' },
      { label: 'alto', value: 'high', code: 'alt' },
      { label: 'muy alto', value: 'very high', code: '34523' },
    ];

    this.intendedEndUserRoleOptions = [
      { label: 'autor', value: 'author', code: 'aut' },
      { label: 'profesor', value: 'theacher', code: 'pro' },
      { label: 'aprendiz', value: 'learner', code: 'aprend' },
      { label: 'admimistrador', value: 'manager', code: 'mana' }
    ];

    this.contextOptions = [
      { label: 'escuela', value: 'school', code: 'es' },
      { label: 'educación secundaria', value: 'higher education', code: 'edu_s' },
      { label: 'entrenamiento', value: 'training', code: 'entre' },
      { label: 'otro', value: 'other', code: 'otro' },
    ];

    this.difficultyOptions = [
      { label: 'muy facíl', value: 'very easy', code: 'mf' },
      { label: 'facíl', value: 'easy', code: 'f' },
      { label: 'medio', value: 'medium', code: 'm' },
      { label: 'dificíl', value: 'difficult', code: 'd' },
      { label: 'muy dificíl', value: 'very difficult', code: 'md' }
    ];

    this.objectOptions = this.componentePrincipal.objOptions;
    console.log('[INFO]> Educational Component: ', this.educationalObject);

    this.setEducationalData();
  }

  loadEducationalData() {
    this.educationalObject = this.lompadservice.objPricipal['data']['educational'];
  }

  setEducationalData() {
    this.interactivityTypeSelected = this.educationalObject['interactivityType']['value'][0];
    this.learningResourceTypeSelected = this.educationalObject['learningResourceType']['value'][0];
    this.interactivityLevelSelected = this.educationalObject['interactivityLevel']['value'][0];
    this.semanticDensitySelected = this.educationalObject['semanticDensity']['value'][0];
    this.intendedEndUserRoleSelected = this.educationalObject['intendedEndUserRole']['value'][0];
    this.contextSelected = this.educationalObject['context']['value'][0];
    this.typicalAgeRange = this.educationalObject['typicalAgeRange']['typicalAgeRange'][0];
    this.difficultySelected = this.educationalObject['difficulty']['value'][0];
    this.castTime(this.educationalObject['typicalLearningTime']['duration'][0]);
    this.description = this.educationalObject['description']['description'][0];
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

  ngOnDestroy(): void {
    console.log('[INFO]> Destroy Educational');
    
    this.educationalObject['typicalAgeRange']['typicalAgeRange'][0] = this.typicalAgeRange;
    this.educationalObject['description']['description'][0] = this.description;
    this.saveTime();

    this.lompadservice.objPricipal['data']['educational'] = this.educationalObject;
    this.lompadservice.saveObjectLompad(this.educationalObject, 'educational');
  }

}
