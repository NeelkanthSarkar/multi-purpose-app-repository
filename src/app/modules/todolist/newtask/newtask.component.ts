import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodolistService } from 'src/app/services/todolist.service';
import { TodoListType } from 'src/app/services/TodoListType';
import * as $ from 'jquery';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent {

  todolistform = new FormGroup({
    title:new FormControl('',Validators.required),
    description:new FormControl('')
  });
  constructor(private todoservice:TodolistService){}
  
  addNewTaskinTodoList()
  {
    let currentdate = this.getDateinString();
    
    let item:TodoListType = {
      
      id:this.todoservice.maxId+1,
      title:''+this.todolistform.get('title')?.value,
      description:''+this.todolistform.get('description')?.value,
      date:currentdate
    }
    this.todoservice.addNewTaskintoTodoListArray(item).subscribe(res=>{
      if(res==null||res==undefined){
        alert("Adding new task failed. Try again later.");
      }
      else{
        alert("Adding new task successful");
        $('#title').val('');
        $('#description').val('');
        document.getElementById('backtolistbutton')?.click();
      }
    });
    
  }

  get title()
  {
    return this.todolistform.get('title');
  }
  get description()
  {
    return this.todolistform.get('description');
  }

  getDateinString():string {
    let day = new Date().getDate();
    let mon = new Date().getMonth();
    let year = new Date().getFullYear();
    return day+'/'+(mon+1)+'/'+year;
  }
  
}

