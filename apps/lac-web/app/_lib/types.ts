export type Attributes = {
  attribute_name: string;
  attribute_value: string | null;
};

export type OldPagination = {
  db_count: string;
  offset: number;
  perPage: number;
};

export type ItemInfo = {
  productId: number;
  slug: string;
  isExcludedProduct: boolean;
  productSku: string;
  productName: string;
  image: string;
  isComparison: boolean;
  isHazardous: boolean;
  specialShipping: boolean;
  productIdOnSap: string;
  mfrPartNo: string;
  productDescription: string;
  productTitle: string;
  brandCode: number;
  unitOfMeasure: string;
  boxQuantity: number;
  minimumOrderQuantity: number;
  quantityByIncrements: number;
  weight: number;
  prop65MessageOne: string;
  prop65MessageTwo: string;
  prop65MessageThree: string;
  listPrice: number;
  isSaleItem: boolean;
  isNewItem: boolean;
  fClassId: number;
  class: string;
  attributes: Attributes[];
  productStatus: string;
  isDirectlyShippedFromVendor: boolean;
  productSummary: string;
  brand: string;
  productCategory: string;
};

export type OldPurchasedProduct = {
  product: string;
  id: string;
  isDiscontinued: boolean;
  isFavorite: boolean;
  orderDate: string;
  sku: string;
  totalItem: string;
};

export type OldPurchasedItems = {
  products: OldPurchasedProduct[];
  pagination: [OldPagination];
};

export type FilterTitle = "PO #" | "Job Name" | "Status" | "Transaction Type";

export type PurchasedProduct = {
  productTitle: string;
  productSku: string;
  productId: number;
  totalItem: number;
  purchaseOrderDate: string;
  isFavorite: boolean;
  isDiscontinued: boolean;
};

export type Pagination = {
  totalCount: number;
  offset: number;
  perPage: number;
};

export type PurchasedItems = {
  products: PurchasedProduct[];
  pagination: Pagination;
};

export type PriceBreakDownObject = {
  qty_1: number;
  price_1: number;
};

export type PriceBreakDowns = PriceBreakDownObject[];

export type PasswordPolicies = {
  minimumLength: number;
  minimumNumbers: number;
  minimumAlphabets: number;
};

export type CartItemConfiguration = {
  avail_1: string;
  avail_2: string;
  avail_3: string;
  avail_4: string;
  avail_5: string;
  plant_1: string;
  plant_2: string;
  plant_3: string;
  plant_4: string;
  plant_5: string;
  poOrJobName?: string;
  shipping_method_1: string;
  shipping_method_2: string;
  shipping_method_3: string;
  shipping_method_4: string;
  shipping_method_5: string;
  will_call_avail: string;
  will_call_plant: string;
  hashvalue: string;
  selectedOption: string;
  backorder_all: string;
  backorder_date: string;
  backorder_quantity: string;
  will_call_shipping: string;
  will_call_not_in_stock: string;
};

export type CartConfiguration = {
  po_job: null;
  jobName: string | null;
  coupon: string | null;
  po: string | null;
  sold_to: null;
  ship_to: null;
  user_email: null;
  is_overridden: null;
  overridden_email: null;
  osr: null;
  "first-name": null;
  default_shipping: boolean | string;
  delivering_plant: null;
  avail_payment_options: string;
  attnName: string | null;
  pickDate: string | null;
  driverNote: string | null;
  orderEmail: string | null;
  completeDelivery: boolean | null;
  paymentToken: string | null;
  cardName: string | null;
  cardType: string | null;
  expireDate: string | null;
  paymentMethod: string | null;
  isAPrimaryShippingAddress?: null;
  shippingAddressId: string | null;
  backorder_date: string;
  backorder_quantity: string;
};

export type GroupList = {
  groupid: string;
  type: string;
  item_group_name: string;
  slug: string;
  brandName: string;
  brandid: string;
  group_img: string;
  compliance_flags: string;
  fclassid: null;
  txt_meta_title?: string;
  itemSkuList: {
    productid: string;
    is_product_exclude: boolean;
    txt_wurth_lac_item: string;
    item_name: string;
    img: string;
    slug: string;
    is_favourite: boolean;
    is_comparison: null;
    "SKU-attribute": string;
    txt_hazardous: string;
    txt_sap: string;
    txt_mfn: string;
    txt_description_name: string;
    txt_sub_description: string;
    sel_assigned_brand: string;

    txt_uom_label: string;

    txt_box_qt: string;
    txt_min_order_amount: string;
    txt_order_qty_increments: string;
    txt_weight_value: string;
    txt_prop65_message_01: string;
    txt_prop65_message_02: null;
    txt_prop65_message_03: null;

    list_price: string;
    on_sale: string;
    is_new: string;
    is_directly_shipped_from_vendor: boolean;
  }[];
  variationsCount: number;
};

