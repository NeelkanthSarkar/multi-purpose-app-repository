package com.mpapp.multipurposeapp.services.notepad;


import com.mpapp.multipurposeapp.utilities.customDataType.NotepadFileType;

public interface NotepadService {

     Iterable<NotepadFileType> getAllFiles();

     NotepadFileType getFileById(int id);
     NotepadFileType addNewFile(NotepadFileType n);
     NotepadFileType updateFileContent(NotepadFileType file);

     boolean deleteFile(int id);
}
