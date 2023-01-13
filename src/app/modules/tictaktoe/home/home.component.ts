import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class TTTHomeComponent {
  
  counter:number=0;
  userIDs:number[]=[];
  pairsOfSuccess=['123','456','789','147','258','369','159','357'];
  thesuccesspair3:string[]=[];
  displayMessage:boolean=false;

  boxClick(id:string)
  {
    this.counter++;
    let boxid = Number(id);
    this.userIDs.push(boxid);
    $('#'+boxid).html("<img src='../../../../assets/images/letter O.jpg' width:'90%' height='90%'/>");    

    setTimeout(() => {

    if(this.counter==1)
    {
      this.putFirstCounterMark(boxid);
    }
    else if(this.counter==2)
    {
      if(!this.putSecondCounterMark(this.userIDs))
       this.putFirstCounterMark(this.userIDs[1]);
    }
    else if(this.counter==3)
    {
      if(this.checkForPairOfThree(this.userIDs))
      {
        this.animateTheThreeSuccessPairsGreen(this.thesuccesspair3);
        setTimeout(() => {
              $('#success-failure-message-box label').html("YOU WIN");
              this.displayMessage=true;
        }, 1000);
        setTimeout(() => {
          this.displayMessage=false;
          this.emptyAllBoxes();          
        }, 3000);
      }
      else
      {
        if(this.putThirdCounterMark(this.userIDs))
        {
           let devArray = this.findDeveloperArrayOfMarks(this.userIDs);
           if(this.checkForAnyMatches(devArray))
           {
            this.animateTheThreeSuccessPairsRed(this.thesuccesspair3);
            setTimeout(() => {
              $('#success-failure-message-box label').html("YOU LOSE");
              this.displayMessage=true;              
            }, 1000);
            setTimeout(()=>{
              this.displayMessage=false;
              this.emptyAllBoxes();
            },3000)
           }
        }
        else
        {
          alert("Something went wrong.. unable to mark 3rd X");
        }
      }
    }
    else if(this.counter==4)
    {
      if(this.checkForAnyMatches(this.userIDs))
      {
        this.animateTheThreeSuccessPairsGreen(this.thesuccesspair3);
        
            setTimeout(() => {
              $('#success-failure-message-box label').html("YOU WIN");
              $('#success-failure-message-box').css("display","flex");
            }, 1000);
        
        setTimeout(()=>{
          $('#success-failure-message-box').css("display","none");
          this.emptyAllBoxes();
        },3000)
      }
      else{
        if(this.putFourthCounterMark(this.userIDs))
        {
          let devArray = this.findDeveloperArrayOfMarks(this.userIDs);
          if(this.checkForAnyMatches(devArray))
          {            
              this.animateTheThreeSuccessPairsRed(this.thesuccesspair3);
        
                   setTimeout(() => {
                    $('#success-failure-message-box label').html("YOU LOSE");
                   $('#success-failure-message-box').css("display","flex");
                   }, 1000);
          
              setTimeout(() => {
                $('#success-failure-message-box').css("display","none");
                this.emptyAllBoxes();
              }, 3000);                        
          }
        }
        else{
          alert("Something went wrong.. unable to mark 4th X");
        }
      }
      
    }
    else
    {
       this.getFifthMarkResult(this.userIDs);
    }
    }, 500);
    
  }

  putFirstCounterMark(id:number)
  {
    let nearbyboxes = this.getNearbyBoxesNumber(id);
    let flag=0;
    for(let i=0;i<nearbyboxes.length;i++)
    {
      flag=0;
      let t = $('#'+nearbyboxes[i]).children().length;
      if(t==0)
      {
        $('#'+nearbyboxes[i]).html("<img src='../../../../assets/images/letter X.png' width:'90%' height='90%'/>");        
        flag=1;
        break;
      }
    }
    if(flag==1)
    return true;
    else
    return false;
  }

  putSecondCounterMark(idArray:number[]):boolean
  {
    let reqIndex=-1;
    let counter =0;
    let resultstr='';
    for(let i=0;i<this.pairsOfSuccess.length;i++)
   {
      resultstr='';
      counter=0;  
      for(let j=0;j<idArray.length;j++)
      {
        if(this.pairsOfSuccess[i].includes(String(idArray[j])))
        {
          counter++;
        }
      } 
      if(counter==2)
      {
        resultstr=this.pairsOfSuccess[i];
        break;
      }

   }
   if(counter==2)
   {
    let temp = resultstr.replace(String(idArray[0]),'');
    temp = temp.replace(String(idArray[1]),'');
    
    if($('#'+temp).children().length==0)
    {
      $('#'+temp).html("<img src='../../../../assets/images/letter X.png' width:'90%' height='90%'/>");           
      return true;
    }
    else
    {
      return false;
    }
   }
   else{
    
    return false;
   }
  }
  
  putThirdCounterMark(idArray:number[]):boolean
  {
        let secondTwoPair = [idArray[1],idArray[2]];
        let thirdTwoPair = [idArray[0],idArray[2]];
       
          if(!this.putSecondCounterMark(secondTwoPair))
          {
            if(!this.putSecondCounterMark(thirdTwoPair))
            {
              if(this.putFirstCounterMark(idArray[2]))
              return true;
              else
              return false;
            }
            else{
              return true;
            }
          }
          else
          {
            return true;
          }                   
    
  }
  putFourthCounterMark(idArray:number[]):boolean
  {
    
    let left2Boxes:number[]= [];
    for(let i=1;i<=9;i++)
    {
      if($('#'+i).children().length==0)
      {
        if(i!=idArray[0]&&i!=idArray[1]&&i!=idArray[2]&&i!=idArray[3])
        {
          left2Boxes.push(i);
          if(left2Boxes.length==2)
          break;
        }
      }
    }
    if(this.checkTheEmptyBoxPairsWith2BoxesForSuccessPair(left2Boxes[0],idArray))
    {
        $('#'+left2Boxes[0]).html("<img src='../../../../assets/images/letter X.png' width:'90%' height='90%'/>");             
        return true;            
    }
    else if(this.checkTheEmptyBoxPairsWith2BoxesForSuccessPair(left2Boxes[1],idArray))
    {      
        $('#'+left2Boxes[1]).html("<img src='../../../../assets/images/letter X.png' width:'90%' height='90%'/>");             
        return true;      
    }
    else
    {
      if(this.putFirstCounterMark(idArray[3]))
      return true;
      else
      return false;
    }        
  }
  getFifthMarkResult(idArray:number[])
  {
    if(this.checkForAnyMatches(idArray))
    {
      this.animateTheThreeSuccessPairsGreen(this.thesuccesspair3);
      setTimeout(() => {
        $('#success-failure-message-box label').html("YOU WIN");
        this.displayMessage=true;
      }, 1000);
      setTimeout(() => {
        this.displayMessage=false;
        this.emptyAllBoxes();
      }, 3000);
    }  
    else{
      setTimeout(() => {
        $('#success-failure-message-box label').html("-- TIE --");
      $('#success-failure-message-box').css("display","flex");
      }, 1000);
      setTimeout(() => {
        $('#success-failure-message-box').css("display","none");
        this.emptyAllBoxes();
      }, 3000);
    }
  }
  checkTheEmptyBoxPairsWith2BoxesForSuccessPair(num:number,idArray:number[]):boolean
  {    
    for(let i=0;i<idArray.length;i++)
    {
      for(let j=0;j<idArray.length;j++)
      {
        if(i!=j)
        {
          let pair3 = [idArray[i],idArray[j],num];   
          if(this.checkForAnyMatches(pair3))
          {            
            return true;
          }
        }
      }
    }
    return false;
  }
  checkForAnyMatches(idArray:number[])
  {
    let myStr :string='';
    let successpair:string[]=[];
    for(let i=0;i<idArray.length;i++)
    {
      myStr = myStr+idArray[i];
    }
    let count=0;
    for(let i=0;i<this.pairsOfSuccess.length;i++)
    {
      count=0;
      for(let j=0;j<3;j++)
      {
        if(myStr.includes(this.pairsOfSuccess[i].charAt(j)))
        {
          count++;
        }
      }
      if(count==3)
      {
        successpair[0] = this.pairsOfSuccess[i].charAt(0);
        successpair[1] = this.pairsOfSuccess[i].charAt(1);
        successpair[2] = this.pairsOfSuccess[i].charAt(2);
        this.thesuccesspair3 = successpair;
        break;
      }
    }
    if(count==3)
    {
      return true;
    }
    return false;
  }
    

  
  checkForPairOfThree(idArray:number[]):boolean
  {
    let str = idArray[0]+''+idArray[1]+''+idArray[2];    
    let c =0;
    for(let i=0;i<this.pairsOfSuccess.length;i++)
    {
      c=0;
      for(let j=0;j<3;j++)
      {
        let s = String(idArray[j]);
        if(this.pairsOfSuccess[i].includes(s))
        {
          c++;
        }
      }
      if(c==3)
      {
        break;
      }
    }
    if(c!=3)
    {
      return false;
    }
    else
    {          
      return true;
    }
  }
  findDeveloperArrayOfMarks(idArray:number[]):number[]
  {
    let devIDArray:number[]=[];
    for(let i=1;i<=9;i++)
    {
       if(i!=idArray[0]&&i!=idArray[1]&&i!=idArray[2])
       {
        if($('#'+i).children().length==1)
        {
          devIDArray.push(i);
        }
       }
    }   
    return devIDArray;    
  }

  getNearbyBoxesNumber(num: number) {
    switch(num)
    {
      case 1:return ['2','4','5'];
      case 2:return ['1','3','4','5','6'];
      case 3:return ['2','5','6'];
      case 4:return ['1','2','5','7','8'];
      case 5:return ['1','2','3','4','6','7','8','9'];
      case 6:return ['2','3','5','8','9'];
      case 7:return ['4','5','8'];
      case 8:return ['4','5','6','7','9'];
      case 9:return ['5','6','8'];
      default:return [];
    }
  }
  emptyAllBoxes() 
  {
    for(let i=1;i<=9;i++)
    {
      $('#'+i).html("");
    }
    this.counter =0;
    this.userIDs=[];
    $('#'+this.thesuccesspair3[0]).css({"border":"1px solid black","box-shadow":""});
    $('#'+this.thesuccesspair3[1]).css({"border":"1px solid black","box-shadow":""});
    $('#'+this.thesuccesspair3[2]).css({"border":"1px solid black","box-shadow":""});
  }
  animateTheThreeSuccessPairsGreen(pair3:string[])
  {
    $('#'+pair3[0]).css({"border":"5px solid green","box-shadow":"0px 0px 10px 5px green"});
    $('#'+pair3[1]).css({"border":"5px solid green","box-shadow":"0px 0px 10px 5px green"});
    $('#'+pair3[2]).css({"border":"5px solid green","box-shadow":"0px 0px 10px 5px green"});
  }
  animateTheThreeSuccessPairsRed(pair3:string[])
  {
    $('#'+pair3[0]).css({"border":"5px solid red","box-shadow":"0px 0px 10px 5px red"});
    $('#'+pair3[1]).css({"border":"5px solid red","box-shadow":"0px 0px 10px 5px red"});
    $('#'+pair3[2]).css({"border":"5px solid red","box-shadow":"0px 0px 10px 5px red"});
  }

  
}
