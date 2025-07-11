import { useEffect, useState } from "react";
import type { Product } from "../type/product";
import type { FetchedProductItem } from "../types/ProductTypes";
import { useSelector } from "react-redux";
import type { RootState } from "../config/store";
import { API_BASE_URL } from "../constants/api";
import { getWishlist } from "../services/wishlistService";

const MALE_PRODUCTS_URL = `${API_BASE_URL}/category-products/male`;
const FEMALE_PRODUCTS_URL = `${API_BASE_URL}/category-products/female`;

export const useFetchProductsAndWishlist = ({ setProducts }: { setProducts: React.Dispatch<React.SetStateAction<Product[]>> }) => {
  const { userData: user } = useSelector((state: RootState) => state.userState)

  const [categoryName, setCategoryName] = useState<string>('');
  const [localLoading, setLoading] = useState<boolean>(true);
  const [localError, setError] = useState<string | null>(null);
  const [wishlistProductIds, setWishlistProductIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchProductsAndWishlist();
  }, [location.search]);

  const fetchProductsAndWishlist = async () => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    debugger

    setLoading(true);
    setError(null);
    try {
      let fetchedProducts: Product[] = [];
      if (category === 'men') {
        const response = await fetch(MALE_PRODUCTS_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.data && data.data.accessories) {
          fetchedProducts.push(...data.data.accessories.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        if (data.data && data.data.clothing) {
          fetchedProducts.push(...data.data.clothing.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        setCategoryName('Men\'s Collection');
      } else if (category === 'women') {
        const response = await fetch(FEMALE_PRODUCTS_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.data && data.data.accessories) {
          fetchedProducts.push(...data.data.accessories.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        if (data.data && data.data.clothing) {
          fetchedProducts.push(...data.data.clothing.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        setCategoryName('Women\'s Collection');
      } else {
        const [maleResponse, femaleResponse] = await Promise.all([
          fetch(MALE_PRODUCTS_URL),
          fetch(FEMALE_PRODUCTS_URL)
        ]);

        if (!maleResponse.ok) {
          throw new Error(`HTTP error! status: ${maleResponse.status} from male products`);
        }
        if (!femaleResponse.ok) {
          throw new Error(`HTTP error! status: ${femaleResponse.status} from female products`);
        }

        const maleData = await maleResponse.json();
        const femaleData = await femaleResponse.json();

        if (maleData.data && maleData.data.accessories) {
          fetchedProducts.push(...maleData.data.accessories.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        if (maleData.data && maleData.data.clothing) {
          fetchedProducts.push(...maleData.data.clothing.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        if (femaleData.data && femaleData.data.accessories) {
          fetchedProducts.push(...femaleData.data.accessories.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        if (femaleData.data && femaleData.data.clothing) {
          fetchedProducts.push(...femaleData.data.clothing.map((item: FetchedProductItem) => ({
            id: item.id || item._id || '',
            name: item.title || item.name || item.productName || '',
            title: item.description || '',
            imageUrl: item.imageUrl,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })));
        }
        setCategoryName('All Collections');
      }

      if (user) {
        try {
          const wishlistResponse = await getWishlist();
          if (wishlistResponse.success && Array.isArray(wishlistResponse.data)) {
            const wishlistedIds = new Set<string>(wishlistResponse.data.map((item: { productId: string; _id?: string; }) => item.productId || item._id).filter((id): id is string => !!id));
            setWishlistProductIds(wishlistedIds);
            fetchedProducts = fetchedProducts.map(product => ({
              ...product,
              isWishlisted: wishlistedIds.has(product.id),
            }));
            setProducts(fetchedProducts);
          } else {
            setProducts(fetchedProducts);
            console.warn('Failed to fetch wishlist:', wishlistResponse.message);
          }
        } catch (wishlistError) {
          console.warn('Error fetching wishlist (likely authentication issue):', wishlistError);
          setProducts(fetchedProducts);
        }
      } else {
        setProducts(fetchedProducts);
      }

    } catch (err: any) {
      console.error('An unexpected error occurred during product/wishlist fetch:', err);

      if (err.message && err.message.startsWith('HTTP error!')) {
        setError(`Failed to load products: ${(err as Error).message}. Please ensure the backend server is running and accessible at ${API_BASE_URL}`);
        setProducts([]);
      } else {
        console.warn('Non-critical error encountered (likely authentication for wishlist/cart), displaying products:', err.message || err);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    categoryName,
    localLoading,
    localError,
    wishlistProductIds
  }

} 