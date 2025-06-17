import { API_BASE_URL } from "../constants/api";

interface UserData {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: UserData;
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return { success: true, token: data.token, user: data.user };
  } catch (error: any) {
    console.error('Error logging in:', error);
    return { success: false, message: error.message || 'Failed to login.' };
  }
};

export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return { success: true, token: data.token, user: data.user };
  } catch (error: any) {
    console.error('Error registering:', error);
    return { success: false, message: error.message || 'Failed to register.' };
  }
}; 