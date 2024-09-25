import { useFormContext } from "react-hook-form";
import { type AddToCartSchema } from "./helpers";

const useAddToCartForm = () => {
  return useFormContext<AddToCartSchema>();
};

export default useAddToCartForm;
