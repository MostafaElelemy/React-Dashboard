export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type NotePriority = 'important' | 'normal' | 'delayed';
export type Note = { id: string; text: string; priority: NotePriority; createdAt: number };
