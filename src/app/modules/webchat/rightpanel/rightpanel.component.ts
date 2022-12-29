import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WebchatService } from 'src/app/services/webchat.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.css']
})
export class RightpanelComponent implements OnChanges{
 
 
  
  @Input() contactChat:any;
  changesObj:SimpleChanges={}; 
  
  constructor(private chatservice:WebchatService){}
  ngOnChanges(changes: SimpleChanges): void {
   console.log(changes);
   this.changesObj = changes;
  }
  sendReplyOnEnterKeyPress(event:any,value:string)
  {
    if(event.keyCode==13)
    {
      this.sendReplyToSpecifiedPerson(value);
    }
  }
  sendReplyToSpecifiedPerson(value:string)
  {
   
    let chatOfUserObject:any;

    if(value!='')
    {
    console.log("user message ="+value);
    
    let timeString:string = this.getCurrentTime();
    console.log("time = "+timeString);
    
    let chatObject = {owner:true,message:value,time:timeString};
    console.log("chat object to be saved =",chatObject);

    let contactObject = this.changesObj['contactChat'].currentValue;
    console.log("currentValue in change object = ",contactObject);
    
      chatOfUserObject = this.chatservice.saveChatHistoryOfSpecificPerson(contactObject.contactId,chatObject);
    }
    if(chatOfUserObject!=null)
    {
      console.log(chatOfUserObject);
    }
    $('#chatreply').val('');
    $('#pg').animate({scrollTop:$('#pg').get(0)?.scrollHeight},1000);
   
  }

  getCurrentTime():string
  {
    let timestr = new Date().getHours()+":"+new Date().getMinutes();
    let currentHour = new Date().getHours();
    if(currentHour>11)
    {
      if(currentHour>12)
      {
        let hr = currentHour-12;
        
        if(hr<10)
        {
           let hrstr = "0"+hr+":"+new Date().getMinutes()+"PM";
           timestr = hrstr;
        }
        else
        {
           timestr = hr+":"+new Date().getMinutes()+"PM";
        }
      }
      else
      {
        timestr = timestr+"PM"; 
      }
    }
    else{
      timestr =  timestr+"AM";
    }
    return timestr;
  }

}
