import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../pages/shop/application/shop";
import {
  removeFromCart,
  updateCartCount,
} from "../pages/Cart/application/cart";

export default function useShopItemMutations(itemId) {
  const queryClient = useQueryClient();

  const updateCartMutation = useMutation({
    mutationFn: (e) => updateCartCount(itemId, e),
    onError: (e) => {
      console.log(e);
      toast.error("An error occured while updating the cart!");
      queryClient.invalidateQueries("cart");
    },
    onSuccess: (e) => {
      console.log("Success", e);
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const deleteItemFromCartMutation = useMutation({
    mutationFn: () => removeFromCart(itemId),
    onError: (e) => {
      console.log(e);
      toast.error("An error occured while removing the item from the cart!");
      queryClient.invalidateQueries("cart");
    },
    onSuccess: (e) => {
      console.log("Success", e);
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: () => deleteItem(itemId),
    onError: (e) => {
      console.log(e);
      toast.error("An error occured while deleting the item!");
      queryClient.invalidateQueries("items");
    },
    onSuccess: (e) => {
      console.log("Success", e);
      queryClient.invalidateQueries(["items"]);
    },
  });

  return { updateCartMutation, deleteItemFromCartMutation, deleteItemMutation };
}
