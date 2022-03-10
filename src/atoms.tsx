import { atom } from 'recoil';

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'TO Do': [{ id: 1, text: 'hello1' }, { id: 2, text: 'hello2' }],
    'Doing': [],
    'Done': []
  }
});