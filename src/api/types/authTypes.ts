interface User {
  name: string;
}

export interface AuthResponse {
  error: string;
  message: string;
  user: User;
}
