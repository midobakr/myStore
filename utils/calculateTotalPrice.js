const calculateTotalPrice = (cart) => {
  let m = 0;
  if (cart[0]) {
    m = cart.reduce((prev, current) => {
      return prev + current.totalPrice;
    }, 0);
  }
  return m;
};
export default calculateTotalPrice;
