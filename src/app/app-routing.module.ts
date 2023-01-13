import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalcComponent } from './modules/calculator/calc/calc.component';
import { TTTHomeComponent } from './modules/tictaktoe/home/home.component';
import { NotepadhomeComponent } from './modules/notepad/notepadhome/notepadhome.component';
import { EditComponent } from './modules/todolist/edit/edit.component';
import { ListComponent } from './modules/todolist/list/list.component';
import { NewtaskComponent } from './modules/todolist/newtask/newtask.component';
import { LoginComponent } from './modules/user-auth/login/login.component';
import { RegistrationComponent } from './modules/user-auth/registration/registration.component';
import { ChathomeComponent } from './modules/webchat/chathome/chathome.component';
import { ProfileComponent } from './modules/webchat/profile/profile.component';
import { HomeComponent } from './modules/home-m/home/home.component';

const routes: Routes = [
  {
    path:"auth",children:[
      {
        path:"login",component:LoginComponent
      },
      {
        path:"signup",component:RegistrationComponent
      }
    ],
  },
  {
    path:"calculator",component:CalcComponent
  },
  {
    path:"todolist", children:[{
      path:"", component:ListComponent
    },
    {
      path:"newtask", component:NewtaskComponent
    },
    {
      path:"edittask/:id",component:EditComponent
    },
    {
      path:"edittask", redirectTo:"",pathMatch:"full"
    }
  ]
  },
  {
    path:"webchat", children:[
      {
        path:"", component:ChathomeComponent
      },
      {
        path:"profile", component:ProfileComponent
      }
    ]
  },
  {
    path:"tictaktoe",children:[
      {
        path:"",component:TTTHomeComponent
      }
    ]
  },
  {
    path:"notepad",children:[
      {
        path:"",component:NotepadhomeComponent
      }
    ]
  },
  {
    path:"",component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
