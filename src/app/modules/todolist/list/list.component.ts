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
    this.myTodoList = this.todolistservice.getTotoListArray();
  }
  deleteCurrentTask(id:number)
  {
     this.todolistservice.deleteItemById(id);
     this.myTodoList = this.todolistservice.getTotoListArray();
  }
}
