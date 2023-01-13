import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeMRoutingModule } from './home-m-routing.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeMRoutingModule,
    RouterModule
  ]
})
export class HomeMModule { }
