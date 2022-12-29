import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalcComponent } from './modules/calculator/calc/calc.component';
import { HomeComponent } from './modules/tictaktoe/home/home.component';
import { EditComponent } from './modules/todolist/edit/edit.component';
import { ListComponent } from './modules/todolist/list/list.component';
import { NewtaskComponent } from './modules/todolist/newtask/newtask.component';
import { LoginComponent } from './modules/user-auth/login/login.component';
import { RegistrationComponent } from './modules/user-auth/registration/registration.component';
import { ChathomeComponent } from './modules/webchat/chathome/chathome.component';
import { ProfileComponent } from './modules/webchat/profile/profile.component';

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
    path:"",component:CalcComponent
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
        path:"",component:HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
