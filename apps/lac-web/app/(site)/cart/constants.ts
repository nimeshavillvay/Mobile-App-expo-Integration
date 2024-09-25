// Available shipping options
export const AVAILABLE_ALL = "availableAll" as const;
export const SHIP_TO_ME = "shipToMe" as const;
export const TAKE_ON_HAND = "takeOnHand" as const;
export const BACK_ORDER_ALL = "backOrderAll" as const;
export const ALTERNATIVE_BRANCHES = "shipAlternativeBranch" as const;

// Main shipping options UI
export const MAIN_OPTIONS = {
  SHIP_TO_ME: "ship-to-me",
  SHIP_TO_ME_ALT: "ship-to-me-alt",
  WILL_CALL: "will-call",
  WILL_CALL_TRANSFER: "will-call-transfer",
  BACK_ORDER: "back-order",
} as const;

export const DEFAULT_PLANT = "L010";

export const DEFAULT_SHIPPING_METHOD = "G";
export const WILLCALL_SHIPING_METHOD = "W";
export const WILLCALL_TRANSFER_SHIPING_METHOD = "X";

export const EXCLUDED_SHIPPING_METHODS = ["W", "X"] as const;
