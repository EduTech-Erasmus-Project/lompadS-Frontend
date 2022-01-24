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

  // uploadedData$ = Observable;

  objPricipal: JSON;
  objPrincipalXML: any;

  private hash: string;
  private perfil: string;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService) {

    this.precarga();
    // this.preLoadMetadataFile();
  }

  async sendMetadataFile(metadataFile: any) {
    let uploadedData: any;
    let readData: any;

    await this.apiService.uploadMetadataFile(metadataFile).toPromise().then((response) => {
      uploadedData = response;
    }).catch(error => console.error('Something went wrong!', error));

    // this.apiService.uploadMetadataFile(metadataFile).subscribe(
    //   response => uploadedData = response,
    //   err => console.error('Observer sendMetadataFile got an error: ' + err),
    //   () => console.log('Observer sendMetadataFile got a complete notification')
    // );

    console.log('[DEBUG] sendMetadataFile> Response', uploadedData);

    if (uploadedData['STATUS_CODE'] == 200) {
      // this.setMetadataCookies(uploadedData);
      readData = await this.loadMetadataFile(uploadedData);

      return readData;
    } else {
      uploadedData = {'statusCode': 500}
      return uploadedData;
    }

  }

  async loadMetadataFile(uploadedData: any) {
    let hashedCode = uploadedData['HASHED_VALUE'];
    let profile = uploadedData['PERFIL'];

    let readData: any;

    await this.apiService.readMetadataFile(hashedCode, profile).toPromise().then((response) => {
      readData = response;
    }).catch(error => console.error('Something went wrong!', error));

    // this.apiService.readMetadataFile(hashedCode, profile).subscribe();

    console.log('[DEBUG] loadMetadataFile> Response', readData);

    if (readData['statusCode'] == 200) {
      this.setMetadataCookies(uploadedData);
      this.mapReload(readData['data']);
      
      return readData;
    } else {
      readData = {'statusCode': 500};
      return readData;
    }

  }

  setMetadataCookies(uploadedData: any) {
    this.cookieService.set('perfil', uploadedData['PERFIL']);
    this.cookieService.set('hash', uploadedData['HASHED_VALUE']);

    this.perfil = this.cookieService.get('perfil');
    this.hash = this.cookieService.get('hash');
  }

  preLoadMetadataFile() {

  }



































































  precarga() {//Usado cuando se desconecta el Frontend con el Blackend
    this.objPricipal = JSON.parse(localStorage.getItem('objPrincipal'));

    if (this.objPricipal != undefined) {    //PILAS       
      this.perfil = this.cookieService.get('perfil');
      this.hash = this.cookieService.get('hash');

      console.log("[INFO] LompadService> Perfil: ", this.perfil);
      console.log("[INFO] LompadService> Hash: ", this.hash);
      console.log("[INFO] LompadService> Data: ", this.objPricipal);
    }

  }

  // PILAS CON EL FORMATO
  precargaSimple(response: any) {//Usado cuando se sube un archivo por primera vez    
    this.cookieService.set('perfil', response['PERFIL']);
    this.cookieService.set('hash', response['HASHED_VALUE']);

    this.perfil = this.cookieService.get('perfil');
    this.hash = this.cookieService.get('hash');

    console.log("perfl: ", this.perfil);
    console.log("hash; ", this.hash);

    this.getobject();
    // this.downloadXML_API(this.hash);
  }

  getPerfil() {
    return this.perfil;
  }

  getHash() {
    return this.hash;
  }

  mapReload(param: JSON) {
    this.objPricipal = param;
    // console.log('[INFO]> 1: Antes de remover ', JSON.parse(localStorage.getItem('objPrincipal')));

    localStorage.removeItem('objPrincipal');
    // console.log('[INFO]> 2: Después de remover ', JSON.parse(localStorage.getItem('objPrincipal')));

    localStorage.setItem('objPrincipal', JSON.stringify(this.objPricipal));
    // console.log('[INFO]> 3: Después de volver a settear ', JSON.parse(localStorage.getItem('objPrincipal')));

    this.objPricipal$.emit(this.objPricipal);
    // this.objPrincipalXML$.emit(this.apiService.api_DownloadFile(this.hash));
    this.perfil$.emit(this.perfil);
    this.hash$.emit(this.hash);

    console.log("DATA: TYPE: ", typeof (this.objPricipal));
  }

  async subGetObject() {
    const response = await fetch("http://localhost:8000/private/read_file/?hashed_code=" + this.hash + "&profile=" + this.perfil, {
      method: 'GET',
      redirect: 'follow'
    });

    if (response.status !== 200) {
      throw Error("Algo sucede con el api")
    }

    return response.json()
  }

  async getobject() {
    try {
      const objjson = await this.subGetObject();
      // console.log(objjson['DATA']['general']);      
      this.mapReload(objjson);
    } catch (error) {
      console.log(`Error: =======> ${error}`);
    }
  }


  async subSetArchivo(data: any) {
    console.log('[INFO] Entra al SubSetArchivo')

    const response = await fetch("http://localhost:8000/uploadfile", { method: 'POST', body: data, redirect: 'follow' })

    console.log(response.status)

    if (response.status != 200) {
      throw Error(" Error con el Api al enviar el objeto ");
    }

    // console.log('[INFO] Contenido del Response: ', response.json())

    return response.json();
  }

  async setArchivo(data: any) {
    console.log('[INFO] Entra al SetArchivo')
    this.precargaSimple(await this.subSetArchivo(data));
  }


  // revLocal(){
  //   return this.datosGenerales;
  // }

  // AREA DE ACTUALIZACION

  saveObjectLompad(obj: any, hoja: string) {
    localStorage.setItem('objPrincipal', JSON.stringify(this.objPricipal));
    console.log("Guardando: => ", hoja)

    var data = JSON.stringify(obj)//.toLocaleLowerCase(); 
    console.log("TIPO DE DATOS ", typeof (data));

    // var pedro=JSON.parse(JSON.stringify(this.objPricipal).replace(/\s(?=\w+":)/g, ""));  
    // var data=JSON.parse(JSON.stringify(obj).replace(/\s(?=\w+":)/g, ""));     
    // data=JSON.stringify(data).toLocaleLowerCase(); 
    console.log("Enviando.... ", data, "Hoja: ", hoja);

    this.apiService.send_ObjectApi(data, this.hash, hoja);//enviar solo el objeto y el hash a actualizar                                    
    this.downloadXML_API(this.hash);//Actualiza el objecto cada vez que se guarde los cambiaos realizados
  }

  //AREA DE DESCARGA
  downloadJSON() {
    var pedro = JSON.parse(JSON.stringify(this.objPricipal).replace(/\s(?=\w+":)/g, ""));
    // const file=new Blob([pedro],{type:'application/json'});
    // // const file=new Blob([JSON.stringify(this.objPricipal, null, 2)], {type: 'application/json'});    
    // const url=window.URL.createObjectURL(file);
    // new Blob([pedro], {type: 'application/json'});

    try {
      // var FileSaver = require('file-saver');  
      var blob = new Blob([JSON.stringify(pedro, null, 2)], { type: 'application/json' });
      saveAs(blob, "ArchivoExportado.json");
    } catch (error) {
      console.log("Error al Descargar JSON: ======>", error);
    }

  }

  downloadXML() {
    //  console.log("TIpo de dato:  ",typeof(this.objPrincipalXML));
    try {
      // var FileSaver = require('file-saver');  
      var blob = new Blob([this.objPrincipalXML], { type: 'application/xml' });
      saveAs(blob, "ArchivoExportado.xml");
    } catch (error) {
      console.log("Error al Descargar XML: ======>", error);
    }

  }

  downloadXML_API(hash_param: string) {
    fetch("http://localhost:8000/private/download/?hashed_code=" + hash_param, {

      method: 'GET',
      redirect: 'follow'
    })
      .then(response => {
        response.text()
        console.log('XD XD', JSON.stringify(response))
      })
      .then(result => {
        console.log('XD XD', JSON.stringify(result))
        this.objPrincipalXML = result
        // this.objPrincipalXML$.emit(this.objPrincipalXML)
        console.log('[INFO] Parte del objeto principal en download', this.objPrincipalXML);
      })
      .catch(error => console.log('error', error));
  }

}
