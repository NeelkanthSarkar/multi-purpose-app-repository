import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TictaktoeRoutingModule } from './tictaktoe-routing.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TictaktoeRoutingModule,
    RouterModule
  ]
})
export class TictaktoeModule { }
