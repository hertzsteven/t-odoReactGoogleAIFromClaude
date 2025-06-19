import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Filter, Search, Tag, Check, X } from 'lucide-react';
import { FilterStatus } from '@/types';
import { useState } from 'react';

interface FilterControlsProps {
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
  allTags: string[];
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filterStatus,
  onFilterChange,
  allTags,
  selectedTags,
  onTagChange,
  searchTerm,
  onSearchChange,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleTagSelect = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagChange(newSelectedTags);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          type="text"
          placeholder="Search tasks or tags..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-slate-600 border-slate-500 text-slate-100 placeholder-slate-400 focus:ring-purple-500"
        />
      </div>
      {/* Status Filter */}
      <div>
        <Select value={filterStatus} onValueChange={(value) => onFilterChange(value as FilterStatus)}>
          <SelectTrigger className="w-full bg-slate-600 border-slate-500 text-slate-100 focus:ring-purple-500">
            <Filter className="mr-2 h-4 w-4 text-slate-400" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600 text-slate-100">
            <SelectItem value="all" className="focus:bg-slate-600">All Tasks</SelectItem>
            <SelectItem value="active" className="focus:bg-slate-600">Active</SelectItem>
            <SelectItem value="completed" className="focus:bg-slate-600">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Tag Filter Popover */}
      <div className="md:col-span-1">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start font-normal bg-slate-600 border-slate-500 text-slate-100 hover:bg-slate-500 hover:text-slate-50">
              <Tag className="mr-2 h-4 w-4 text-slate-400" />
              {selectedTags.length > 0 ? `Selected Tags (${selectedTags.length})` : "Filter by Tags"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-slate-700 border-slate-600 text-slate-100" align="start">
            <Command>
              <CommandInput placeholder="Search tags..." className="h-9 bg-slate-600 border-slate-500 text-slate-100 placeholder-slate-400 focus:ring-purple-500" />
              <CommandList>
                <CommandEmpty className="py-2 px-3 text-sm text-slate-400">No tags found.</CommandEmpty>
                <CommandGroup>
                  {allTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <CommandItem
                        key={tag}
                        value={tag}
                        onSelect={() => handleTagSelect(tag)}
                        className="flex items-center justify-between hover:bg-slate-600 !bg-slate-700 aria-selected:!bg-slate-600"
                      >
                        <span>{tag}</span>
                        {isSelected && <Check className="ml-auto h-4 w-4 text-purple-400" />}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
             {selectedTags.length > 0 && (
                <div className="p-2 border-t border-slate-600">
                    <Button variant="ghost" size="sm" className="w-full text-xs text-purple-400 hover:bg-slate-600 hover:text-purple-300" onClick={() => onTagChange([])}>
                        Clear Selected Tags
                    </Button>
                </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      {/* Display selected tags */}
      {selectedTags.length > 0 && (
        <div className="md:col-span-3 mt-2 flex flex-wrap gap-2">
            <span className="text-sm text-slate-400 self-center">Active tag filters:</span>
            {selectedTags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-purple-600 text-white">
                    {tag}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-1 h-4 w-4 rounded-full hover:bg-purple-800 p-0"
                        onClick={() => handleTagSelect(tag)} // This will deselect it
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            ))}
        </div>
      )}
    </div>
  );
};

export default FilterControls;
