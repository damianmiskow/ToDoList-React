export interface Task {
  id: number
  name: string
  date: string
  details: string
}

export const todoList: Task[] = [
  {
    name: 'task 123',
    date: '2025-10-01',
    id: 1,
    details: '123'
  },
  {
    name: 'task 1234',
    date: '2025-10-15',
    id: 2,
    details: ''
  },
  {
    name: 'damian tast',
    date: '2026-02-24',
    id: 3,
    details: ''
  }
];