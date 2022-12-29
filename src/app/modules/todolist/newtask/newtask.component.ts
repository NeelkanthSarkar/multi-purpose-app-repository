import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodolistService } from 'src/app/services/todolist.service';
import { TodoListType } from 'src/app/services/TodoListType';

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
      id:this.todoservice.getMaximumIdValue()+1,
      title:''+this.todolistform.get('title')?.value,
      description:''+this.todolistform.get('description')?.value,
      date:currentdate
    }
    this.todoservice.addNewTaskintoTodoListArray(item);
    alert("\nNew Task Added Successfully !");
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
    let hr = new Date().getHours();
    let min = new Date().getMinutes();
    let ampm='';
    if(hr<12)
    ampm='AM'
    else
    ampm='PM'
  
    return day+'/'+(mon+1)+'/'+year+' , '+hr+':'+min+ampm;
  }
  
}

