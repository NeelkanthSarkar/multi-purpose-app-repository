import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebchatprofileService {

   userProfileInfo:{
    name:string,
    about:string,
    mobilenumber:string,
    profilepic:string
     } = {name:"Monkey D Luffy",about:"Available",mobilenumber:"9898989898",profilepic:'../../../../assets/images/luffyLogo.png'}
  
     constructor() { }
    
     setProfilePicture(str:string)
     {
      this.userProfileInfo.profilepic = str;
     }
     getUserProfileInfo(){
      return this.userProfileInfo;
     }
     setAboutOfUser(about:string)
     {
      this.userProfileInfo.about = about;
     }

}
