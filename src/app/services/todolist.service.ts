import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListType } from './TodoListType';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  

   /*
   ----------------------- TODO LIST API ----------------------------
   Method                   URL                    Description
   ------------------------------------------------------------------
   GET                     /list                   get the list of tasks
   GET                     /list/id                get item by ID
   POST                    /add                    add a new task
   PUT                     /update                 update a item
   DELETE                  /delete/id              delete item by ID
   */

   apiURL = "http://localhost:8080/todolist/";
   maxId:number=-1;
   listObj:any;
   constructor(private http:HttpClient){}
   getTotoListArray():Observable<Object>{
    this.listObj = this.http.get(this.apiURL+"list");
    return this.listObj;
   }

   addNewTaskintoTodoListArray(item:TodoListType):Observable<Object>{
      return this.http.post(this.apiURL+"add",item);
   }

   getItemById(id:number):Observable<Object>
   {
    return this.http.get(this.apiURL+"list/"+id);
   }
   updateOneItem(item:TodoListType):Observable<Object>
   {
     return this.http.put(this.apiURL+"update",item);
   }

   deleteItemById(id:number)
   {
     return this.http.delete(this.apiURL+"delete/"+id);
   }
   setMaxId(max: number) {
    this.maxId = max;
   }
}
