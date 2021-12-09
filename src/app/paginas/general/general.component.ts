import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { LompadService } from "src/app/servicios/lompad.service";
import { ObjOptions } from "../../modelo/objOptions";
import { MessageService } from "primeng/api";

import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: "app-general",
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
          style({transform: 'translateX(50%)', opacity: 0}),
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
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.css"],
  providers: [MessageService],
})
export class GeneralComponent implements OnInit, OnDestroy {
  estructuras: any = [];
  nivelesAgregacion: any = [];
  idiomas: any = [];

  columns: any[];

  palabra: string;
  palabraDialog: boolean;

  estructuraSelect: string;
  nivel_select: string;
  idiomaSelect: string;

  general_obj: any;

  ObjOptions: ObjOptions = new ObjOptions();

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice: LompadService,
    private toas: MessageService
  ) {}

  loadDatos() {
    // await this.precargaComprobar();
    this.general_obj = this.lompadservice.objPricipal["DATA"]["general"];
  }

  async precargaComprobar() {
    return new Promise((resolve, reject) => {
      resolve(2);
      this.lompadservice.precarga();
    });
  }

  ngOnInit(): void {
    this.loadDatos();
    this.estructuras = [
      { label: "atómica", value: "atomic", code: "ato" },
      { label: "colección", value: "collection", code: "coll" },
      { label: "en red", value: "networked", code: "red" },
      { label: "jerárquica", value: "hiperarchical", code: "je" },
      { label: "lineal", value: "linear", code: "li" },
    ];

    this.nivelesAgregacion = [
      { label: "1", value: "1", code: "1" },
      { label: "2", value: "2", code: "2" },
      { label: "3", value: "3", code: "3" },
      { label: "4", value: "4", code: "4" },
    ];

    this.idiomas = [
      {label: "none", value: "none", code: "none"},
      {label: "fra", value: "fra", code: "fra"},
      {label: "fra-CA", value: "fra-CA", code: "fra-CA"},
      {label: "fra-FR", value: "fra-FR", code: "fra-FR"},
      {label: "eng", value: "eng", code: "eng"},
      {label: "eng-AU", value: "eng-AU", code: "eng-AU"},
      {label: "eng-CA", value: "eng-CA", code: "eng-CA"},
      {label: "eng-GB", value: "eng-GB", code: "eng-GB"},
      {label: "eng-US", value: "eng-US", code: "eng-US"},
      {label: "deu", value: "deu", code: "deu"},
      {label: "esl", value: "esl", code: "esl"},
      {label: "ita", value: "ita", code: "ita"},
      {label: "por", value: "por", code: "por"},
      {label: "fr", value: "fr", code: "fr"},
      {label: "fr-CA", value: "fr-CA", code: "fr-CA"},
      {label: "fr-FR", value: "fr-FR", code: "fr-FR"},
      {label: "en", value: "en", code: "en"},
      {label: "en-AU", value: "en-AU", code: "en-AU"},
      {label: "en-CA", value: "en-CA", code: "en-CA"},
      {label: "en-GB", value: "en-GB", code: "en-GB"},
      {label: "en-US", value: "en-US", code: "en-US"},
      {label: "de", value: "de", code: "de"},
      {label: "es", value: "es", code: "es"},
      {label: "it", value: "it", code: "it"},
      {label: "pt", value: "pt", code: "pt"},
    ]

    this.columns = [];
    this.ObjOptions = this.componentePrincipal.objOptions;

    console.log("Desde General: ", this.general_obj);

    this.estructuraSelect = this.general_obj["Structure"];
    this.nivel_select = this.general_obj["Aggregation Level"];
    this.idiomaSelect = this.general_obj["Language"];

    this.cargarkeywords();
  }

  ngOnDestroy(): void {
    this.general_obj["Keyword"] = this.columns;
    this.lompadservice.objPricipal["DATA"]["general"] = this.general_obj;
    console.log("Destroy General");
    this.lompadservice.saveObjectLompad(this.general_obj, "general");
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
    this.palabra = "";
  }

  cargarkeywords() {
    let keys: [] = this.general_obj["Keyword"];
    keys.forEach((element) => {
      console.log("elementos ", element);
      this.columns.push(element);
    });
  }

  cambioEstructura() {
    console.log(this.estructuraSelect);
    this.general_obj["Structure"] = this.estructuraSelect;
  }

  cambio_nivel() {
    console.log(this.nivel_select);
    this.general_obj["Aggregation Level"] = this.nivel_select;
    this.toas.add({
      key: "tst",
      severity: "success",
      summary: "NO lo saques papi!!",
      detail: "Message sent",
    });
  }

  cambioIdioma(){
    console.log(this.idiomaSelect);
    this.general_obj["Language"] = this.idiomaSelect;
  }

  public saveInfo() {
    // this.lompadservice.setObjectGeneral(this.general_obj);
  }
}
