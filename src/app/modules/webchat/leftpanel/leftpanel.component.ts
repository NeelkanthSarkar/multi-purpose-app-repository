import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WebchatService } from 'src/app/services/webchat.service';

@Component({
  selector: 'app-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.css']
})
export class LeftpanelComponent implements OnInit{
  
  userChat:any;
  selectedUserChat:any;
  constructor(private chatservice:WebchatService){}

  ngOnInit(): void {
    this.userChat = this.chatservice.getUserChatBackup();
  }

  showSpecificChat(event:any){
   let tempId:number =Number(event.target.firstElementChild.innerText);  
    this.selectedUserChat = this.userChat[tempId];
    console.log(this.selectedUserChat);
  }

}
