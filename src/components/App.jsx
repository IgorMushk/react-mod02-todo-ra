import React, { Component } from 'react'
import initialTodos from './todos.json';
import TodoList from './TodoList';

export class App extends Component {
  state = {
    todos : initialTodos,
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };


  render() {
    const {todos} = this.state;

    const totalTodoCount = todos.length;

    // const completedTodo = todos.filter(todo => todo.completed);
    // const completedTodoCount = completedTodo.length;
    
    const completedTodoCount = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );

    return (
      <>
      <h1>Состояние компонента</h1>
     
      <div>
        <p>Общее кол-во: {totalTodoCount}</p>
        <p>Кол-во выполненных: {completedTodoCount}</p>
      </div>

      <TodoList todos={todos} onDeleteTodo={this.deleteTodo} />
    </>
    )
  } 
}

//export default App

// [
//   { "id": "id-1", "text": "Выучить основы React", "completed": true },
//   { "id": "id-2", "text": "Разобраться с React Router", "completed": false },
//   { "id": "id-3", "text": "Пережить Redux", "completed": false }
// ]
