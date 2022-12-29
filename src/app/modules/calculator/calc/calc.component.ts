import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit{

  userInput:string='';
  calcOutput:number=0;
  operatorFlag: number=0;
  operatorCount:number=0;
  constructor(){}
  ngOnInit(): void {
    $('#calcInput').val(this.userInput);
    $('#calcValue').html(''+this.calcOutput);
   
  }

  clearClicked(){
     this.userInput = '';
     $('#calcValue').html('');
     this.operatorFlag=0;
     this.operatorCount=0;
  }
  operatorClicked(operator:string){
    $('#calcInput').scrollTop(500);
     if(this.operatorFlag==0)
     {
      if(this.userInput.length==0)
      {
        this.userInput = '0' + operator ;
      }
      else{
        this.userInput = this.userInput + operator; 
      }
      if(this.operatorFlag>1)
      {
         
      }
      this.operatorFlag = 1;
      this.operatorCount++;

     }
      
      
  }
  equalChicked(){
    this.userInput = ''+$('#calcInput').val();
     this.findOutput();
  }
  backspaceClicked(){
    if(this.userInput.length>0){
    this.userInput = this.userInput.slice(0,this.userInput.length-1);
    }
  }
  numberClicked(num:string){
    $('#calcInput').scrollTop(500);
    this.operatorFlag=0; 
    if(this.operatorCount>0&&num!='.')
    {
      if(this.operatorCount==1)
      {
        this.userInput = this.userInput+num;
        this.findOutput();
      }
      else
      {
        this.userInput = this.userInput+num;
        let val = this.getmultipleOperatorCalculatedValue();
        $('#calcValue').html(''+val);
      }
    }
    else
    {
      this.userInput = this.userInput+num;
    }
     
  }
  findOutput(){
    let opr:string='';
    
    if(this.userInput.includes('/'))
    {
      opr = '/';
    }
    else if(this.userInput.includes('*'))
    {
      opr = '*';
    }
    else if(this.userInput.includes('+'))
    {
      opr = '+';
    }
    else if(this.userInput.includes('-'))
    {
      opr = '-';
    }
    
    let num1 = Number(this.userInput.slice(0,this.userInput.indexOf(opr)));
    let num2 = Number(this.userInput.slice(this.userInput.indexOf(opr)+1));
    let finalval:number = this.getCalculatedValue(num1,num2,opr);
    $('#calcValue').html(''+finalval);
    return finalval;
  }
  getCalculatedValue(num1:number,num2:number,opr:string):number
  {
    if(opr=='/'){
      return num1/num2;
    }
    else if(opr=='*'){
      return num1*num2;
    }
    else if(opr=='+'){
      return num1+num2;
    }
    else{
      return num1-num2;
    }
  }
  percentageOperatorClicked(){

    let val:number = Number($('#calcValue').html());
    console.log(val);
    if(val==0)
    {
      let val2:string = String($('#calcInput').val());
      if(!(val2.includes('/')||val2.includes('*')||val2.includes('+')||val2.includes('-')))
      {
        val2 = String(Number(val2)/100);
        $('#calcValue').html(''+val2);
      }
    }
    else
    {
      val = val/100;
      console.log(val)
      $('#calcValue').html(''+val);
    }
    
   
  }

 getmultipleOperatorCalculatedValue() {
 
  let userInputCopy:string = this.userInput;
  let numberOfOperators = 0;
  for(let k=0;k<userInputCopy.length;k++)
  {
    if(userInputCopy.charAt(k)=='/'||userInputCopy.charAt(k)=='*'||userInputCopy.charAt(k)=='+'||userInputCopy.charAt(k)=='-')
    {
      numberOfOperators++;
    }
  }
  
  for(let i=0;i<numberOfOperators;i++)
  {
    console.log("i = "+i+" user input = "+userInputCopy);
    
    if(userInputCopy.includes('/'))
    {
      userInputCopy = this.calculateDivideOperator(userInputCopy);
    }
    else if(userInputCopy.includes('*'))
    {
      userInputCopy = this.calculateMultiplyOperator(userInputCopy);
    }
    else{
      userInputCopy = this.calculatAdditionORSubstractionOperator(userInputCopy);
    }
  }  


  return Number(userInputCopy);
}

  
  

calculateDivideOperator(userInputCopy:string):string
{
  console.log("inside / divide operator method");
  console.log("user input = "+userInputCopy);
  
      let oprIndex = userInputCopy.indexOf('/');
      let rightNum=0;
      let rightNumString='';
      let flag=0;
        for(let j=oprIndex+2;j<userInputCopy.length;j++)
        {
          if(userInputCopy.charAt(j)=='/'||userInputCopy.charAt(j)=='*'||userInputCopy.charAt(j)=='+'||userInputCopy.charAt(j)=='-')
          {
            console.log("right num = "+userInputCopy.slice(oprIndex+1,j));
            
             rightNum = Number(userInputCopy.slice(oprIndex+1,j));
             rightNumString=userInputCopy.slice(oprIndex+1,j);
             flag=1;
             break;
          }
        }
        if(flag==0)
        {
          console.log("flag is 0 & right num = "+userInputCopy.slice(oprIndex+1));
          rightNumString=userInputCopy.slice(oprIndex+1);
          rightNum = Number(userInputCopy.slice(oprIndex+1));
        }
      console.log("Divide case : right number = "+rightNum);
      let leftNum=0;
      let leftNumString='';
      flag=0;
        for(let j=oprIndex-2;j>=0;j--)
        {
          if(userInputCopy.charAt(j)=='*'||userInputCopy.charAt(j)=='+'||userInputCopy.charAt(j)=='-')
          {
            console.log("left num = "+userInputCopy.slice(j+1,oprIndex));
            leftNumString=userInputCopy.slice(j+1,oprIndex);
             leftNum = Number(userInputCopy.slice(j+1,oprIndex));
             flag=1;
             break;
          }
        }  
      if(flag==0)
      {
        console.log("flag is 0 & left num = "+userInputCopy.slice(0,oprIndex));
          leftNumString=userInputCopy.slice(0,oprIndex);
        leftNum = Number(userInputCopy.slice(0,oprIndex));
      }
      
      
      let result:string = (leftNum/rightNum).toFixed(2);
      console.log("result = "+result);
      
      let tempStr = leftNumString+'/'+rightNumString;
      console.log("temp str = "+tempStr);
      
      userInputCopy = userInputCopy.replace(tempStr,result);
      console.log("final output userInputCopy = "+userInputCopy);
      
      return userInputCopy;
}

calculateMultiplyOperator(userInputCopy: string): string {

  console.log("inside * calculation method");
  console.log("user input = "+userInputCopy);
  
  
  let oprIndex = userInputCopy.indexOf('*');
  let rightNumString='';
  let rightNum=0;
  let flag=0;
    for(let j=oprIndex+2;j<userInputCopy.length;j++)
    {
      if(userInputCopy.charAt(j)=='/'||userInputCopy.charAt(j)=='*'||userInputCopy.charAt(j)=='+'||userInputCopy.charAt(j)=='-')
      {
        console.log("right num = "+userInputCopy.slice(oprIndex+1,j));
        
         rightNum = Number(userInputCopy.slice(oprIndex+1,j));
         flag=1;
         rightNumString = userInputCopy.slice(oprIndex+1,j);
         break;
      }
    }
    if(flag==0)
    {
      console.log("right num = "+userInputCopy.slice(oprIndex+1));
      rightNumString=userInputCopy.slice(oprIndex+1);
      rightNum = Number(userInputCopy.slice(oprIndex+1));
    }
    

  
  let leftNum=0;
  let leftNumString='';
    for(let j=oprIndex-2;j>=0;j--)
    {
      if(userInputCopy.charAt(j)=='*'||userInputCopy.charAt(j)=='+'||userInputCopy.charAt(j)=='-')
      {
        console.log("left num = "+userInputCopy.slice(j+1,oprIndex));
         leftNum = Number(userInputCopy.slice(j+1,oprIndex));
         flag=1;
         leftNumString=userInputCopy.slice(j+1,oprIndex);
         break;
      }
    }  
  if(flag==0)
  {
    console.log("left num = "+userInputCopy.slice(0,oprIndex));
    leftNumString=userInputCopy.slice(0,oprIndex);
    leftNum = Number(userInputCopy.slice(0,oprIndex));
  }
    
  
  
  let result:string = String(leftNum*rightNum);
   console.log("result = "+result);
     
  let tempStr = leftNumString+'*'+rightNumString;
console.log("temp num = "+tempStr);

  userInputCopy = userInputCopy.replace(tempStr,result);
  console.log("final output userInputCopy = "+userInputCopy);
  
  return userInputCopy;
}

calculatAdditionORSubstractionOperator(userInputCopy: string): string {
 
  console.log("inside = and - calculation method");
  console.log(("user input = "+userInputCopy));
  
  
  let leftNum=0;
  let leftNumString='';
  let rightNum=0;
  let rightNumString='';
  let operator='';
  for(let j=0;j<userInputCopy.length;j++)
    {
      if(userInputCopy.charAt(j)=='+'||userInputCopy.charAt(j)=='-')
      {
        console.log("left num = "+userInputCopy.slice(0,j));
        leftNumString = userInputCopy.slice(0,j);
         leftNum = Number(userInputCopy.slice(0,j));
         rightNum=j;
         operator = userInputCopy.charAt(j);
         break;

      }
    }
    let flag=0;
      for(let j=rightNum+2;j<userInputCopy.length;j++)
      {
        if(userInputCopy.charAt(j)=='+'||userInputCopy.charAt(j)=='-')
        {
          console.log("right num = "+userInputCopy.slice(rightNum+1,j));
          rightNumString = userInputCopy.slice(rightNum+1,j);
           rightNum = Number(userInputCopy.slice(rightNum+1,j));
           flag=1;
           break;
        }
      }
      if(flag==0)
      {
        console.log(" flag==0 & right num = "+userInputCopy.slice(rightNum+1));
        rightNumString = userInputCopy.slice(rightNum+1);
        rightNum = Number(userInputCopy.slice(rightNum+1));
      }
     
    

    let result='';

    if(operator=='+')
    {
      result = String(leftNum+rightNum);
    }
    else{
      result = String(leftNum-rightNum);
    }
    console.log("result = "+result);
    
    let tempStr = leftNumString+operator+rightNumString;
    console.log("temp str = "+tempStr);
    
    userInputCopy = userInputCopy.replace(tempStr,result);
    console.log("final output userInputCopy = "+userInputCopy);
    
    return userInputCopy;   
    
}
}