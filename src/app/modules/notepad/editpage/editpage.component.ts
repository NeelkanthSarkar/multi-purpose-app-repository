import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';
import { NotepadserviceService } from 'src/app/services/notepadservice.service';

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent implements OnChanges{
  
  @Input() fileId:number=-1;
  @Input() saveMenuClicked:number=-1;
  @Output() setCurrentDataTextarea = new EventEmitter<string>();
  @Input() cutSelectedTextAera:number=-1;
  @Input() pasteClipboardText:number=-1;
  @Input() copySelectedTextFlag:number=-1;
  @Input() selectAllFlag:number=-1;
  @Input() theLetter:string='';
  @Input() findprev:number=-1;
  @Input() findnext:number=-1;
  @Output() findReplaceCurrentResult = new EventEmitter<number>();
  @Input() replacableString:string='';
  @Input() replaceAllString:string='';

  myData:string='';
  selectedTextFromTextarea:string|undefined;
  startIndices:number[]=[];
  currentFindReplaceIndex:number=-1;

  constructor(private notepadservice:NotepadserviceService){}


  ngOnChanges(changes: SimpleChanges): void {
  
   if(changes['fileId']!=undefined)
   {
    if(changes['fileId'].currentValue!=-1)
    {
      this.myData = this.notepadservice.getUnsavedFileByIndex(changes['fileId'].currentValue).content;
      $('textarea').css('display','flex'); 
      $('textarea').val(this.myData);
      $('textarea').trigger('focus');
    }
    else
    {
      $('textarea').css('display','none');
    }
   }
   if(changes['saveMenuClicked']!=undefined)
   {
    if(changes['saveMenuClicked'].currentValue!=-1)
    {
      let data = String($('textarea').val());
       this.setCurrentDataTextarea.emit(data);
    }
   }
   if(changes['cutSelectedTextAera']!=undefined){
     if(changes['cutSelectedTextAera'].currentValue!=-1){
         
       
        this.selectedTextFromTextarea = document.getSelection()?.toString();  
        document.getSelection()?.deleteFromDocument();
        
        
     }
   }
   if(changes['pasteClipboardText']!=undefined){
    if(changes['pasteClipboardText'].currentValue!=-1){
      let pos = $('textarea').prop('selectionStart');
   
      let allString:string = String($('textarea').val());
      let leftString = allString.slice(0,pos);
      let rightString = allString.slice(pos);
      let finalString = leftString+this.selectedTextFromTextarea+rightString;
      $('textarea').val(finalString);
    }
   }
   if(changes['copySelectedTextFlag']!=undefined){
     if(changes['copySelectedTextFlag'].currentValue!=-1)
     {
       this.selectedTextFromTextarea = document.getSelection()?.toString(); 
     }
   }
   if(changes['selectAllFlag']!=undefined){
    if(changes['selectAllFlag'].currentValue!=-1){
      $('textarea').trigger('focus');
      $('textarea').trigger('select');
    }
   }
   if(changes['theLetter']!=undefined){
    if(changes['theLetter'].currentValue!=''){
      
      let tarea = String($('textarea').val());
      this.startIndices=[];
       
      for(let i=0;i<tarea.length;i++){
        let temp = tarea.slice(i,i+this.theLetter.length);
      
        if(temp.length==this.theLetter.length&&this.theLetter.includes(temp)){
         
          this.startIndices.push(i);
        }
      } 
 
      this.currentFindReplaceIndex = 0;
      this.setFocusOnSelectedTextArea(this.currentFindReplaceIndex);
      this.findReplaceCurrentResult.emit(this.startIndices.length);
    }
   }
   if(changes['findprev']!=undefined){
    if(changes['findprev'].currentValue!=-1){
     
        if(this.currentFindReplaceIndex!=0){
          this.currentFindReplaceIndex--;
          this.setFocusOnSelectedTextArea(this.currentFindReplaceIndex);
        } 
        else{
          this.setFocusOnSelectedTextArea(this.currentFindReplaceIndex);
        }             
    }
   }
   if(changes['findnext']!=undefined){
    if(changes['findnext'].currentValue!=-1){
     
        if(this.currentFindReplaceIndex!=this.startIndices.length-1){
          this.currentFindReplaceIndex++;
          this.setFocusOnSelectedTextArea(this.currentFindReplaceIndex);
        }  
        else{
          this.setFocusOnSelectedTextArea(this.currentFindReplaceIndex);
        }      
      }    
   }
   if(changes['replacableString']!=undefined){
    if(changes['replacableString'].currentValue!=''){
     
      let allText = String($('textarea').val());
      if(this.startIndices.length!=0&&this.currentFindReplaceIndex!=-1&&this.theLetter!=''){        
        let resultText = changes['replacableString'].currentValue;
        let leftside = allText.slice(0,this.startIndices[this.currentFindReplaceIndex]);
        let rightside = allText.slice(this.startIndices[this.currentFindReplaceIndex]);
        rightside = rightside.replace(this.theLetter,resultText);
        let finalText = leftside+rightside;        
        $('textarea').val(finalText);
      }
    }
   }
   if(changes['replaceAllString']!=undefined){
    if(changes['replaceAllString'].currentValue!=''){
      let allText = String($('textarea').val());
      if(this.startIndices.length!=0&&this.theLetter!=''){
        allText = allText.replaceAll(this.theLetter,changes['replaceAllString'].currentValue);
        $('textarea').val(allText);
      }
    }
   }
  }
  textareaKeyup(val:string){
    this.notepadservice.saveDataInUnsavedFilelist(this.fileId,val);
  }
  setFocusOnSelectedTextArea(index:number){
    $('textarea').trigger('focus').prop({"selectionStart":this.startIndices[index],"selectionEnd":this.startIndices[index]+this.theLetter.length}); 
  }
  
}

