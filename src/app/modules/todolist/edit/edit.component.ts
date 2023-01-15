import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TodolistService } from 'src/app/services/todolist.service';
import { TodoListType } from 'src/app/services/TodoListType';
import * as $ from 'jquery';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
 

  todolistform = new FormGroup({
    title:new FormControl('',Validators.required),
    description:new FormControl('')
  });
  itemId:number = 0;
  item:TodoListType={
    id:0,
    title:'',
    description:'',
    date:''
  };

  constructor(private todoservice:TodolistService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));    
     this.todoservice.getItemById(this.itemId).subscribe(res=>{
      if(res==null||res==undefined){
        alert("No data avaible by the id = "+this.itemId);
      }
      else{
        this.item = res as TodoListType;
        this.todolistform.setValue({title:this.item.title,description:this.item.description});
      }
     });            
  }

  updateExistingTask()
  {
    this.item.title = String(this.todolistform.get('title')?.value);
    this.item.description = String(this.todolistform.get('description')?.value);
    this.item.date = this.getDateinString();
    this.todoservice.updateOneItem(this.item).subscribe(res=>{
      if(res==null||res==undefined){
        alert("Updating data failed. Try again later.");
      }
      else{
        alert("\nTask Updated Successful !"); 
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
