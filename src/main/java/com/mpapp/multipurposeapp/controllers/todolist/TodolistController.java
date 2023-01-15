package com.mpapp.multipurposeapp.controllers.todolist;

import com.mpapp.multipurposeapp.services.todolist.TodolistSerice;
import com.mpapp.multipurposeapp.utilities.customDataType.TodolistType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



/*
   ------------------------------------------------------------------
   Method                   URL                    Description
   ------------------------------------------------------------------
   GET                     /list                   get the list of tasks
   GET                     /list/id                get item by ID
   POST                    /add                    add a new task
   PUT                     /update                 update a item
   DELETE                  /delete/id              delete item by ID
   */


@RestController
@RequestMapping("/todolist")
@CrossOrigin(origins = "http://localhost:4200")
public class TodolistController {

    @Autowired
    private TodolistSerice todolistSerice;

    @GetMapping("/list")
    public Iterable<TodolistType> getAllTasks(){
      return todolistSerice.getAllTasks();
    }

    @GetMapping("/list/{id}")
    public TodolistType getOneItem(@PathVariable String id){
        return todolistSerice.getTaskById(Integer.parseInt(id));
    }
    @PostMapping("/add")
    public TodolistType addNewTask(@RequestBody TodolistType todolistType){
        return todolistSerice.addOneNewTask(todolistType);
    }
    @PutMapping("/update")
    public TodolistType updateExistingTask(@RequestBody TodolistType todolistType){
        return todolistSerice.updateExistingTask(todolistType);
    }
    @DeleteMapping("/delete/{id}")
    public boolean deleteExistingTask(@PathVariable String id){
        return todolistSerice.deleteTaskById(Integer.parseInt(id));
    }

}
