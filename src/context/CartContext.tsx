import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { cartService, type BackendCart, type CartItem as ServiceCartItem, type BackendCartProduct, type ApiResponse } from '../services/cartService';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  imageUrl: string;
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItemToCart: (productId: string, quantity: number, price: number) => Promise<ApiResponse<ServiceCartItem>>;
  removeItemFromCart: (productId: string) => Promise<ApiResponse<ServiceCartItem>>;
  updateCart: (cartItems: Array<{ productId: string; quantity: number; price: number; _id: string }>) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cartService.getCart();

      if (!response.success || !response.data) {
        console.warn('Failed to fetch cart:', response.message);
        setCart(null);
        return;
      }

      const fetchedBackendCart: BackendCart = response.data;

      const transformedItems: CartItem[] = (fetchedBackendCart.products || []).map((product: BackendCartProduct) => {
        let productId = '';

        if (typeof product.productId === 'object' && product.productId !== null) {
          productId = product.productId._id?.toString?.() || '';
        } else if (typeof product.productId === 'string') {
          productId = product.productId;
        }

        return {
          productId,
          quantity: product.quantity,
          price: product.price,
          name: product.name || '',
          imageUrl: product.imageUrl || '',
        };
      });

      const totalQuantity = transformedItems.reduce((acc, item) => acc + item.quantity, 0);
      const totalPrice = transformedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

      const transformedCart: Cart = {
        id: fetchedBackendCart.id,
        userId: fetchedBackendCart.userId,
        items: transformedItems,
        totalQuantity,
        totalPrice,
      };

      setCart(transformedCart);
    } catch (err: any) {
      console.error('Error fetching cart:', err);
      setError(err.message || 'Failed to fetch cart');
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (productId: string, quantity: number, price: number): Promise<ApiResponse<ServiceCartItem>> => {
    setError(null);
    try {
      const response = await cartService.addToCart(productId, quantity, price);
      await fetchCart();
      return response;
    } catch (err: any) {
      console.error('Failed to add item to cart:', err.message || err);
      setError(err.message || 'Failed to add item to cart');
      return { success: false, message: err.message || 'Failed to add item to cart.' };
    }
  };

  const removeItemFromCart = async (productId: string): Promise<ApiResponse<ServiceCartItem>> => {
    setLoading(true);
    setError(null);
    try {
      const response = await cartService.removeFromCart(productId);
      await fetchCart();
      return response;
    } catch (err: any) {
      console.error('Failed to remove item from cart:', err.message || err);
      setError(err.message || 'Failed to remove item from cart');
      return { success: false, message: err.message || 'Failed to remove item from cart.' };
    } finally {
      setLoading(false);
    }
  };

  const updateCart = (cartItems: Array<{ productId: string; quantity: number; price: number; _id: string }>) => {
    const transformedItems: CartItem[] = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      name: '',
      imageUrl: '',
    }));

    const totalQuantity = transformedItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = transformedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    setCart({
      id: cart?.id || '',
      userId: cart?.userId || '',
      items: transformedItems,
      totalQuantity,
      totalPrice,
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      error,
      fetchCart,
      addItemToCart,
      removeItemFromCart,
      updateCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
