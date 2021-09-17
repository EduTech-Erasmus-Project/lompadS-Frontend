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
            
          

            // ,
            // {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            // {
            //     label: 'UI Kit', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
            //     items: [
            //         {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
            //         {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
            //         {label: 'Float Label', icon: 'pi pi-bookmark', routerLink: ['/uikit/floatlabel']},
            //         {label: 'Invalid State', icon: 'pi pi-exclamation-circle', routerLink: ['/uikit/invalidstate']},
            //         {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
            //         {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
            //         {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
            //         {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
            //         {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
            //         {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
            //         {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
            //         {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu']},
            //         {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
            //         {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
            //         {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
            //         {label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc']},
            //         {label: 'PRUEBA DE LINK EN GRUPO', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc']}
            //     ]
            // },
            // {
            //     label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['utilities'],
            //     items: [
            //         {label: 'Display', icon: 'pi pi-fw pi-desktop', routerLink: ['utilities/display']},
            //         {label: 'Elevation', icon: 'pi pi-fw pi-external-link', routerLink: ['utilities/elevation']},
            //         {label: 'FlexBox', icon: 'pi pi-fw pi-directions', routerLink: ['utilities/flexbox']},
            //         {label: 'Icons', icon: 'pi pi-fw pi-search', routerLink: ['utilities/icons']},
            //         {label: 'Text', icon: 'pi pi-fw pi-pencil', routerLink: ['utilities/text']},
            //         {label: 'Widgets', icon: 'pi pi-fw pi-star-o', routerLink: ['utilities/widgets']},
            //         {label: 'Grid System', icon: 'pi pi-fw pi-th-large', routerLink: ['utilities/grid']},
            //         {label: 'Spacing', icon: 'pi pi-fw pi-arrow-right', routerLink: ['utilities/spacing']},
            //         {label: 'Typography', icon: 'pi pi-fw pi-align-center', routerLink: ['utilities/typography']}
            //     ]
            // },
            // {
            //     label: 'Pages', icon: 'pi pi-fw pi-copy', routerLink: ['/pages'],
            //     items: [
            //         {label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud']},
            //         {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar']},
            //         {label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline']},
            //         { label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
            //         { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login'], target: '_blank' },
            //         { label: 'Error', icon: 'pi pi-fw pi-exclamation-triangle', routerLink: ['/error'], target: '_blank' },
            //         { label: '404', icon: 'pi pi-fw pi-times', routerLink: ['/404'], target: '_blank' },
            //         {label: 'Access Denied', icon: 'pi pi-fw pi-ban', routerLink: ['/accessdenied'], target: '_blank'},
            //         { label: 'Empty', icon: 'pi pi-fw pi-clone', routerLink: ['/pages/empty'] },
            //     ]
            // },
            // {
            //     label: 'Hierarchy', icon: 'pi pi-fw pi-sitemap',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-sign-in',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-sign-in',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Docs', icon: 'pi pi-fw pi-file', routerLink: ['/documentation']
            // },
            // {
            //     label: 'Buy Now', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
            // }
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
