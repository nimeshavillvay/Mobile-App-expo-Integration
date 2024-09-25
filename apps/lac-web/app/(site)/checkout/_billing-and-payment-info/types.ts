export type CreditCard = {
  id: number;
  type: "MC" | "VISA";
  number: string;
  name: string;
  expiryDate: string;
  defaultPaymentCard: boolean;
};
