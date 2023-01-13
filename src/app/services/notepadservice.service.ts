import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotepadFileType } from './NotepadFileType';

@Injectable({
  providedIn: 'root'
})
export class NotepadserviceService {
  /*
  --------------------API description ------------------------
  METHOD           URL                  DESCRIPTION
  -----------------------------------------------
  GET             /files                returns all the files
  GET             /file/id              returns one file by ID
  POST            /add                  adds a new file in database
  PUT             /update               update data inside a file by ID
  DELETE          /delete/id            delete file by ID
 */
 
  listofUnsavedFiles:NotepadFileType[]=[];
  apiURL:string = "http://localhost:8080/";
  constructor(private http:HttpClient) {}
   

  getListOfFiles():Observable<Object>{
    let r = this.http.get(this.apiURL+'files');
    r.subscribe(res=>{
      this.listofUnsavedFiles = res as NotepadFileType[];
    });
    return r;
  }

  getFileByIndex(index:number):Observable<Object>{
    return this.http.get(this.apiURL+'file/'+index);
  }
  getUnsavedFileByIndex(index:number){
    return this.listofUnsavedFiles[index];
  }
  addNewFileIntoFileList(file:NotepadFileType):Observable<Object>{
    console.log("addNewfile called");
    return this.http.post(this.apiURL+'add',file);
  }
  saveDataInUnsavedFilelist(index:number,data:string){
    this.listofUnsavedFiles[index].content = data;
  }
  updateDataInFile(file:NotepadFileType){
    return this.http.put(this.apiURL+'update',file);
  }
  updateFileNameAndExtension(file:NotepadFileType){
    return this.http.put(this.apiURL+'update',file);
  }
  deleteAFileById(index: number) {
     return this.http.delete(this.apiURL+'delete/'+index);
  }
}
