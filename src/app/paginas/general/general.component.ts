import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { LompadService } from "src/app/servicios/lompad.service";
import { ObjOptions } from "../../modelo/objOptions";
import { MessageService } from "primeng/api";


import {trigger, state, style, transition, animate} from '@angular/animations';


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
  columns: any[];

  palabra: string;
  palabraDialog: boolean;
  estructuraSelect: string;
  nivel_select: string;
  general_obj: any;

  ObjOptions: ObjOptions = new ObjOptions();

  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event) {
  //     console.log("SLIENFO")
  //     // this.service.add({key: 'tst', severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
  //     // this.service.add({key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes'});
  //     // this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
  //     // this.toas.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
  // }

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
    this.columns = [];
    this.ObjOptions = this.componentePrincipal.objOptions;

    console.log("Desde General: ", this.general_obj);
    // PILAS CON ESTOS
    this.estructuraSelect = this.general_obj["Structure"];
    this.nivel_select = this.general_obj["Aggregation Level"];
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

    // this.service.add({key: 'tst', severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
    // this.service.add({key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes'});
    // this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    // this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
  }

  public saveInfo() {
    // this.lompadservice.setObjectGeneral(this.general_obj);
  }
}
