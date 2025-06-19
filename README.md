# Interactive To-Do Dashboard

A modern, interactive To-Do application built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- ✅ **Add, Edit, and Delete Tasks** - Full CRUD operations for managing your to-dos
- 🏷️ **Tag Management** - Organize tasks with custom tags
- 🔍 **Advanced Filtering** - Filter by status (all, active, completed) and tags
- 🔎 **Search Functionality** - Search through tasks and tags
- 💾 **Local Storage** - Automatically saves your tasks locally
- 🎨 **Beautiful UI** - Modern dark theme with gradient backgrounds
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd /Users/stevenhertz/Documents/todoReactGoogleAIFromClaude
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Adding Tasks
1. Click the "Add New Task" button
2. Enter your task description
3. Add tags by typing and pressing Enter or clicking "Add"
4. Click "Add Task" to save

### Managing Tasks
- **Complete**: Check the checkbox next to a task
- **Edit**: Click the "Edit" button to modify task text and tags
- **Delete**: Click the "Delete" button to remove a task

### Filtering and Search
- **Search**: Use the search bar to find tasks by text or tags
- **Status Filter**: Filter by All Tasks, Active, or Completed
- **Tag Filter**: Select specific tags to filter tasks
- **Multiple Filters**: Combine search, status, and tag filters for precise results

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── AddTodoDialog.tsx
│   ├── FilterControls.tsx
│   ├── TodoItem.tsx
│   └── TodoList.tsx
├── lib/
│   └── utils.ts      # Utility functions
├── types.ts          # TypeScript type definitions
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## Customization

### Adding New Features
The application is built with modularity in mind. You can easily extend it with:
- Due dates for tasks
- Priority levels
- Categories beyond tags
- Task descriptions
- Drag and drop reordering
- Export/import functionality

### Styling
The application uses Tailwind CSS with a custom dark theme. You can modify:
- Colors in `tailwind.config.js`
- CSS variables in `src/index.css`
- Component-specific styles in each component file

## Data Persistence

Tasks are automatically saved to your browser's local storage. Your tasks will persist between browser sessions, but they are tied to the specific browser and device you're using.

## Browser Compatibility

This application works in all modern browsers that support:
- ES2020 features
- CSS Grid and Flexbox
- Local Storage API

## Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)
