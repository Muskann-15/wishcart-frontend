import { API_BASE_URL } from "../constants/api";

interface WishlistProduct {
  productId: string;
  name: string;
  productType: string;
}

interface WishlistResponse {
  success: boolean;
  message?: string;
  data?: any;
}

const getAuthToken = (): string | null => {
  return localStorage.getItem('jwtToken');
};

const handleApiResponse = async (response: Response): Promise<WishlistResponse> => {
  const data = await response.json();
  if (!response.ok) {
    return { success: false, message: data.message || 'An error occurred' };
  }
  return { success: true, data };
};

export const addProductToWishlist = async (product: WishlistProduct): Promise<WishlistResponse> => {
  const token = getAuthToken();
  if (!token) {
    return { success: false, message: 'Authentication token not found.' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/wishlist/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    return handleApiResponse(response);
  } catch (error: any) {
    console.error('Error adding product to wishlist:', error);
    return { success: false, message: error.message || 'Failed to add product to wishlist.' };
  }
};

export const removeProductFromWishlist = async (productId: string, productType: string): Promise<WishlistResponse> => {
  const token = getAuthToken();
  if (!token) {
    return { success: false, message: 'Authentication token not found.' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/wishlist/remove/${productId}/${productType}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleApiResponse(response);
  } catch (error: any) {
    console.error('Error removing product from wishlist:', error);
    return { success: false, message: error.message || 'Failed to remove product from wishlist.' };
  }
};

export const getWishlist = async (): Promise<WishlistResponse> => {
  const token = getAuthToken();
  if (!token) {
    return { success: false, message: 'Authentication token not found.' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleApiResponse(response);
  } catch (error: any) {
    console.error('Error fetching wishlist:', error);
    return { success: false, message: error.message || 'Failed to fetch wishlist.' };
  }
}; 