export type Status = "ACTIVE" | "SUSPENDED";

export type ShippingMethod = {
  code: string;
  name: string;
};

export type PaymentMethod = {
  code: string;
  name: string;
  isCreditCard: boolean;
};

export type Plant = {
  code: string;
  name: string;
  is_willcall: boolean;
  is_transfer: boolean;
  xPlant: string;
};

export type FilterValues = {
  id: number;
  value: string;
  icon: string | null;
  tooltip: string | null;
  active: boolean;
}[];

export type Filters = {
  id: string;
  filter: string;
  values: FilterValues;
  is_colorpicker: boolean;
};

export type Address = {
  xcAddressId?: string;
  countryName: string;
  county: string | null;
  locality: string;
  organization?: string;
  phoneNumber?: string;
  region: string;
  streetAddress: string;
  postalCode: string;
  zip4: string;
  shipTo?: string;
  soldTo?: string;
  default?: boolean;
  defaultShipping?: string | boolean;
  routeInfo?: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    route: string | null;
    routeName: string;
  };
  country?: string;
};

export type AddressCheckSuggestions = {
  checkType: string;
  message: string;
  suggestions: Address[];
};

export type AddressFormData = {
  company?: string;
  addressLineOne?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phoneNumber?: string;
  zip4?: string;
  country?: string;
  county?: string;
  xcAddressId?: string;
  shipTo?: string;
  default?: boolean;
  skipAddressCheck?: boolean;
};

export type Cart = {
  cartItems: {
    code: string;
    quantity: number;
    cart_item_id: number;
    configuration: CartItemConfiguration;
    is_laminate: boolean;
    itemInfo: {
      productid: string;
      is_product_exclude: boolean;
      txt_wurth_lac_item: string;
      item_name: string;
      img: string;
      url: string;
      is_favourite: null;
      is_comparison: null;
      txt_hazardous: string;
      txt_special_shipping: string;
      txt_sap: string;
      txt_mfn: string;
      txt_description_name: string;
      txt_sub_description: string;
      sel_assigned_brand: string;
      txt_uom: string;
      txt_uom_label: string;
      txt_uom_value: null;
      txt_rounding: null;
      txt_box_qt: string;
      txt_min_order_amount: string;
      txt_order_qty_increments: string;
      txt_weight_value: string;
      txt_wight: string;
      txt_weight_label: string;
      date: Date;
      txt_chemical_carncengen: null;
      txt_chemical_reproduction: null;
      txt_contains_wood: null;
      txt_prop65_message_01: string;
      txt_prop65_message_02: null;
      txt_prop65_message_03: null;
      txt_meta_title: string;
      txt_upc1: string;
      txt_seo_meta_description: string;
      txt_keywords: string;
      list_price: string;
      on_sale: string;
      is_new: string;
      fclassid: null;
      brand_name: string;
      txt_group_code: null;
      item_status: null;
      category_name: string;
      product_summary: string;
      is_directly_shipped_from_vendor: boolean;
      slug: string;
    };
  }[];
  configuration: CartConfiguration;
  "total-quantity": number;
  allRegionalExluded: boolean;
};

export type ShoppingList = {
  lists: ShoppingListElement[];
  pagination: Pagination;
};

export type ShoppingListElement = {
  listId: string;
  listName: string;
  date: string;
  totalItem: string;
};

export type ShoppingListResponse = {
  lists: ShoppingListElementResponse[];
  pagination: OldPagination;
};

export type ShoppingListElementResponse = {
  list: string;
  list_id: string;
  date: string;
  totalItem: string;
};

export type ProductVariant = {
  id: string;
  slug: string;
  sku: string;
  title: string;
  image: string;
  uom: string;
  onSale?: boolean;
  isNewItem?: boolean;
  isExcludedProduct?: boolean;
};

export type Product = {
  groupName: string;
  groupImage: string;
  variants: ProductVariant[];
  gtmProduct?: GtmProduct[];
};

export type GtmProduct = {
  productid: string;
  cartid: number;
  item_id: string;
  item_sku: string;
  item_name: string;
  price: string;
  item_brand: string;
  item_variant: string;
  item_categoryid: string;
  coupon: string;
  coupon_discount: string;
  item_primarycategory: string;
  item_category_path: string[];
};

export type Token = string;

export type AvailabilityParameters = {
  productId: number;
  qty: number;
  plant?: string;
};

