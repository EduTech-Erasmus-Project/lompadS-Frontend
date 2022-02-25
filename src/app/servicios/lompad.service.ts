import { EventEmitter, Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { saveAs } from 'file-saver';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LompadService {
  objPricipal$ = new EventEmitter<any>();
  objPrincipalXML$ = new EventEmitter<any>();
  hash$ = new EventEmitter<any>();
  perfil$ = new EventEmitter<any>();

  objPricipal: JSON;
  objPrincipalXML: any;

  private hash: string;
  private perfil: string;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService) {

    this.preLoadMetadataFile();
  }

  async sendMetadataFile(metadataFile: any) {
    let uploadedData: any;
    let readData: any;

    await this.apiService.uploadMetadataFile(metadataFile).toPromise().then((response) => {
      uploadedData = response;
    }).catch(error => console.error('[Upload] Something went wrong!', error));

    // console.log('[DEBUG] sendMetadataFile> Response', uploadedData);

    // console.log('[DEBUG] Status?', uploadedData.status)

    if (uploadedData['STATUS_CODE'] == 200) {
      readData = await this.loadMetadataFile(uploadedData);

      return readData;
    } else {
      uploadedData = { 'statusCode': 500 }
      return uploadedData;
    }

  }

  async loadMetadataFile(uploadedData: any) {
    let hashedCode = uploadedData['HASHED_VALUE'];
    let profile = uploadedData['PERFIL'];

    let readData: any;

    await this.apiService.readMetadataFile(hashedCode, profile).toPromise().then((response) => {
      readData = response;
    }).catch(error => console.error('[Read] Something went wrong!', error));

    // console.log('[DEBUG] loadMetadataFile> Response', readData);

    if (readData['statusCode'] == 200) {
      this.setMetadataCookies(uploadedData);
      this.mapReload(readData['data'], readData['XML_FILE']);

      return readData;
    } else {
      readData = { 'statusCode': 500 };
      return readData;
    }

  }

  setMetadataCookies(uploadedData: any) {
    this.cookieService.set('perfil', uploadedData['PERFIL']);
    this.cookieService.set('hash', uploadedData['HASHED_VALUE']);

    this.perfil = this.cookieService.get('perfil');
    this.hash = this.cookieService.get('hash');
  }

  sendNewMetadata(object: any, leaf: string) {
    let leaftData = JSON.stringify(object);
    let res: any;

    localStorage.setItem('objPrincipal', JSON.stringify(this.objPricipal));
    // console.log("[INFO] sendNewMetadata> Saving:", leaf);

    this.apiService.updateMetadata(leaftData, this.hash, leaf).toPromise().then((response) => {
      res = response;
      this.objPrincipalXML = res['XML_FILE'];
      this.objPrincipalXML$.emit(this.objPrincipalXML);
    }).catch(error => console.error('[Update] Something went wrong!', error));
  }

  downloadMetadataFile(option: string) {
    var filename = this.hash + '';

    if (option != 'json') {
      if (option == 'xml') {
        this.apiService.downloadMetadataFile(this.hash, option, 'application/xml');
      } else {
        this.apiService.downloadMetadataFile(this.hash, option, 'application/zip');
      }
    }

    if (option == 'json') {
      var metadataObject = JSON.parse(JSON.stringify(this.objPricipal).replace(/\s(?=\w+":)/g, ""));

      // console.log('INFO', metadataObject)
      try {
        var blob = new Blob([JSON.stringify(metadataObject, null, 2)], { type: 'application/json' });
        filename = filename + '.json';
        saveAs(blob, filename);
      } catch (error) {
        console.log(error);
      }
    }

  }

  preLoadMetadataFile() {//Usado cuando se desconecta el Frontend con el Blackend
    this.objPricipal = JSON.parse(localStorage.getItem('objPrincipal'));
    this.objPrincipalXML = localStorage.getItem('objXML');

    if (this.objPricipal != undefined) {    //PILAS       
      this.perfil = this.cookieService.get('perfil');
      this.hash = this.cookieService.get('hash');

      // console.log("[INFO] LompadService> Perfil: ", this.perfil);
      // console.log("[INFO] LompadService> Hash: ", this.hash);
      // console.log("[INFO] LompadService> Data: ", this.objPricipal);
    }

  }

  getPerfil() {
    return this.perfil;
  }

  getHash() {
    return this.hash;
  }

  mapReload(jsonMetadata: JSON, xmlMetadata: any) {
    this.objPricipal = jsonMetadata;
    this.objPrincipalXML = xmlMetadata;
    // console.log('[INFO]> 1: Antes de remover ', JSON.parse(localStorage.getItem('objPrincipal')));

    localStorage.removeItem('objPrincipal');
    localStorage.removeItem('objXML');
    // console.log('[INFO]> 2: Después de remover ', JSON.parse(localStorage.getItem('objPrincipal')));

    localStorage.setItem('objPrincipal', JSON.stringify(this.objPricipal));
    localStorage.setItem('objXML', JSON.stringify(this.objPrincipalXML));
    // console.log('[INFO]> 3: Después de volver a settear ', JSON.parse(localStorage.getItem('objPrincipal')));

    this.objPricipal$.emit(this.objPricipal);
    this.objPrincipalXML$.emit(this.objPrincipalXML);
    this.perfil$.emit(this.perfil);
    this.hash$.emit(this.hash);
  }

}
