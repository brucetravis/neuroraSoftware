const axios = require('axios');

const testPaystack = async () => {
  try {
    const response = await axios.get('https://api.paystack.co/transaction/verify/test', {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    });
    console.log('Connection works:', response.data);
  } catch (err) {
    console.error('Cannot reach Paystack:', err.message);
  }
};

testPaystack();
