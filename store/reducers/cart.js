import { ADD_TO_CART } from "../actions/cart";
import cartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;
      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new cartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const updatedOrNewCartItem = new cartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice
        );
        return {
          ...state,
          // in vanilla js you can add or access dynamic property in a object by putting [] and key
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }
  }
  return state;
};
