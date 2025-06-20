import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { getUserDetails } from '../services/authService';

interface WishlistItem {
  productId: string;
  productType: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  _id: string;
}

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  _id: string;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  wishlist: WishlistItem[];
  cart: CartItem[];
}

interface UserContextType {
  user: UserData | null;
  setUser: any;
  loading: boolean;
  error: string | null;
  refreshUserDetails: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserDetails();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        setUser(null);
        setError(response.message || 'Failed to fetch user details');
      }
    } catch (err: any) {
      setUser(null);
      setError(err.message || 'Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error, refreshUserDetails: fetchUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}; 