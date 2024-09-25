type ProductSelect =
  | { productid: number; slug: string }
  | { productid: false; slug: null }; // If the combination is not allowed

export type Value = {
  id: number;
  name: string;
  icon: string | null;
  selected: boolean;
} & ProductSelect;
