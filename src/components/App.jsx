import React, { Component } from 'react'
//import shortid from 'shortid';
import initialTodos from './todos.json';
import TodoList from './TodoList';
import Container from './Container/Container';

export class App extends Component {
  state = {
    todos : initialTodos,
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }

    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
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
      <Container>
       {/* TODO: вынести в отдельный компонент */}
     
      <div>
        <p>Общее кол-во: {totalTodoCount}</p>
        <p>Кол-во выполненных: {completedTodoCount}</p>
      </div>

      <TodoList todos={todos} onDeleteTodo={this.deleteTodo} onToggleCompleted={this.toggleCompleted} />
     </Container>
    )
  } 
}

//export default App

// [
//   { "id": "id-1", "text": "Выучить основы React", "completed": true },
//   { "id": "id-2", "text": "Разобраться с React Router", "completed": false },
//   { "id": "id-3", "text": "Пережить Redux", "completed": false }
// ]

//npm i shortid
//npm install sass
//npm i classnames