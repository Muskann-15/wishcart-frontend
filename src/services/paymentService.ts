import { API_BASE_URL } from '../constants/api';

export const initiateHostedCheckout = async (amount: number) => {
  const response = await fetch(`${API_BASE_URL}/payment/pay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Payment failed');
  }

  return await response.json();
};
