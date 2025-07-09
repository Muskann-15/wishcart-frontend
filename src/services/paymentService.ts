import { API_BASE_URL } from '../constants/api';

export const createRazorpayOrder = async (amount: number) => {
  const response = await fetch(`${API_BASE_URL}/payment/razorpay/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });

  return await response.json();
};
