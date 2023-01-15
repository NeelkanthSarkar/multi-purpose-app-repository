package com.mpapp.multipurposeapp.dba.todolist;

import com.mpapp.multipurposeapp.utilities.customDataType.TodolistType;
import org.springframework.data.repository.CrudRepository;

public interface TodolistCrudRepository extends CrudRepository<TodolistType,Integer> {
}
