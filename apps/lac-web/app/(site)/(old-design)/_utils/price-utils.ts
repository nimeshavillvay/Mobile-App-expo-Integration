/**
 * Calculates the display price and discount.
 *
 * The display price is the lower of the original price or the current price.
 * The discount is calculated as a percentage of the reduction from the
 * original price to the current price, rounded to two decimal places.
 *
 * @param listPrice - The original price of the product.
 * @param price - The current or discounted price of the product
 * @returns An object containing the display price and discount percentage
 */

export const calculatePriceDetails = (price: number, listPrice: number) => {
  const displayPrice = Math.min(price, listPrice);
  const discount = Math.round(((listPrice - price) / listPrice) * 100);

  return { displayPrice, discount };
};
