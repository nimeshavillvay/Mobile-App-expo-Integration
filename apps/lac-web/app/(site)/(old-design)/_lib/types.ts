export type Category = {
  id: number;
  name: string;
  slug: string;
  shortcode: string;
  item_count: number;
  img: null | string;
  subcategory: {
    subid: number;
    name: string;
    slug: string;
    shortcode: null;
    item_count: number;
    subsubcategory?: {
      subsubid: number;
      subsubname: string;
      slug: string;
      subsubshortcode: null;
      item_count: number;
    }[];
  }[];
};

export type Address = {
  "address-id": string;
  name: string;
  "street-address": string;
  locality: string;
  region: string;
  "postal-code": string;
  county: string;
  "country-name": string;
  plant?: string;
  route_info?: {
    route: string;
    routeName: string;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
  };
  "phone-no"?: string;
};

export type Role = {
  code: string;
  description: string;
};

export type Availability = {
  options: [
    {
      backOrder: string;
      index: string;
      plant_1: string;
      quantity_1?: string;
      shippingMethods_1: string;
      type: string;
      hash: string;
      backOrderDate_1?: string;
      backOrderQuantity_1?: string;
    },
  ];
  price: number;
  sku: string;
  status: string;
  willcallanywhere: unknown;
  xplant: string;
};

export type UOM = "PR" | "EA" | "BX" | "SH" | "RL" | "ST";
export type UOMLabel = "Pair" | "Each" | "Box" | "Sheet" | "Roll" | "Set";

export type Product = {
  code: string;
  quantity: number;
  guid: number;
  configuration: {
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
    poOrJobName: string;
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
  };
  itemInfo: {
    groupId: number;
    txt_x_pant_Mat_status: string;
    pim_item_name: string;
    sel_profile: string;
    txt_abc_code: null;
    txt_m_type: string;
    txt_reserve: null;
    txt_web_visible_status: string;
    txt_web_direct: string;
    txt_hazardous: string;
    txt_special_shipping: string;
    txt_sap: string;
    txt_mfn: string;
    txt_wurth_CInumber: null;
    txt_wurth_lac_item: string;
    txt_description_name: string;
    sel_assigned_brand: string;
    txt_uom: UOM;
    txt_uom_label: UOM;
    txt_uom_value: null;
    txt_rounding: null;
    txt_box_qt: string;
    txt_min_order_amount: string;
    txt_order_qty_increments: string;
    txt_weight_value: string;
    txt_wight: string;
    txt_weight_label: string;
    txt_sku_optioon_value: null;
    date: Date;
    txt_group_code: null;
    txt_mat_group: string;
    txt_mat_description_1: null;
    txt_mat_description_2: null;
    txt_print_cat_page_number: null;
    txt_sub_description: string;
    txt_product_summary: string;
    txt_chemical_carncengen: string;
    txt_chemical_reproduction: string;
    txt_contains_wood: string;
    txt_meta_title: string;
    txt_h1: null | string;
    txt_h2: null | string;
    txt_h3: null | string;
    txt_upc1: string;
    txt_upc2: null;
    txt_seo_meta_description: null;
    txt_keywords: null | string;
    img: string;
    brand_name: string;
    txt_prop65_message_01: string;
    txt_prop65_message_02: string;
    txt_prop65_message_03: string;
  };
};
