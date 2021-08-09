import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Todo } from '../todos.models';

export interface TodosState {
  todos: Todo[];
}

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  constructor() {
    super({
      todos: [],
    });
  }

  readonly allTodos$: Observable<Todo[]> = this.select((state) => state.todos);

  readonly todos$: Observable<Todo[]> = this.select(this.allTodos$, (todos) =>
    todos.filter((todo) => !todo.done)
  );
  readonly doneTodos$: Observable<Todo[]> = this.select(
    this.allTodos$,
    (todos) => todos.filter((todo) => todo.done)
  );

  readonly addTodo = this.updater((state, todo: Todo) => ({
    todos: [...state.todos, todo],
  }));

  readonly updateTodo = this.updater((state, todo: Todo) => ({
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
  }));

  readonly removeTodo = this.updater((state, id: number) => ({
    todos: state.todos.filter((t) => t.id !== id),
  }));

  readonly removeDoneTodos = this.updater((state) => ({
    todos: state.todos.filter((t) => !t.done),
  }));
}
