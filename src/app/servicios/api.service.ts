import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { saveAs } from 'file-saver';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  uploadMetadataFile(body: any): Observable<any> {
    return this.http.post<any>(environment.URL_UPLOAD_FILE, body).pipe(
      map((response: any) => response, (error: any) => error)
    );
  }

  readMetadataFile(hashedCode: string, profile: string): Observable<any> {
    let url = environment.URL_READ_FILE + '/?hashed_code=' + hashedCode + '&profile=' + profile;

    return this.http.get<any>(url).pipe(
      map((response: any) => response, (error: any) => error)
    );
  }

  updateMetadata(object: any, hashedCode: string, leaf: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    let body = JSON.stringify({});
    let params = new HttpParams()
      .append('hashed_code', hashedCode)
      .append('hoja', leaf)
      .append('data', object);

    return this.http.post<any>(environment.URL_UPDATE_FILE + '/', body, {
      headers: headers,
      params: params
    }).pipe(map(
        (response: any) => response, (error: any) => error)
    );
  }

  downloadMetadataFile(hashedCode: string, option: string, mime: string, params?: HttpParams) {
    let url = environment.URL_DOWNLOAD + '/?hashed_code=' + hashedCode + '&option=' + option;
    let filename = hashedCode+'.'+option;

    this.http.get(url, {responseType: "blob", params: params}).subscribe((content: any) => {
      const blob = new Blob([content], { type: mime });
      saveAs(blob, filename);
    }, async (error) => {
      const message = JSON.parse(await error.error.text()).message;
      console.log(message);
    });
  }

  // 
  // Para arriba los nuevos
  // 


  send_ObjectApi(obj: any, hascode: string, hoja: string) {
    var raw = "";
    console.log("PILAS CON EL api  objecto: ", obj);

    // console.log("=========================================");

    fetch("http://localhost:8000/private/update/?hashed_code=" + hascode + "&hoja=" + hoja + "&data=" + obj, {
      method: 'POST',
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => console.log("$$RESULTADO$$:  ", typeof (result)))
      .catch(error => console.log('error', error));
  }

  api_DownloadFile(hash_param: string) {
    // console.log(hash_param);
    var param;
    fetch("http://localhost:8000/private/download/?hashed_code=" + hash_param, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => param = result)
      .catch(error => console.log('error', error));
    return param;
  }

  getXML() {
    return new Promise((resolve, reject) => {
      console.log('[INFO] Entra aca')
      var param;
      fetch("http://localhost:8000/private/download/?hashed_code=ArchivoExportado_-6482018054697832733", {
        method: 'GET',
        redirect: 'follow'
      })
        .then(response => response.text())
        .then(result => param = result)
        .catch(error => console.log('error', error));
      resolve(param);
    });
  }

}
