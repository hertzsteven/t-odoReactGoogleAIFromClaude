import { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle, Tags } from 'lucide-react';

import { Button } from '@/components/ui/button';
import AddTodoDialog from '@/components/AddTodoDialog';
import TodoList from '@/components/TodoList';
import FilterControls from '@/components/FilterControls';
import { ToDo, FilterStatus } from '@/types';

function App() {
  const [todos, setTodos] = useState<ToDo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (text: string, tags: string[]) => {
    if (text.trim() === '') return;
    const newTodo: ToDo = {
      id: uuidv4(),
      text,
      completed: false,
      tags: tags.map(tag => tag.trim()).filter(tag => tag !== ''),
      createdAt: Date.now(),
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const handleToggleComplete = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id: string, newText: string, newTags: string[]) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText, tags: newTags.map(tag => tag.trim()).filter(tag => tag !== '') } : todo
      )
    );
  };
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    todos.forEach(todo => todo.tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet).sort();
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (filterStatus === 'active') return !todo.completed;
        if (filterStatus === 'completed') return todo.completed;
        return true;
      })
      .filter(todo => {
        if (selectedTags.length === 0) return true;
        return selectedTags.every(selTag => todo.tags.includes(selTag));
      })
      .filter(todo => {
        if (searchTerm.trim() === '') return true;
        return todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
               todo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      })
      .sort((a,b) => b.createdAt - a.createdAt); // Newest first
  }, [todos, filterStatus, selectedTags, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-50 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Interactive To-Do Dashboard
          </h1>
          <p className="text-slate-400 mt-2">Organize your tasks efficiently.</p>
        </header>

        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-slate-200">Manage Your Tasks</h2>
            <Button onClick={() => setIsDialogOpen(true)} variant="secondary" className="bg-purple-600 hover:bg-purple-700 text-white">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Task
            </Button>
          </div>
          <AddTodoDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onAddTodo={handleAddTodo}
          />

          <FilterControls
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            allTags={allTags}
            selectedTags={selectedTags}
            onTagChange={setSelectedTags}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {filteredTodos.length > 0 ? (
            <TodoList
              todos={filteredTodos}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          ) : (
            <div className="text-center py-10 text-slate-400">
              <Tags className="mx-auto h-12 w-12 mb-4 text-slate-500" />
              <p className="text-lg">No tasks match your current filters.</p>
              <p>Try adjusting your search or adding new tasks!</p>
            </div>
          )}
           <p className="text-sm text-slate-500 mt-6 text-center">
            Showing {filteredTodos.length} of {todos.length} total tasks.
          </p>
        </div>
         <footer className="text-center text-slate-500 text-sm mt-8">
            Built with React, TailwindCSS, and shadcn/ui.
        </footer>
      </div>
    </div>
  );
}

export default App;
