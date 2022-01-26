import { Component } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { AppComponent } from './app.component';
import { LompadService } from './servicios/lompad.service';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-topbar',
	templateUrl: './app.topbar.component.html',
	providers: [MessageService]
})
export class AppTopBarComponent {
	idiomas: any[];
	activeItem: number;
	perfiles: any[];
	perfilesSelect: string;
	objXML: any;
	objMostrar: any;
	hash: any;
	display1: boolean;

	objprincipal: any;

	private objJson: Subscription;
	private obj_XML: Subscription;

	constructor(
		public appMain: AppMainComponent,
		private componentePrincipal: AppComponent,
		private lompadService: LompadService,
		private toas: MessageService,
		private cookieService: CookieService
	) { }

	ngOnInit() {
		this.idiomas = [
			{ label: 'es', value: { id: 1, name: 'es', code: 'es' } },
			{ label: 'en', value: { id: 2, name: 'en', code: 'en' } },
			{ label: 'fr', value: { id: 3, name: 'fr', code: 'fr' } },
		];

		this.perfiles = [
			{ label: 'IEEE LOM', value: 'IEEE LOM', code: 'ieee' },
			{ label: 'CanCore', value: 'CanCore', code: 'cancore' },
			{ label: 'SCORM', value: 'SCORM', code: 'scorm' },
			{ label: 'LMRI', value: 'LMRI', code: 'lmri' }
		];

		// this.objprincipal$=this.lompadService.getObjectPrincipal$();
		// this.objprincipal$.subscribe(objto => this.objprincipal=objto);

		this.lompadService.hash$.subscribe(param => {
			this.hash = param;
		});

		// this.objprincipal=this.lompadService.objPricipal;

		this.objJson = this.lompadService.objPricipal$.subscribe(param => {
			this.objprincipal = param;
		});

		this.obj_XML = this.lompadService.objPrincipalXML$.subscribe(param => {
			this.objXML = param;
		});

		this.lompadService.perfil$.subscribe(param => {
			this.perfilesSelect = param;
			this.componentePrincipal.cambioPerfilLocal(param);
			this.appMain.cambioPerfil();
		});

		this.display1 = false;

		console.log("[INFO] TopBar Component> Profile: ", this.perfilesSelect);
		console.log("[INFO] TopBar Component> JSON: ", this.objprincipal);
		console.log("[INFO] TopBar Component> XML: ", this.objXML);

		if (this.cookieService.check('perfil')) {//Realizo esto solamente para que aparecza en el top bar
			// this.lompadService.objPricipal$.unsubscribe();
			this.objJson.unsubscribe();
			this.obj_XML.unsubscribe();
			this.objprincipal = this.lompadService.objPricipal;
			this.perfilesSelect = this.lompadService.getPerfil();
			this.componentePrincipal.cambioPerfilLocal(this.lompadService.getPerfil());
			this.appMain.cambioPerfil();
			this.hash = this.lompadService.getHash();
		}
	}

	mobileMegaMenuItemClick(index) {
		this.appMain.megaMenuMobileClick = true;
		this.activeItem = this.activeItem === index ? null : index;
	}

	cambioIdioma(event) {
		this.componentePrincipal.cambioIdiomaAplication(event);
	}

	cambioPerfil(event) {
		this.componentePrincipal.cambioPerfil(event);
		this.appMain.cambioPerfil()
	}

	band: boolean;
	runDialog(param: number) {
		// this.appMain.saveInfoGeneral();
		// this.lompadService.callComponentMethod("DEsde topbar");
		this.display1 = true;
		if (param === 1) {
			this.band = true;
			this.rebootPrincipal();
		} else {
			this.band = false;
			this.rebootXML();
		}
	}

	descargaJSON() {
		this.lompadService.downloadJSON();
		this.toas.add({ key: 'tst', severity: 'success', summary: 'JSON descargado exitosamente', detail: 'Message sent' });
	}

	descargaXML() {
		this.lompadService.downloadMetadataFile('xml');
		// this.toas.add({ key: 'tst', severity: 'success', summary: 'XML descargado exitosamente', detail: 'Message sent' });
		// this.toas.add({ key: 'tst', severity: 'error', summary: 'Formato no soportado', detail: 'Message sent' });
	}

	descargaZIP() {
		this.lompadService.downloadMetadataFile('zip');
		// window.location.href = "http://localhost:8000/private/download?hashed_code=" + this.hash;
		// this.toas.add({ key: 'tst', severity: 'success', summary: 'ZIP descargado exitosamente', detail: 'Message sent' });
		// this.toas.add({ key: 'tst', severity: 'error', summary: 'Formato no soportado', detail: 'Message sent' });
	}

	ngOnDestroy(): void {
		this.objJson.unsubscribe();
		this.obj_XML.unsubscribe();
		// this.lompadService.objPricipal$.unsubscribe();
		// // this.lompadService.objPrincipalXML$.unsubscribe();
		// this.lompadService.perfil$.unsubscribe();
		// this.lompadService.hash$.unsubscribe();
	}

	rebootPrincipal() {
		this.objprincipal = this.lompadService.objPricipal;
	}

	rebootXML() {
		console.log('[INFO] XML Preview')
		this.objXML = this.lompadService.objPrincipalXML;
	}

}
