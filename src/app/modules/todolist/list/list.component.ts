import { Component, OnInit } from '@angular/core';
import { TodolistService } from 'src/app/services/todolist.service';
import { TodoListType } from 'src/app/services/TodoListType';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(private todolistservice:TodolistService){
  }
  
  myTodoList:TodoListType[]=[];
 

  ngOnInit(): void {
    this.todolistservice.getTotoListArray().subscribe(res=>{
      if(res==null||res==undefined){
        alert("something went wrong .. no data found");
      }
      else{
        this.myTodoList = res as TodoListType[];
        this.setMaxIdValue();
      }
    });
  }
  deleteCurrentTask(id:number)
  {
    if(confirm("Are you sure to delete the task ?")){
      this.todolistservice.deleteItemById(id).subscribe(res=>{
        if(res==null||res==undefined){
          alert("something went wrong..delete operation unsuccessful !");
        }
        else{
           this.todolistservice.getTotoListArray().subscribe(res=>{
             if(res==null||res==undefined){
              alert("No data found.");
             }
             else{
               this.myTodoList = res as TodoListType[];
               this.setMaxIdValue();
             }
           });
        }
       });       
    }     
  }
  setMaxIdValue(){
    let max=-1;
    for(let item of this.myTodoList){
     if(item.id>max){
       max=item.id;
     }
    }
    if(max!=-1)
    this.todolistservice.setMaxId(max);
    else
    this.todolistservice.setMaxId(100);
  }


}
