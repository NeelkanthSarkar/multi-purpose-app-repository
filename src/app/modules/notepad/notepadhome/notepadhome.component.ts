import { identifierName, ThisReceiver } from '@angular/compiler';
import { AfterViewChecked, Component, OnInit, PLATFORM_INITIALIZER } from '@angular/core';
import * as $ from 'jquery';
import { NotepadserviceService } from 'src/app/services/notepadservice.service';
import { saveAs} from 'file-saver';
import { NotepadFileType } from 'src/app/services/NotepadFileType';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notepadhome',
  templateUrl: './notepadhome.component.html',
  styleUrls: ['./notepadhome.component.css']
})
export class NotepadhomeComponent implements OnInit,AfterViewChecked{


  listOfFiles:NotepadFileType[]=[];
  
  fileId:number=-1;
  prevActiveId:number=-1;
  saveMenuClicked:number=-1;
  currentFileSelectedId:string='';
  prevFileSelectedId:string='';
  cutSelectedTextAera:number=-1;
  pasteClipboardText:number=-1;
  copySelectedTextFlag:number=-1;
  selectAllFlag:number=-1;
  theLetter:string='';
  findprev:number=-1;
  findnext:number=-1;
  findAndReplaceResultCount:number=0;
  replacableString:string='';
  replaceAllString:string='';

  constructor(private notepadservive:NotepadserviceService,private route:Router){}
  ngOnInit(): void {

    this.notepadservive.getListOfFiles().subscribe(result=>{
     this.listOfFiles = result as NotepadFileType[];
    });
   

    $('#fileMenuButton').on('click',function(){
      if($('#filemenulistgroup').css('display')=='none'){
        $('#editmenulistgroup').css('display','none'); 
        $('#filemenulistgroup').css('display','flex');
      }
      else
      {
        $('#filemenulistgroup').css('display','none');
      }
    });
  
    $('#editMenuButton').on('click',function(){
      if($('#editmenulistgroup').css('display')=='none'){
        $('#filemenulistgroup').css('display','none');
        $('#editmenulistgroup').css('display','flex');
      }
      else
      {
        $('#editmenulistgroup').css('display','none');
      }
    });
    
}
ngAfterViewChecked(): void {
  $('#fileNum'+this.fileId).addClass('active');
  $('#fileNum'+this.prevActiveId).removeClass('active');
}

fileNameClicked(event:any)
{ 
  
  this.prevActiveId = this.fileId;
  this.fileId = Number(String(event.target.id).charAt(event.target.id.length-1));
  
  
  $('#'+event.target.id).addClass('active');
  if(this.prevActiveId!=-1)
  $('#fileNum'+this.prevActiveId).removeClass('active');
}
getRandomNumber(){
  let num=0;
  while(num<100){
   num = Math.floor(Math.random()*1000);
  }
  return num;
}
 createNewFile()
{
  let len = this.listOfFiles.length;
  
  let file:NotepadFileType = {id:this.getRandomNumber(),name:'example.txt',content:''};
  
   this.notepadservive.addNewFileIntoFileList(file).subscribe(res=>{
    if(res==null||res==undefined){
      alert("something went wrong.. unable to add new file.");
    }
    else{
       this.notepadservive.getListOfFiles().subscribe(res=>{
         this.listOfFiles = res as NotepadFileType[];
         console.log(this.listOfFiles);
      });
      this.prevActiveId = this.fileId;
      this.fileId = this.listOfFiles.length-1;  
    } 
  });
  
  $('#filemenulistgroup').css('display','none');  
}
displayOpenFromDatabaseBox(){
 
 $('#filemenulistgroup').css('display','none');
 $('#open-file-from-db-box').css('display','flex');
}

saveFileInTheDatabase(){
  if(this.fileId!=-1)
 {
   this.saveMenuClicked = this.saveMenuClicked==0?1:0;
   $('#filemenulistgroup').css('display','none');
   
 }
}
//data sent from child component to be saved
setCurrentDataTextarea(textareadata:any){
    
    let file:NotepadFileType = this.listOfFiles[this.fileId];
    file.content=textareadata;

      this.notepadservive.updateDataInFile(file).subscribe(res=>{
         if(res==null||res==undefined){
          alert("something went wrong..cannot update");          
         }
         else{
            $('#tablet-message-box').css('display','flex');
            setTimeout(() => {
              $('#tablet-message-box').fadeOut('slow');
            }, 2000);
         }
      });      
     
}
 //changes the bg color of the selected file    
openFileListItemClicked(tem:any){
  this.prevFileSelectedId = this.currentFileSelectedId;
  this.currentFileSelectedId = tem.target.id;
  
  $('#'+this.currentFileSelectedId).css({
    'background-color':'lightgray',
    'font-weight':'500'
  })
  if(this.prevFileSelectedId!='')
  {
    $('#'+this.prevFileSelectedId).css({
      'background-color':'white',
      'font-weight':'normal'
    })
  }
  
  
}
cancelOpenFileFromDB(){
  $('#'+this.currentFileSelectedId).css({
    'background-color':'white',
    'font-weight':'normal'
  })
  this.prevFileSelectedId='';
  this.currentFileSelectedId='';
  $('#open-file-from-db-box').css('display','none');

}
openFileSelectedFromDB(){
  
  if(this.currentFileSelectedId!=''){
    let id = this.currentFileSelectedId.slice(10);
    $('#open-file-from-db-box').css('display','none');
    $('#'+this.currentFileSelectedId).css({
      'background-color':'white',
      'font-weight':'normal'
    });
    this.prevActiveId = this.fileId;
    this.fileId = Number(id);
  }
  else{
    alert("No file selected. Please select a file to proceed");
  }
  
  
}
displaySaveAsBox(){
  if(this.fileId!=-1)
  {
    $('#filemenulistgroup').css('display','none');
    $('#saveasfilename').val(this.listOfFiles[this.fileId].name);       
    $('#saveas-renamefile-box').css('display','flex');
  }
  else
  {
    $('#filemenulistgroup').css('display','none');
    alert("Please select a file first.");
  }
}
cancelSaveAsFunctionality(){
  $('#saveas-renamefile-box').css('display','none');
}
submitSaveAsFileInDB(filename:string,ext:string){
  $('#saveas-renamefile-box').css('display','none');
  
    let ind=-1;
    for(let i=filename.length-3;i>0;i--){
      if(filename.charAt(i)=='.'){
        ind=i;
        break;
      }
    }
    if(ind!=-1){
      let substr = filename.replace(filename.slice(ind),'');
      substr = substr+'.'+ext;
      this.resetFileName(substr);
    }
    else{
      filename = filename+'.'+ext;
      this.resetFileName(filename);
    }
  
}
resetFileName(filename:string){
  let file:NotepadFileType = this.listOfFiles[this.fileId];
      file.name = filename;
      this.notepadservive.updateFileNameAndExtension(file).subscribe(res=>{
        if(res==null||res==undefined){
          alert("Something went wrong..operation save as unsuccessful");
        }       
      });
}
displayRenameFileBox(){
  $('#filemenulistgroup').css('display','none');
  if(this.fileId!=-1)
  {    
    $('#rename-current-file-box').css('display','flex');
    let fname = this.listOfFiles[this.fileId].name;
    let f = this.getFileExtensionIndex();
    if(f!=-1){
      let subs = fname.replace(fname.slice(f),'');
      $('#rename-file-input').val(subs);
    }
    else{
      $('#rename-file-input').val(fname);
    }
    
  } 
  else{
    alert("Please select a file first.")
  }
}
hideRenameFileBox(){
  $('#rename-current-file-box').css('display','none');
}
renameFile(name:string){
  if(name.trim()!=this.listOfFiles[this.fileId].name){
    if(name.trim()==''){
      alert("File name cannot be empty")
    }
    else{
      let i = this.getFileExtensionIndex();
      let ext = this.listOfFiles[this.fileId].name.slice(i);
      name = name+ext;
      let file:NotepadFileType = this.listOfFiles[this.fileId];
      file.name = name; 
      this.notepadservive.updateFileNameAndExtension(file).subscribe(res=>{
        if(res==null||res==undefined){
          alert("Something went wrong.. rename file unsuccessful");
        }        
      });
    }
  }    
    $('#rename-current-file-box').css('display','none');
}

