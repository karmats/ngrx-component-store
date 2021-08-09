import { Todo } from '../todos.models';
import { TodosStore } from './todos.store';

describe('TodoStore', () => {
  let store: TodosStore;

  beforeEach(() => {
    store = new TodosStore();
  });

  it('should select todos', () => {
    const todos: Todo[] = [
      {
        done: true,
        id: 1,
        name: 'Done',
      },
      {
        done: false,
        id: 2,
        name: 'Not done',
      },
    ];
    store.setState({
      todos,
    });

    store.allTodos$.subscribe((allTodos) => {
      expect(allTodos).toBe(todos);
    });
    store.todos$.subscribe((notDoneTodos) => {
      expect(notDoneTodos.length).toBe(1);
      expect(notDoneTodos[0]).toBe(todos[1]);
    });
    store.doneTodos$.subscribe((doneTodos) => {
      expect(doneTodos.length).toBe(1);
      expect(doneTodos[0]).toBe(todos[0]);
    });
  });

  it('should add todo', () => {
    const todo = {
      id: 1,
      done: true,
      name: 'Added todo',
    };

    store.addTodo(todo);

    store.allTodos$.subscribe((allTodos) => {
      expect(allTodos.length).toBe(1);
      expect(allTodos[0]).toBe(todo);
    });
  });

  it('should update todo', () => {
    const todo = {
      id: 1,
      done: true,
      name: 'Todo',
    };
    store.setState({ todos: [todo] });

    store.updateTodo({
      id: 1,
      done: false,
      name: 'Updated todo',
    });

    store.allTodos$.subscribe((allTodos) => {
      expect(allTodos.length).toBe(1);
      expect(allTodos[0].name).toBe('Updated todo');
    });
  });

  it('should remove todo', () => {
    const todos = [
      {
        id: 1,
        done: true,
        name: 'Todo',
      },
      {
        id: 2,
        done: true,
        name: 'Todo to remove',
      },
    ];
    store.setState({ todos });

    store.removeTodo(2);

    store.allTodos$.subscribe((allTodos) => {
      expect(allTodos.length).toBe(1);
      expect(allTodos[0]).toBe(todos[0]);
    });
  });

  it('should remove all done todo', () => {
    const todos = [
      {
        id: 1,
        done: false,
        name: 'Todo',
      },
      {
        id: 2,
        done: true,
        name: 'Todo to be removed',
      },
    ];
    store.setState({ todos });

    store.removeDoneTodos();

    store.allTodos$.subscribe((allTodos) => {
      expect(allTodos.length).toBe(1);
      expect(allTodos[0]).toBe(todos[0]);
    });
  });
});
