import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebchatService {

  userChatBackup=[
    {
      contactId:101,
      contactName:"Virat",
      chatHistory:[
        {
          date:"19/12/2022",
          chats:[
          {
            owner:false,
            message:"Hi",
            time:"12:23PM"
          },
          {
            owner:true,
            message:"Hello",
            time:"12:24PM"
          },
          {
            owner:false,
            message:"Good morning",
            time:"12:46PM"
          },
          {
            owner:true,
            message:"morning bro",
            time:"12:48PM"
          }
        ]
      },
      {
        date:"20/12/2022",
        chats:[
          {
            owner:true,
            message:"free now ??",
            time:"12:23PM"
          },
          {
            owner:false,
            message:"ya.. tell me wahstaup.",
            time:"12:24PM"
          }
        ]
      }
      ]
    },
    {
      contactId:102,
      contactName:"Rahul",
      chatHistory:[
        {
          date:"19/12/2022",
          chats:[
            {
              owner:false,
              message:"Hey bro",
              
              time:"01:30PM"
            },
            {
              owner:true,
              message:"Hi rahul. whatsup",
              
              time:"01:40PM"
            },
            {
              owner:false,
              message:"party !!",
              
              time:"09:07PM"
            },
            {
              owner:true,
              message:"always ready..where??",
              
              time:"09:26PM"
            }
          ]
        }
      ]
    },
    {
      contactId:103,
      contactName:"Rohit",
      chatHistory:[
       {
        date:"19/12/2022",
        chats:[
          {
            owner:false,
            message:"are u home",
            time:"12:23PM"
          },
          {
            owner:false,
            message:"come to park",
            time:"12:46PM"
          },
          {
            owner:true,
            message:"on my way.",
            time:"12:59PM"
          }
        ]
       }
      ]
    },
    {
      contactId:104,
      contactName:"Pandey",
      chatHistory:[
       {
        date:"19/12/2022",
        chats:[
          {
            owner:false,
            message:"lets talk",
            time:"12:23PM"
          },
          {
            owner:false,
            message:"dinner ??",
            time:"12:46PM"
          }
        ]
       },
       {
        date:"20/12/2022",
        chats:[
          {
            owner:true,
            message:"sorry.. nephew was accessing my phone the whole day",
            time:"12:23PM"
          }
        ]
       }
      ]
    },
    {
      contactId:105,
      contactName:"Amit",
      chatHistory:[
        {
          date:"19/12/2022",
          chats:[
            {
              owner:true,
              message:"are you hungry bro",
              time:"11:55AM"
            },
            {
              owner:false,
              message:"lets have momos",
              time:"12:23PM"
            },
            {
              owner:true,
              message:"i am working on my maths homework",
              time:"09:02PM"
            },
            {
              owner:false,
              message:"maths notes prepared ?? call me when free okk , I am waiting .. if get late then call me after 10pm",
              time:"09:44PM"
            }
          ]
        }
      ]
    }

  ]

  contactRealTimeName:string='';
  constructor() { }

  getUserChatBackup()
  {
    return this.userChatBackup;
  }

  getSpecificContactChat(id:number)
  {
    for(let item of this.userChatBackup)
    {
      if(item.contactId==id)
      {
        return item;
      }
    }
    return null;
  }

  getContactChatByClick():any{
    for(let item of this.userChatBackup)
    {
      if(item.contactName==this.contactRealTimeName){
         return this.getSpecificContactChat(item.contactId);
      }
    }
    return null;
  }

  setContactRealTimeName(name:string){
    this.contactRealTimeName = name;
  }

  saveChatHistoryOfSpecificPerson(contid:number,chatObj:{owner:boolean,message:string,time:string})
  {
    console.log("contactId = ",contid);
    console.log("chatObj = ",chatObj);
    
    let index = -1;
    for(let i=0;i<this.userChatBackup.length;i++)
    {
      if(this.userChatBackup[i].contactId==contid)
      { index = i;
        break;
      }
    }
    if(index!=-1)
    {
     let flag=0;
     console.log("user found at index = ",index);
     let currentDate = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
     console.log("current date = "+currentDate);
     
      for(let i=0;i<this.userChatBackup[index].chatHistory.length;i++)
      {
        let d = this.userChatBackup[index].chatHistory[i].date;
        if(currentDate==d)
        {
          flag=1;
          break;
        }
      } 
      if(flag==0)
      {
        //date does not exists
        console.log("todays date does not exists in chat history");
        
        this.userChatBackup[index].chatHistory.push({date:currentDate,chats:[chatObj]});
        console.log("chat history updated successfully !");
        console.log("updated chathistory = ",this.userChatBackup[index].chatHistory);
        
        
      }
      else
      {
        //date already exists
        console.log("todays date already exists in chat history");
        
        let lindex =  this.userChatBackup[index].chatHistory.length-1;

        this.userChatBackup[index].chatHistory[lindex].chats.push(chatObj);
        console.log("chat history updated successfully !");
        console.log("updated chathistory = ",this.userChatBackup[index].chatHistory);
        
      }
      return this.userChatBackup[index].chatHistory;
    }
    else
    {
      console.log("user with id="+contid+" was not found in chatbackup");
      
      return null;
    }
    
  }
  
  
}
