export type User = {
    name: string;
    email: string;
    password: string;
    
  };

  export type AppState = {
    token: string
    user: User | null;
}

export type UserPayload = {
  payload: any;
  type: string;
}