import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { LompadService } from '../../servicios/lompad.service';



@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  
    form: FormGroup;
    API: "http://172.16.210.80:8000/uploadfile";
    uploadedFiles: any[] = [];

  constructor( 
    
    public fb: FormBuilder,
    private http: HttpClient,
    private lompadservice: LompadService
    ) { 

      this.form = this.fb.group({
        file: [null]
      })


   

    }


  ngOnInit(): void {
  }

//   onUpload(event) {
//     // for (const file of event.files) {
//     //     this.uploadedFiles.push(file);
//     // }
 
// }


//   upload(event) {
//     console.log("subir evento")
//     const file = (event.target as HTMLInputElement).files[0];
//     this.form.patchValue({
//       file: file
//     });
//     this.form.get('file').updateValueAndValidity()
    
//  }


//  submit() {
//   var formData: any = new FormData();
//   formData.append("file", this.form.get('file').value);
//   console.log(this.API)
//   console.log(formData)
//   // https://orange-yak-68.loca.lt/docs
//   // http://172.16.210.80:8000/uploadfile
//   this.http.post("http://localhost:8000/uploadfile", formData).subscribe(    
//     (response) => this.lompadservice.setObjson(response), //this.lompadservice.setObjson(response)
//     (error) => console.log(error)
//   )
// }

}
