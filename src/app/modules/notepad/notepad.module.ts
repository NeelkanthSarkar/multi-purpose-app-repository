import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotepadRoutingModule } from './notepad-routing.module';
import { NotepadhomeComponent } from './notepadhome/notepadhome.component';
import { EditpageComponent } from './editpage/editpage.component';


@NgModule({
  declarations: [
    NotepadhomeComponent,
    EditpageComponent
  ],
  imports: [
    CommonModule,
    NotepadRoutingModule
  ]
})
export class NotepadModule { }
