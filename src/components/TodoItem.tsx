import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit3, Save, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ToDo } from '@/types';

interface TodoItemProps {
  todo: ToDo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string, newTags: string[]) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editTags, setEditTags] = useState(todo.tags.join(', ')); // Store as comma-separated string for input

  const handleEdit = () => {
    setEditText(todo.text);
    setEditTags(todo.tags.join(', '));
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim() === '') return; // Prevent saving empty text
    const newTagsArray = editTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    onEdit(todo.id, editText, newTagsArray);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset state to original todo values, no need to call onEdit
    setEditText(todo.text);
    setEditTags(todo.tags.join(', '));
  };

  return (
    <Card className={`transition-all duration-300 ease-in-out ${todo.completed ? 'bg-slate-700/60 border-slate-600 opacity-70' : 'bg-slate-700/80 border-slate-600 hover:border-purple-500/70'} shadow-lg`}>
      <CardContent className="p-4 flex items-start gap-4">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={() => onToggleComplete(todo.id)}
          className="mt-1 border-slate-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-600"
          aria-label={todo.completed ? `Mark ${todo.text} as active` : `Mark ${todo.text} as completed`}
        />
        {isEditing ? (
          <div className="flex-grow space-y-2">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="bg-slate-600 border-slate-500 text-slate-100 focus:ring-purple-500"
              aria-label="Edit task text"
            />
            <Input
              value={editTags}
              onChange={(e) => setEditTags(e.target.value)}
              placeholder="Tags (comma-separated)"
              className="bg-slate-600 border-slate-500 text-slate-100 focus:ring-purple-500 text-sm"
              aria-label="Edit task tags"
            />
          </div>
        ) : (
          <div className="flex-grow">
            <label
              htmlFor={`todo-${todo.id}`}
              className={`font-medium cursor-pointer ${todo.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}
            >
              {todo.text}
            </label>
            {todo.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {todo.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-purple-600/80 text-purple-100 text-xs px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 bg-slate-700/50 border-t border-slate-600/70 flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button onClick={handleSave} size="sm" variant="success" className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="mr-1 h-4 w-4" /> Save
            </Button>
            <Button onClick={handleCancelEdit} size="sm" variant="ghost" className="text-slate-400 hover:bg-slate-600 hover:text-slate-200">
              <XCircle className="mr-1 h-4 w-4" /> Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleEdit} size="sm" variant="outline" className="text-slate-300 border-slate-500 hover:bg-slate-600 hover:text-purple-400 hover:border-purple-500">
              <Edit3 className="mr-1 h-4 w-4" /> Edit
            </Button>
            <Button onClick={() => onDelete(todo.id)} size="sm" variant="destructive" className="bg-red-600/90 hover:bg-red-700 text-white">
              <Trash2 className="mr-1 h-4 w-4" /> Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default TodoItem;
