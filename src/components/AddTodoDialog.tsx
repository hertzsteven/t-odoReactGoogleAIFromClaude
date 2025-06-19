import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { ToDo } from '@/types';

interface AddTodoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTodo: (text: string, tags: string[]) => void;
  editingTodo?: ToDo; // Optional: for editing existing todo
}

const AddTodoDialog: React.FC<AddTodoDialogProps> = ({ isOpen, onClose, onAddTodo, editingTodo }) => {
  const [text, setText] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
      setTags(editingTodo.tags);
    } else {
      setText('');
      setTags([]);
    }
    setCurrentTag(''); // Reset current tag input regardless
  }, [isOpen, editingTodo]);

  const handleAddTag = () => {
    if (currentTag.trim() !== '' && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text, tags);
      onClose(); // Close dialog after adding
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-slate-800 border-slate-700 text-slate-50">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-slate-100">{editingTodo ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              {editingTodo ? 'Update the details of your task.' : 'Enter the details for your new task below.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-text" className="text-right text-slate-300">
                Task
              </Label>
              <Input
                id="task-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="col-span-3 bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:ring-purple-500"
                placeholder="e.g., Finish project report"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-tags" className="text-right text-slate-300">
                Tags
              </Label>
              <div className="col-span-3">
                <div className="flex gap-2">
                    <Input
                        id="task-tags"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ',') {
                                e.preventDefault();
                                handleAddTag();
                            }
                        }}
                        className="flex-grow bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:ring-purple-500"
                        placeholder="Add a tag (e.g., work)"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={handleAddTag} className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                        Add
                    </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-purple-600 text-white hover:bg-purple-700">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="ml-1 h-4 w-4 rounded-full hover:bg-purple-800"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                 {tags.length === 0 && <p className="text-xs text-slate-500 mt-1">No tags added yet. Type a tag and press Enter or click "Add".</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="text-slate-300 border-slate-600 hover:bg-slate-700">
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
              {editingTodo ? 'Save Changes' : 'Add Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;
