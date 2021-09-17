import { Component, Renderer2, OnInit } from '@angular/core';
import { MenuService } from './app.menu.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PrimeNGConfig, MegaMenuItem } from 'primeng/api';
import {AppComponent} from './app.component';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';


@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html',
    animations: [
        trigger('mask-anim', [
            state('void', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 0.8
            })),
            transition('* => *', animate('250ms cubic-bezier(0, 0, 0.2, 1)'))
        ])
    ]
})

export class AppMainComponent {

    brodCastChnage: BehaviorSubject<any> = new BehaviorSubject(null);

    rightPanelClick: boolean;

    rightPanelActive: boolean;

    menuClick: boolean;

    staticMenuActive: boolean;

    menuMobileActive: boolean;

    megaMenuClick: boolean;

    megaMenuActive: boolean;

    megaMenuMobileClick: boolean;

    megaMenuMobileActive: boolean;

    topbarItemClick: boolean;

    topbarMobileMenuClick: boolean;

    topbarMobileMenuActive: boolean;

    sidebarActive: boolean;

    activeTopbarItem: any;

    topbarMenuActive: boolean;

    menuHoverActive: boolean;

    configActive: boolean;

    configClick: boolean;


    // DECLARACION DE VARIABLES    

    megaMenuPerfiles: boolean;
    megaMenuPerfilesClick: boolean;


    megaMenuViewJSON: boolean;
    megaMenuViewJSONClick: boolean;


    megaMenuViewXML: boolean;
    megaMenuViewXMLClick: boolean;

    public enableGeneral:boolean;
    


    constructor(
        public renderer: Renderer2,
        private menuService: MenuService,
        private primengConfig: PrimeNGConfig,
        public app: AppComponent,
        // private appTopBar: AppTopBarComponent,
        private router:Router      
        ) {
            this.router.navigateByUrl("");            

        }

        public setGeneral(param:boolean){
            this.enableGeneral=param;
        }
   
        onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.rightPanelClick) {
            this.rightPanelActive = false;
        }

        if (!this.megaMenuClick) {
            this.megaMenuActive = false;
        }

        // Agregado para menu personalizado
        if(!this.megaMenuPerfilesClick){
            this.megaMenuPerfiles=false;
        }

        if(!this.megaMenuViewJSONClick){
            this.megaMenuViewJSON=false;
        }

        if(!this.megaMenuViewXMLClick){
            this.megaMenuViewXML=false;
        }

        if (!this.megaMenuMobileClick) {
            this.megaMenuMobileActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal()) {
                this.menuService.reset();
            }

            if (this.menuMobileActive) {    
                this.menuMobileActive = false;
            }

            this.menuHoverActive = false;
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        this.configClick = false;
        this.menuClick = false;
        this.topbarItemClick = false;
        this.megaMenuClick = false;
        this.megaMenuPerfilesClick = false;
        this.megaMenuViewJSONClick = false;
        this.megaMenuViewXMLClick = false;
        this.megaMenuMobileClick = false;
        this.rightPanelClick = false;
    }

    // saveInfoGeneral(){
    //     this.generalcom.saveInfo();
    // }
   

    onMegaMenuButtonClick(event) {
        this.megaMenuClick = true;
        this.megaMenuActive = !this.megaMenuActive;
        event.preventDefault();
    }

    onMegamenuButtonPerfiles(event){
        this.megaMenuPerfilesClick=true;
        this.megaMenuPerfiles=!this.megaMenuPerfiles;
        event.preventDefault();
        
    }

    cambioPerfil(){
        this.brodCastChnage.next('something'); //PARA APRECIAR LOS CAMBIOS EN LA BARRA LATERAL         
    }
 

    onMegamenuButtonJSON(event){
        this.megaMenuViewJSONClick=true;
        this.megaMenuViewJSON=!this.megaMenuViewJSON;
        event.preventDefault();
    }

    onMegamenuButtonXML(event){
        this.megaMenuViewXMLClick=true;
        this.megaMenuViewXML=!this.megaMenuViewXML;
        event.preventDefault();
    }


    onMegaMenuPerfilClick(event){
        this.megaMenuPerfilesClick=true;
        event.preventDefault();
    }

    onMegaMenuJSONClick(event){
        this.megaMenuViewJSONClick=true;
        event.preventDefault();
    }

    onMegaMenuXMLClick(event){
        this.megaMenuViewXMLClick=true;
        event.preventDefault();
    }

    onMegaMenuClick(event) {
        this.megaMenuClick = true;
        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null; } else {
            this.activeTopbarItem = item; }

        event.preventDefault();
    }

    onRightPanelButtonClick(event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;

        event.preventDefault();
    }

    onRightPanelClose(event) {
        this.rightPanelActive = false;
        this.rightPanelClick = false;

        event.preventDefault();
    }

    onRightPanelClick(event) {
        this.rightPanelClick = true;

        event.preventDefault();
    }

    onTopbarMobileMenuButtonClick(event) {
        this.topbarMobileMenuClick = true;
        this.topbarMobileMenuActive = !this.topbarMobileMenuActive;

        event.preventDefault();
    }

    onMegaMenuMobileButtonClick(event) {
        this.megaMenuMobileClick = true;
        this.megaMenuMobileActive = !this.megaMenuMobileActive;

        event.preventDefault();
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.topbarMenuActive = false;

        if (this.isMobile()) {
            this.menuMobileActive = !this.menuMobileActive;
        }

        event.preventDefault();
    }

    onSidebarClick(event: Event) {
        this.menuClick = true;
    }

    onToggleMenuClick(event: Event) {
        this.staticMenuActive = !this.staticMenuActive;
        event.preventDefault();
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
        this.primengConfig = event.checked;
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return window.innerWidth <= 991;
    }

    isHorizontal() {
        return this.app.horizontalMenu === true;
    }

}
