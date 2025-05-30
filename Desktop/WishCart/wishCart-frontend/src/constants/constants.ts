import { bestSuits, colourDay, flashDeals, topSelling, sectionBeauty, sectionHome, sectionMobile, sectionOutfits, sectionBeverages, sectionSnacks } from '../assets/images';
import electronic1 from '../assets/images/products/product_watch.png';
import decor1 from '../assets/images/products/product_backpack.png';
import beauty1 from '../assets/images/products/product_sneakers.png';
import product_sneakers from '../assets/images/products/product_sneakers.png';
import product_backpack from '../assets/images/products/product_backpack.png';
import product_watch from '../assets/images/products/product_watch.png';

export const CarouselImages = [
  { src: topSelling },
  { src: colourDay },
  { src: bestSuits },
  { src: flashDeals }
];

export const HeaderSectionDeals = [
  { label: 'Mobiles', icon: sectionMobile },
  { label: 'Home & Furniture', icon: sectionHome },
  { label: 'Beauty', icon: sectionBeauty },
  { label: 'Outfits', icon: sectionOutfits },
  { label: 'Beverages', icon: sectionBeverages },
  { label: 'Snacks', icon: sectionSnacks }
]

const electronics = [
  { id: 1, name: 'Bluetooth Speaker', image: electronic1, price: '₹1499' },
  { id: 2, name: 'Wireless Headphones', image: electronic1, price: '₹1999' },
  { id: 3, name: 'Earbuds', image: electronic1, price: '₹2999' },
  { id: 4, name: 'Printers', image: electronic1, price: '₹3099' }
];

const homeDecors = [
  { id: 1, name: 'Wall Art', image: decor1, price: '₹899' },
  { id: 2, name: 'Vase Set', image: decor1, price: '₹1299' },
  { id: 3, name: 'Wall Hangings', image: decor1, price: '₹1999' },
  { id: 4, name: 'Curtains', image: decor1, price: '₹3999' }
];

const beautyProducts = [
  { id: 1, name: 'Lipstick Combo', image: beauty1, price: '₹499' },
  { id: 2, name: 'Face Serum', image: beauty1, price: '600' },
  { id: 3, name: 'Face Wash', image: beauty1, price: '₹899' },
  { id: 4, name: 'Moisturizer', image: beauty1, price: '₹1999' }
];

export const CategorySectionProducts = [
  { title: 'Best of Electronics', products: electronics },
  { title: 'Home Decors', products: homeDecors },
  { title: 'Beauty', products: beautyProducts }
]

export const FooterLinkList = [
  { href: '/about', linkTitle: 'About' },
  { href: '/contact', linkTitle: 'Contact' },
  { href: '/terms', linkTitle: 'Terms' },
  { href: '/privacy', linkTitle: 'Privacy' }
]

export const HeaderLinkList = [
  { href: '/', linkTitle: 'Home' },
  { href: '/', linkTitle: 'Shop' },
  { href: '/', linkTitle: 'Cart' },
  { href: '/', linkTitle: 'Contact' }
]

export const FilterProductType = [
  { label: 'Shoes' },
  { label: 'Bags' },
  { label: 'Watches' }
]

export const FilterColour = [
  { label: 'Black' },
  { label: 'White' },
  { label: 'Red' },
  { label: 'Blue' }
]


export const CategoryPageProducts = [
  {
    id: 1,
    title: 'Stylish Sneakers',
    image: product_sneakers,
    price: '₹999',
  },
  {
    id: 2,
    title: 'Trendy Backpack',
    image: product_backpack,
    price: '₹799',
  },
  {
    id: 3,
    title: 'Smart Watch',
    image: product_watch,
    price: '₹1999',
  },
];