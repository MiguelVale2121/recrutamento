class Todo {
  todos: Array<{ id: number; content: string }>;
  nextId: number;
  currentId: number;

  constructor() {
    this.todos = new Array();
    this.nextId = 1;
    this.currentId = 1;
  }

  // CRUD operations

  //Add a todo to the array
  addToDo(content:string){
    if (this.currentId == this.nextId) {
      const todo = { id: this.nextId++, content };
      this.currentId = this.nextId;
      this.todos.push(todo);
    }
    else {
      const todo = { id: this.currentId++, content };
      this.currentId = this.nextId;
      this.todos.push(todo);
    }
    
  }

  //Get all todos
  getToDos(){
    this.todos.sort((a, b) => a.id - b.id);
    return this.todos;
  }

  getToDoById(id:number){
    for (const todo of this.todos) {
      if (id == todo.id) {
        return todo;
      }
    }
  }

  //Update a todo
  updateToDo(id:number, content:string){
    const index = this.todos.findIndex((todo) => id == todo.id);
    this.todos[index].content = content;
  }

  //Delete a todo from the array
  deleteToDo(id:number){
    for (const todo of this.todos) {
      if (id == todo.id) {
        this.currentId = todo.id;
        this.todos.splice(this.todos.indexOf(todo), 1);
      }
    }
  }
}

// Todo Service lifecycle management
const todo = global.todo || new Todo();
if (process.env.NODE_ENV !== "production") global.todo = todo;

export { Todo, todo as TodoService };
