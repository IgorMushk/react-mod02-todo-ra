import React, { Component } from 'react';
import shortid from 'shortid';
import initialTodos from './todos.json';
import TodoList from './TodoList';
import Container from './Container/Container';
import TodoEditor from './TodoEditor';
import Filter from './Filter';

export class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
  };

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    // this.setState(prevState  => ({
    //   todos: [todo, ...prevState.todos],
    // }));
    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
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
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };


  render() {
    //const { todos } = this.state;
    const { todos, filter } = this.state;

    const totalTodoCount = todos.length;
    // // const completedTodo = todos.filter(todo => todo.completed);
    // // const completedTodoCount = completedTodo.length;
    // const completedTodoCount = todos.reduce(
    //   (total, todo) => (todo.completed ? total + 1 : total),
    //   0
    // );
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();


    return (
      <Container>
        {/* TODO: вынести в отдельный компонент */}

        <div>
          <p>Общее кол-во: {totalTodoCount}</p>
          <p>Кол-во выполненных: {completedTodoCount}</p>
        </div>

        <TodoEditor onSubmit={this.addTodo} />

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          // todos={todos}
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
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
