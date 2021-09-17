import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class ApiService {
  // private objson: any = { value: "", icon_url: "", id: "", url: "" };
  


  constructor(private http:HttpClient) { }


  send_ObjectApi(obj:any,hascode:string,hoja:string){
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
