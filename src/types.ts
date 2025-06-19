export interface ToDo {
  id: string;
  text: string;
  completed: boolean;
  tags: string[];
  createdAt: number; // For sorting or display
}

export type FilterStatus = 'all' | 'active' | 'completed';
