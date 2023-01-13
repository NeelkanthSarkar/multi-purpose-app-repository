package com.mpapp.multipurposeapp.controllers.notepad;


import com.mpapp.multipurposeapp.services.notepad.NotepadService;
import com.mpapp.multipurposeapp.utilities.customDataType.NotepadFileType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



/*
--------------------API description ------------------------
  METHOD           URL                  DESCRIPTION
  -----------------------------------------------
  GET             /files                returns all the files
  GET             /file/id              returns one file by ID
  POST            /add                  adds a new file in database
  PUT             /update               update data inside a file by ID
  DELETE          /delete/id            delete file by ID
 */

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class NotepadController {

   @Autowired
   private NotepadService notepadService;

   @GetMapping("/files")
   public Iterable<NotepadFileType> getAllFiles(){
     return notepadService.getAllFiles();
   }

   @GetMapping("/file/{fileId}")
   public NotepadFileType getOneFile(@PathVariable String fileId){
     return notepadService.getFileById(Integer.parseInt(fileId));
   }

   @PostMapping("/add")
   public NotepadFileType addNewFile(@RequestBody NotepadFileType file){
       System.out.println("add method called in controller");
       System.out.println(file);
       return notepadService.addNewFile(file);
   }

   @PutMapping("/update")
   public NotepadFileType updateFileData(@RequestBody NotepadFileType file){
       return notepadService.updateFileContent(file);
   }

   @DeleteMapping("/delete/{fileId}")
   public boolean deleteFileById(@PathVariable String fileId) {
        return notepadService.deleteFile(Integer.parseInt(fileId));
   }



}
