import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodolistRoutingModule } from './todolist-routing.module';
import { ListComponent } from './list/list.component';
import { NewtaskComponent } from './newtask/newtask.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    ListComponent,
    NewtaskComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    TodolistRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class TodolistModule { }
