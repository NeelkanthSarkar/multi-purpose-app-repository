import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { WebchatprofileService } from 'src/app/services/webchatprofile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
 
  userProfileInfo:{
    name:string,
    about:string,
    mobilenumber:string,
    profilepic:string
     } =
      {name:'',about:'',mobilenumber:'',profilepic:''};
      
    displayEditDetailsBox:boolean=false;

  constructor(private webchatprofileservice:WebchatprofileService){}
  
  ngOnInit(): void {
     this.userProfileInfo = this.webchatprofileservice.getUserProfileInfo();  
  }
  changeProfile(){
    
    $('#input-type-file').trigger('click');
    
  }
  changeProfileInputFieldClicked(event:any){
  
     let file = event.target.files[0];
     let type = file.type;
     
     let reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = readerEvent =>{
      let content = readerEvent.target?.result;
      this.webchatprofileservice.setProfilePicture(''+content);
    }
  }

  showEditPersonalDetailsBox()
  {
    this.displayEditDetailsBox = true; 
  }
  saveChangesOnPersonalInfo(about:string)
  {
    this.webchatprofileservice.setAboutOfUser(about);
    $('#userabout').val('');
    this.displayEditDetailsBox = false; 
  }

}
