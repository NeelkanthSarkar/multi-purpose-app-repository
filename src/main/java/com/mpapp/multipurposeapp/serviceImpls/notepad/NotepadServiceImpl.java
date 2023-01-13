package com.mpapp.multipurposeapp.serviceImpls.notepad;

import com.mpapp.multipurposeapp.dba.notepad.NotepadJPARepository;
import com.mpapp.multipurposeapp.services.notepad.NotepadService;
import com.mpapp.multipurposeapp.utilities.customDataType.NotepadFileType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotepadServiceImpl implements NotepadService {

   @Autowired
    private NotepadJPARepository notepadJPARepository;

    @Override
    public Iterable<NotepadFileType> getAllFiles() {
        System.out.println("getAllFiles() called");
        return notepadJPARepository.findAll();
    }

    @Override
    public NotepadFileType getFileById(int id) {
        return notepadJPARepository.findById(id).get();
    }

    @Override
    public NotepadFileType addNewFile(NotepadFileType n) {
        System.out.println(n);
        System.out.println("addNewFile() called");
        return notepadJPARepository.save(n);
    }

    @Override
    public NotepadFileType updateFileContent(NotepadFileType file) {
      return notepadJPARepository.save(file);
    }

    @Override
    public boolean deleteFile(int id) {
        notepadJPARepository.deleteById(id);
        return notepadJPARepository.existsById(id);

    }

}
