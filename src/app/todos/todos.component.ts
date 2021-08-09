import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todos.models';
import { TodosStore } from './todos.store';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodosStore],
})
export class TodosComponent {
  todos$: Observable<Todo[]>;
  doneTodos$: Observable<Todo[]>;

  constructor(private readonly todosStore: TodosStore) {
    this.todos$ = this.todosStore.todos$;
    this.doneTodos$ = this.todosStore.doneTodos$;
  }

  addTodo(name: string): void {
    this.todosStore.addTodo({
      id: Date.now(),
      name,
      done: false,
    });
  }

  updateTodo(todo: Todo, done = true): void {
    this.todosStore.updateTodo({ ...todo, done });
  }

  removeDoneTodos(): void {
    this.todosStore.removeDoneTodos();
  }
}
