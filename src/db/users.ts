export interface User {
  id: string | number;
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean;
}

const Bela: User = {
  id: '1',
  login: 'beluci',
  password: 'beluci123',
  age: 22,
  isDeleted: false,
};

const Geza: User = {
  id: '2',
  login: 'gezuci',
  password: 'gezuci123',
  age: 24,
  isDeleted: false,
};

const Jucika: User = {
  id: '3',
  login: 'jucika',
  password: 'julis2000',
  age: 23,
  isDeleted: false,
};

export const users: User[] = [Bela, Geza, Jucika];
