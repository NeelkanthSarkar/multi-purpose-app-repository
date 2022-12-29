import { Component, OnInit } from '@angular/core';
import { WebchatprofileService } from 'src/app/services/webchatprofile.service';

@Component({
  selector: 'app-chathome',
  templateUrl: './chathome.component.html',
  styleUrls: ['./chathome.component.css']
})
export class ChathomeComponent implements OnInit {
  
  userProfileInfo:{
    name:string,
    about:string,
    mobilenumber:string,
    profilepic:string
     }
     = {name:'',about:'',mobilenumber:'',profilepic:''} 

  constructor(private webchatprofileservice:WebchatprofileService){}
  ngOnInit(): void {
   this.userProfileInfo = this.webchatprofileservice.getUserProfileInfo();
  }

}
