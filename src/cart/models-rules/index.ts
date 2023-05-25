import { Cart, CartItem } from 'src/database/entities';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart ? cart.items?.reduce((acc: number, { count }: CartItem) => {
    return acc += 3 * count;
  }, 0) : 0;
}
