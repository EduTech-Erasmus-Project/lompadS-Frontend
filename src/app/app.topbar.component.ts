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

		this.lompadService.hash$.subscribe(param => {
			this.hash = param;
		});

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

		//Realizo esto solamente para que aparezca en el top bar
		if (this.cookieService.check('perfil')) {
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
		this.lompadService.downloadMetadataFile('json');
		this.toas.add({ key: 'tst', severity: 'success', summary: 'JSON descargado exitosamente', detail: 'Message sent' });
	}

	descargaXML() {
		this.lompadService.downloadMetadataFile('xml');
		this.toas.add({ key: 'tst', severity: 'success', summary: 'XML descargado exitosamente', detail: 'Message sent' });
	}

	descargaZIP() {
		this.lompadService.downloadMetadataFile('zip');
		this.toas.add({ key: 'tst', severity: 'success', summary: 'ZIP descargado exitosamente', detail: 'Message sent' });
	}

	ngOnDestroy(): void {
		this.objJson.unsubscribe();
		this.obj_XML.unsubscribe();
	}

	rebootPrincipal() {
		this.objprincipal = this.lompadService.objPricipal;
	}

	rebootXML() {
		// console.log('[INFO] XML Preview');
		this.objXML = this.lompadService.objPrincipalXML;
	}

}
