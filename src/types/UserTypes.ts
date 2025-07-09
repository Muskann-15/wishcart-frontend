export interface IUser {
    id: string;
    email: string;
    name: string;
    wishlist: IWishlistItem[];
    cart: ICartItem[];
}

export interface IWishlistItem {
    productId: string;
    productType: string;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    _id: string;
}

export interface ICartItem {
    productId: string;
    quantity: number;
    price: number;
    _id: string;
    name?: string;
    imageUrl?: string;
}
