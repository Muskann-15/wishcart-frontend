import { API_BASE_URL } from "../constants/api";

interface UserData {
  id: string;
  email: string;
  name: string;
  wishlist: Array<{
    productId: string;
    productType: string;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    _id: string;
  }>;
  cart: Array<{
    productId: string;
    quantity: number;
    price: number;
    _id: string;
  }>;
  accountType: string
}

interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: UserData;
  data?: UserData;
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

export const getUserDetails = async (): Promise<AuthResponse> => {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/user/details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user details');
    }

    return { success: true, data: data.data };
  } catch (error: any) {
    console.error('Error fetching user details:', error);
    return { success: false, message: error.message || 'Failed to fetch user details.' };
  }
}; 