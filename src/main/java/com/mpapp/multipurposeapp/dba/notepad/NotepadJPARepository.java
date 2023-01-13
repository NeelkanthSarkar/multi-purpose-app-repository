package com.mpapp.multipurposeapp.dba.notepad;

import com.mpapp.multipurposeapp.utilities.customDataType.NotepadFileType;
import org.springframework.data.repository.CrudRepository;

public interface NotepadJPARepository extends CrudRepository<NotepadFileType,Integer> {
}
