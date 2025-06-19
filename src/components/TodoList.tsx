import TodoItem from './TodoItem';
import { ToDo } from '@/types';

interface TodoListProps {
  todos: ToDo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string, newTags: string[]) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete, onEdit }) => {
  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
