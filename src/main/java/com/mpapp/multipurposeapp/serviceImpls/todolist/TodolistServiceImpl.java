package com.mpapp.multipurposeapp.serviceImpls.todolist;

import com.mpapp.multipurposeapp.dba.todolist.TodolistCrudRepository;
import com.mpapp.multipurposeapp.services.todolist.TodolistSerice;
import com.mpapp.multipurposeapp.utilities.customDataType.TodolistType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodolistServiceImpl implements TodolistSerice {

    @Autowired
    private TodolistCrudRepository todolistCrudRepository;
    @Override
    public Iterable<TodolistType> getAllTasks() {
        return todolistCrudRepository.findAll();
    }

    @Override
    public TodolistType getTaskById(int id) {
        return todolistCrudRepository.findById(id).get();
    }

    @Override
    public TodolistType addOneNewTask(TodolistType task) {
        return todolistCrudRepository.save(task);
    }

    @Override
    public TodolistType updateExistingTask(TodolistType task) {
        return todolistCrudRepository.save(task);
    }

    @Override
    public boolean deleteTaskById(int id) {
         todolistCrudRepository.deleteById(id);
        return todolistCrudRepository.existsById(id);
    }
}
