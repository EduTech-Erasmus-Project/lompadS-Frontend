import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private http:HttpClient) { }

  uploadMetadataFile(body: any): Observable<any> {
    return this.http.post<any>(environment.URL_UPLOAD_FILE, body).pipe(
      map((response: any) => response, (error: any) => error)
    );
  }

  readMetadataFile(hashedCode: string, profile: string): Observable<any> {
    let url = environment.URL_READ_FILE+'/?hashed_code='+hashedCode+'&profile='+profile

    return this.http.get<any>(url).pipe(
      map((response: any) => response, (error: any) => error)
    );
  }

  updateMetadata(){
    environment.URL_UPDATE_FILE

  }

  downloadMetadataFile(){
    environment.URL_DOWNLOAD

  }

  // 
  // Para arriba los nuevos
  // 


  send_ObjectApi(obj:any, hascode:string, hoja:string){
    var raw = "";
    console.log("PILAS CON EL api  objecto: ",obj);
    
    // console.log("=========================================");
        
    fetch("http://localhost:8000/private/update/?hashed_code="+hascode+"&hoja="+hoja+"&data="+obj, {
      method: 'POST',
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => console.log("$$RESULTADO$$:  ",typeof(result)))
      .catch(error => console.log('error', error));    
  }

   api_DownloadFile(hash_param:string){   
    // console.log(hash_param);
    var param;
    fetch("http://localhost:8000/private/download/?hashed_code="+hash_param, {    
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => param=result)
      .catch(error => console.log('error', error));    
    return param;
  }

  getXML(){
    return new Promise((resolve,reject)=>{
      console.log('[INFO] Entra aca')
      var param;      
      fetch("http://localhost:8000/private/download/?hashed_code=ArchivoExportado_-6482018054697832733",{
        method: 'GET',
        redirect: 'follow'
      })
        .then(response => response.text())
        .then(result => param=result)
        .catch(error => console.log('error', error));   
      resolve(param);
    });
  }



  // send_OjbLifeCycle(obj:any){
 
  // }

  // send_ObjMetadata(obj:any){
    
  // }

  // send_ObjTecnica(obj:any){
    
  // }

  // send_UsoEducativo(obj:any){
    
  // }

  // send_Derechos(obj:any){
    
  // }

  // send_Relacion(obj:any){

  // }

  // send_Anotacion(obj:any){

  // }

  // send_Clasifiaction(obj:any){

  // }

    

}
