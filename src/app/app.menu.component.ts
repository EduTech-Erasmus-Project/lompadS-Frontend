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
    // inicial:any[];
    enableGeneral:boolean;
    ObjOptions:ObjOptions=new ObjOptions();

    @Input() onChange;

    constructor(
        public appMain: AppMainComponent,
        public app:AppComponent
        ) {
        // this.enableGeneral=true;
    }
    // AQUI SE PUEDE ADICIONAR LOS DE MAS COMPONENTES QUE VAN EN EL SISTEMA opciones que van en la 
    // barra lateral 
    


    ngOnInit() {  
        // this.serviceGeneral.objOptions$.subscribe(param=>{
		// });

        this.ObjOptions=this.app.objOptions;//Esto es super util 
        this.onChange.subscribe(res=>{
            // console.log('FUCNIONAAAAAAAA!!!!!',res)
            this.recargarMenuLateral();
        });

        // console.log("objecti: ",this.ObjOptions)
        // this.ObjOptions=this.serviceGeneral.objOptions;			
        // this.appMain.staticMenuActive=false;
        
        // this.inicial=[
        //     {label: '1.0. Inicio', icon: 'pi pi-fw pi-file', routerLink: ['/paginas/inicio']}
        // ];

        this.model = [                        
            {label: '1. General' ,disable:this.ObjOptions.o1, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/general']},
            {label: '2. Ciclo de vida',disable:this.ObjOptions.o2, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/livecicle']},
            {label: '3. Meta-Datos',disable:this.ObjOptions.o3, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/metadatos']},
            {label: '4. Técnica',disable:this.ObjOptions.o4, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/tecnica']},
            {label: '5. Uso Educativo',disable:this.ObjOptions.o5, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/usoeducativo']},
            {label: '6. Derechos',disable:this.ObjOptions.o6, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/derechos']},
            {label: '7. Relación',disable:this.ObjOptions.o7, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/relacion']},
            {label: '8. Anotación',disable:this.ObjOptions.o8, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/anotacion']},
            {label: '9. Clasificación',disable:this.ObjOptions.o9, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/clasidicacion']},
            {label: '10. Accesibilidad',disable:this.ObjOptions.o10, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/accesibilidad']}
        ];

        // Para que el submenu quede estatico    
        // this.appMain.sidebarActive=true;
        // this.appMain.staticMenuActive=true;//este es el mas importante
     
    }

    recargarMenuLateral() {  
        this.ObjOptions=this.app.objOptions;        
                        
        this.model = [                        
            {label: '1. General' ,disable:this.ObjOptions.o1, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/general']},
            {label: '2. Ciclo de vida',disable:this.ObjOptions.o2, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/livecicle']},
            {label: '3. Meta-Datos',disable:this.ObjOptions.o3, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/metadatos']},
            {label: '4. Técnica',disable:this.ObjOptions.o4, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/tecnica']},
            {label: '5. Uso Educativo',disable:this.ObjOptions.o5, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/usoeducativo']},
            {label: '6. Derechos',disable:this.ObjOptions.o6, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/derechos']},
            {label: '7. Relación',disable:this.ObjOptions.o7, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/relacion']},
            {label: '8. Anotación',disable:this.ObjOptions.o8, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/anotacion']},
            {label: '9. Clasificación',disable:this.ObjOptions.o9, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/clasidicacion']},
            {label: '10. Accesibilidad',disable:this.ObjOptions.o10, icon: 'pi pi-fw pi-file', routerLink: ['/paginas/accesibilidad']}                      
        ];
    }

    onMenuClick() {                   
        this.appMain.menuClick = true;
    }

    // public setGeneral(param:boolean){
    //     this.enableGeneral=param;
    // }
}
