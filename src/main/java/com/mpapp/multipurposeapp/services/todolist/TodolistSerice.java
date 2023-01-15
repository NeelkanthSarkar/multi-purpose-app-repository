package com.mpapp.multipurposeapp.services.todolist;

import com.mpapp.multipurposeapp.utilities.customDataType.TodolistType;

public interface TodolistSerice {

    Iterable<TodolistType> getAllTasks();
    TodolistType getTaskById(int id);
    TodolistType addOneNewTask(TodolistType task);
    TodolistType updateExistingTask(TodolistType task);
    boolean deleteTaskById(int id);


}
