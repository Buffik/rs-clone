import { TodosPlacement } from '../../types/types';

const handleTodosArea = (todosPlacement: TodosPlacement[]) => {
  let currentArray = 0;
  const result: TodosPlacement[][] = [];
  todosPlacement.forEach((todo, index) => {
    const nextTodo = todosPlacement[index + 1];
    if (nextTodo && index > 0) {
      if (todo.column <= nextTodo.column) {
        result[currentArray].push(todo);
      } else {
        result.push([todo]);
        currentArray += 1;
      }
    } else {
      result.push([todo]);
    }
  });
  console.log(result);
  return result;
};

export default handleTodosArea;
