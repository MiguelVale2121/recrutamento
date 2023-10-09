import { createHandler, Delete, Get, Param, Post, Put, Req } from "next-api-decorators";
import type { NextApiRequest } from "next";
import { Todo as TodoService } from "/home/miguel-kali/recrutamento/lib/backend/services/todo";


const todoService = new TodoService(); 

class ToDoHandler {
  
  @Get()
  getToDos() {
    return todoService.getToDos();
  }

  @Get("/:id")
  getToDoById(@Param("id") id: number) {
    return todoService.getToDoById(id);
  }

  @Post()
  addToDo(@Req() req: NextApiRequest) {
    const { content } = req.body;
    todoService.addToDo(content);
    return {
        message: `The ToDo ${content} was added successfully!`
    }
  }

  @Delete("/:id")
  deleteToDo( @Param("id") id: number) {
    if (todoService.getToDoById(id)) {
      todoService.deleteToDo(id);
      return {
          message: `The ToDo with id ${id} was deleted successfully!`
      }
    }
    else {
      return {
          message: `The ToDo with id ${id} was not found!`
      }
    }
  }

  @Put("/:id")
  updateToDo( @Param("id") id: number, @Req() req: NextApiRequest) {
    const { content } = req.body;
    if (todoService.getToDoById(id)) {
      todoService.updateToDo(id, content);
      return {
          message: `The ToDo with id ${id} was updated to ${content} successfully!`
      }
    }
    else {
      return {
          message: `The ToDo with id ${id} was not found!`
      }
    }

  }


}

export default createHandler(ToDoHandler);
