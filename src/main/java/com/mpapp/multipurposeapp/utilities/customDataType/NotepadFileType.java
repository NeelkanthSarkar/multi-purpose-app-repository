package com.mpapp.multipurposeapp.utilities.customDataType;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class NotepadFileType {
    @Id
    private int id;
    private String name;
    private String content;

    public NotepadFileType() {
    }

    public NotepadFileType(int id, String name, String content) {
        this.id = id;
        this.name = name;
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "NotepadFileType{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
