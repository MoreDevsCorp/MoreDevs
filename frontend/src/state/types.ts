export interface User {
  id: string | null;
  name: string | null;
  image: string | null;
  token: string | null;
}

export interface State {
  userInfo: User | null | undefined;
}