 getFileExtensionIndex():number{
  let fname = this.listOfFiles[this.fileId].name;
    let f=-1;
    for(let i=fname.length-3;i>=0;i--){
      if(fname.charAt(i)=='.')
      {
        f=i;
        break;
      }
    }
  return f;
}
deleteFileFromDB(){
  if(this.fileId!=-1){
    $('#filemenulistgroup').css('display','none'); 
    if(confirm("Are you sure to delete "+this.listOfFiles[this.fileId].name+" ?")){
      this.notepadservive.deleteAFileById(this.listOfFiles[this.fileId].id).subscribe(res=>{
        if(res==null||res==undefined){
          alert("Something went wrong.. deleting operation unsuccessful.");
        }
        else{
          $('#tablet-message-box').css('display','flex');
          $('#tablet-message-box .h5').html("Successfully Deleted !");
          this.fileId = this.listOfFiles.length-1;
          setTimeout(() => {
          $('#tablet-message-box').fadeOut('slow');
          }, 1000);
        }
      });
      
    }
  }
  else{
    alert("Please select a file first !");
  }
 
}
exitFromApplication() {
  $('#filemenulistgroup').css('display','none');
  if(confirm("Are you sure to exit Notepad ?")) 
    this.route.navigate(['/']);
  }

  //----------------------EDIT MENU ------------------------------------------------------------------
  cutSelectedText()
  {
    $('#editmenulistgroup').css('display','none');
    this.cutSelectedTextAera = this.cutSelectedTextAera==1?0:1; 
  }
  pasteDataFromClipboard(){
    $('#editmenulistgroup').css('display','none');
    this.pasteClipboardText = this.pasteClipboardText==1?0:1; 
  }
  copySelectedText(){
    $('#editmenulistgroup').css('display','none');
    this.copySelectedTextFlag = this.copySelectedTextFlag==1?0:1; 
  }
  selectAllText(){
    $('#editmenulistgroup').css('display','none');
    this.selectAllFlag = this.selectAllFlag==1?0:1; 
  }
  displayFindAndReplaceBox(){
    $('#editmenulistgroup').css('display','none');
    $('#find-replace-box').css('display','flex');
    
  }
  closeFindAndReplaceBox(){
    $('#find-replace-box').css('display','none');
  }
  findTheLetter(letter:string){
    this.theLetter = letter;
  }
  findPrevious(){
    this.findprev = this.findprev==1?0:1;
  }
  findNext(){
   this.findnext = this.findnext==1?0:1;
  }
  findReplaceCurrentResult(num:number){
    
    this.findAndReplaceResultCount = num;
  }
  replaceTextFromTextarea(replaceStr:string){
    
    if(replaceStr!=''){
      this.replacableString = replaceStr;
    }        
  }
replaceAllText(repStr:string){
  if(repStr!=''){
    this.replaceAllString = repStr;
  }
}
downloadFileInLocalDisk(){
  $('#filemenulistgroup').css('display','none'); 
  let blob = new Blob([this.listOfFiles[this.fileId].content]);
  saveAs(blob,this.listOfFiles[this.fileId].name);
}
}