export type CheckAvailability = {
  productid: number;
  status: string;
  options: {
    backOrder: boolean;
    plants: {
      index: number;
      isSameDayAvail: boolean;
      plant: string;
      quantity?: number;
      backOrderQuantity?: number;
      backOrderDate?: string;
      shippingMethods: ShippingMethod[];
    }[];
    type: string;
    hash: string;
  }[];
  willcallanywhere: {
    hash: string;
    status: string;
    willCallBackOrder: string; // Back order date
    willCallPlant: string;
    willCallQuantity: number;
    backOrder?: boolean;
    backOrderDate_1?: string;
    backOrderQuantity_1?: number;
    index?: number;
    plant_1?: string;
    quantity_1?: number;
    shippingMethods_1?: string[];
    shippingMethod: string;
    type?: string;
    isTransfer?: boolean;
  }[];
  xplant: string;
  available_locations: {
    location: string;
    name: string;
    amount: number;
  }[];
  backorder_location: string;
  backorder_date: string;
};

export type TransformedCategory = {
  id: number;
  name: string;
  slug: string;
  shortCode: string;
  itemCount: number;
  directItemCount: number;
  image: null | string;
  subCategory?: TransformedCategory[];
};

export type ItemPrice = {
  productId: number;
  price: number;
  priceUnit: string;
  extendedPrice: number;
  listPrice: number;
  couponCode: string | null;
  priceBreakDowns: { quantity: number; price: number }[];
  uomPrice: number | undefined;
  uomPriceUnit: string | undefined;
};

export type ItemsPriceResult = {
  error: true | null;
  productPrices: ItemPrice[];
};

export type GetPricesResult = {
  error: true | null;
  productPrices: {
    productId: string;
    price: number;
    priceUnit: string;
    extendedPrice: number;
    listPrice: number;
    couponCode: string | null;
    priceBreakDowns: { quantity: number; price: number }[];
    uomPrice: number | undefined;
    uomPriceUnit: string | undefined;
  }[];
};

export type UpdateUser = {
  userId: number;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  email?: string;
  password?: string;
  permission?: string;
  status?: string;
};

export type Country = {
  code: string;
  country: string;
};

export type ProductItemInfo = {
  productid: string;
  is_product_exclude: boolean;
  txt_wurth_lac_item: string;
  item_name: string;
  img: string;
  slug: string;
  is_comparison: boolean;
  txt_hazardous: string;
  txt_special_shipping: string;
  txt_sap: string;
  txt_mfn: string;
  txt_description_name: string;
  txt_sub_description: string;
  sel_assigned_brand: string;
  txt_uom: string;
  txt_uom_label: string;
  txt_uom_value: null;
  txt_rounding: null;
  txt_box_qt: string;
  txt_min_order_amount: string;
  txt_order_qty_increments: string;
  txt_weight_value: string;
  txt_wight: string;
  txt_weight_label: string;
  date: Date;
  txt_chemical_carncengen: string;
  txt_chemical_reproduction: null;
  txt_contains_wood: null;
  txt_prop65_message_01: string;
  txt_prop65_message_02: null;
  txt_prop65_message_03: null;
  txt_meta_title: string;
  txt_upc1: string;
  txt_seo_meta_description: string;
  txt_keywords: string;
  list_price: string;
  on_sale: string;
  is_new: string;
  fclassid: string;
  brand_name: string;
  txt_group_code: null;
  item_status: null;
  category_name: string;
  product_summary: string;
  is_directly_shipped_from_vendor: boolean;
  class: string;
  attributes: {
    attribute_name: string;
    attribute_value: null | string;
  }[];
  size: string;
};

export type LaminateItemInfo = ProductItemInfo & {
  size: string;
};

export type EdgeBanding = {
  productId: number;
  slug: string;
  isExcludedProduct: boolean;
  productSku: string;
  productName: string;
  image: string;
  isComparison: boolean;
  isHazardous: boolean;
  specialShipping: boolean;
  productIdOnSap: string;
  mfrPartNo: string;
  productDescription: string;
  productSubDescription: string;
  brandCode: number;
  unitOfMeasure: string;
  boxQuantity: number;
  minimumOrderQuantity: number;
  quantityByIncrements: number;
  weight: number;
  prop65MessageOne: string;
  prop65MessageTwo: string;
  prop65MessageThree: string;
  listPrice: number;
  isSaleItem: boolean;
  isNewItem: boolean;
  fClassId: number;
  class: string;
  attributes: {
    attribute_name: string;
    attribute_value: null | string;
  }[];
  productStatus: string;
  isDirectlyShippedFromVendor: boolean;
  productSummary: string;
  brand: string;
  productCategory: string;
  size: string;
};
