import { Injectable } from '@angular/core';
import { TodoListType } from './TodoListType';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  todoListServiceArray:TodoListType[]=[];
  constructor() {
    this.todoListServiceArray = [
      {
        id:101,
        title:"task 1",
        description:"this is task 1 description",
        date:"12/6/2022,06:23"
      },
      {
        id:102,
        title:"task 2",
        description:"this is task 2 description",
        date:"12/6/2022,06:23"
      },
      {
        id:103,
        title:"task 3",
        description:"this is task 3 description",
        date:"12/6/2022,06:23"
      },
      {
        id:104,
        title:"task 4",
        description:"this is task 4 description",
        date:"12/6/2022,06:23"
      },
      {
        id:105,
        title:"task 5",
        description:"this is task 5 description",
        date:"12/6/2022,06:23"
      }
    ];
   }

   getTotoListArray(){
    return this.todoListServiceArray;
   }

   addNewTaskintoTodoListArray(item:TodoListType){
      this.todoListServiceArray.push(item);
   }

   getMaximumIdValue():number
   {
    let max:number=0;
     for(let item of this.todoListServiceArray)
     {
      if(max<item.id)
      max=item.id;
     }
     return max;
   }

   getItemById(id:number):TodoListType
   {
    let item:TodoListType={id:0,title:'',description:'',date:''};
    for(let tem of this.todoListServiceArray)
    {
      if(tem.id==id)
      item = tem;
    }
     return item;
   }
   updateOneItem(item:TodoListType):boolean
   {
     for(let product of this.todoListServiceArray)
     {
      if(product.id==item.id)
      {
        product.title = item.title;
        product.description = item.description;
        product.date = item.date;
        return true;
      }
     }
     return false;
   }

   deleteItemById(id:number)
   {
     this.todoListServiceArray = this.todoListServiceArray.filter(item=>item.id!=id);
   }
}
