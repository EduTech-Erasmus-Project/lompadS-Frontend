import { Component, Input, OnInit } from '@angular/core';

import { AppMainComponent } from './app.main.component';
import { AppComponent } from './app.component';
import { ObjOptions } from './modelo/objOptions';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[];
    enableGeneral: boolean;
    ObjOptions: ObjOptions = new ObjOptions();

    @Input() onChange;

    constructor(
        public appMain: AppMainComponent,
        public app: AppComponent
    ) {
        // this.enableGeneral=true;
    }
    // AQUI SE PUEDE ADICIONAR LOS DE MAS COMPONENTES QUE VAN EN EL SISTEMA opciones que van en la 
    // barra lateral 

    ngOnInit() {
        //Esto es super util 
        this.ObjOptions = this.app.objOptions;
        this.onChange.subscribe(res => {
            this.recargarMenuLateral();
        });

        this.model = [
            { label: 'Menu.general', disable: this.ObjOptions.o1, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/general'] },
            { label: 'Menu.lifeCycle', disable: this.ObjOptions.o2, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/livecicle'] },
            { label: 'Menu.metaMetadata', disable: this.ObjOptions.o3, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/metadatos'] },
            { label: 'Menu.technical', disable: this.ObjOptions.o4, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/tecnica'] },
            { label: 'Menu.educational', disable: this.ObjOptions.o5, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/usoeducativo'] },
            { label: 'Menu.rights', disable: this.ObjOptions.o6, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/derechos'] },
            { label: 'Menu.relation', disable: this.ObjOptions.o7, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/relacion'] },
            { label: 'Menu.annotation', disable: this.ObjOptions.o8, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/anotacion'] },
            { label: 'Menu.classification', disable: this.ObjOptions.o9, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/clasidicacion'] },
            { label: 'Menu.accessibility', disable: this.ObjOptions.o10, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/accesibilidad'] }
        ];

        // Para que el submenu quede estatico    
        // this.appMain.sidebarActive=true;
        // this.appMain.staticMenuActive=true;//este es el mas importante
    }

    recargarMenuLateral() {
        this.ObjOptions = this.app.objOptions;

        this.model = [
            { label: 'Menu.general', disable: this.ObjOptions.o1, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/general'] },
            { label: 'Menu.lifeCycle', disable: this.ObjOptions.o2, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/livecicle'] },
            { label: 'Menu.metaMetadata', disable: this.ObjOptions.o3, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/metadatos'] },
            { label: 'Menu.technical', disable: this.ObjOptions.o4, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/tecnica'] },
            { label: 'Menu.educational', disable: this.ObjOptions.o5, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/usoeducativo'] },
            { label: 'Menu.rights', disable: this.ObjOptions.o6, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/derechos'] },
            { label: 'Menu.relation', disable: this.ObjOptions.o7, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/relacion'] },
            { label: 'Menu.annotation', disable: this.ObjOptions.o8, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/anotacion'] },
            { label: 'Menu.classification', disable: this.ObjOptions.o9, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/clasidicacion'] },
            { label: 'Menu.accessibility', disable: this.ObjOptions.o10, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/accesibilidad'] }
        ];
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }

}
