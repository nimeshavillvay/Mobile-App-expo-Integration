import { SESSION_TOKEN_COOKIE, SPECIAL_SHIPPING_FLAG } from "@/_lib/constants";
import { getBoolean } from "@/_lib/utils";
import { z } from "zod";
import { api } from "../api";
import type {
  AvailabilityParameters,
  CheckAvailability,
  ProductItemInfo,
  ShippingMethod,
  Token,
} from "../types";

export const loginCheck = async (token?: string) => {
  const response = await api.get("rest/auth/login-check", {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    cache: "no-store",
    throwHttpErrors: false,
  });

  let tokenValue = "";
  let maxAge = 0;
  // Check for the session token cookie
  for (const header of response.headers.entries()) {
    if (
      header[0] === "set-cookie" &&
      header[1].includes(`${SESSION_TOKEN_COOKIE}=`)
    ) {
      const keyValuePairs = header[1].split("; ");

      for (const pair of keyValuePairs) {
        const [key, value] = pair.split("=");

        if (key && value) {
          if (key === SESSION_TOKEN_COOKIE) {
            tokenValue = value;
          } else if (key === "Max-Age") {
            maxAge = parseInt(value);
          }
        }
      }
    }
  }

  const data = await response.json<
    | {
        isLoggedInAsCustomer: boolean;
        status_code: "OK";
        user_id: string;
        sales_rep_id?: string;
        change_password: boolean;
        user: {
          billto: string;
          user_id: string;
          email: string;
          phone: string;
          company: string;
          fullname: string;
          sales_rep: string;
        };
      }
    | {
        change_password: false;
        status_code: "NOT_LOGGED_IN";
      }
    | undefined
  >();

  return data ? { ...data, tokenValue, maxAge } : undefined;
};

export const getItemInfo = async (productIdList: number[]) => {
  const response = await api
    .get("rest/getiteminfo", {
      searchParams: { productids: productIdList.toString() },
      cache: "no-cache",
    })
    .json<ProductItemInfo[]>();

  const transformedResponse = response.map((item) => ({
    productId: parseInt(item.productid, 10),
    slug: item.slug,
    isExcludedProduct: item.is_product_exclude,
    productSku: item.txt_wurth_lac_item,
    productName: item.item_name,
    image: item.img,
    isComparison: !!item.is_comparison,
    isHazardous: getBoolean(item.txt_hazardous),
    specialShipping: !!SPECIAL_SHIPPING_FLAG.find(
      (flag) => flag === item.txt_special_shipping,
    ),
    productIdOnSap: item.txt_sap,
    mfrPartNo: item.txt_mfn,
    productDescription: item.txt_description_name,
    productSubDescription: item.txt_sub_description,
    brandCode: parseInt(item.sel_assigned_brand, 10),
    unitOfMeasure: item.txt_uom_label,
    boxQuantity: parseInt(item.txt_box_qt, 10) || 1,
    minimumOrderQuantity: parseInt(item.txt_min_order_amount, 10) || 1,
    quantityByIncrements: parseInt(item.txt_box_qt, 10) || 1,
    weight: parseFloat(item.txt_weight_value),
    prop65MessageOne: item.txt_prop65_message_01 ?? "",
    prop65MessageTwo: item.txt_prop65_message_02 ?? "",
    prop65MessageThree: item.txt_prop65_message_03 ?? "",
    listPrice: parseFloat(item.list_price),
    isSaleItem: getBoolean(item.on_sale),
    isNewItem: getBoolean(item.is_new),
    fClassId: parseInt(item.fclassid), //TODO rename after clarify with dimithri
    class: item.class,
    attributes: item.attributes,
    productStatus: item.item_status ?? "",
    isDirectlyShippedFromVendor: item.is_directly_shipped_from_vendor,
    productSummary: item.product_summary,
    brand: item.brand_name,
    productCategory: item.category_name,
  }));

  return transformedResponse;
};

export const checkAvailability = async (
  token: Token | undefined,
  { productId, qty, plant }: AvailabilityParameters,
) => {
  const response = await api
    .post("rest/availability-check", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      json: {
        productid: productId,
        qty,
        plant,
      },
      cache: "no-store",
    })
    .json<CheckAvailability>();

  return {
    productId: response.productid,
    status: response.status,
    options: response.options,
    willCallAnywhere: response.willcallanywhere,
    xplant: response.xplant,
    availableLocations: response.available_locations,
    backorderLocation: response.backorder_location,
    backorderDate: response.backorder_date,
  };
};

export const shippingMethods = async (token?: string, isForCart?: boolean) => {
  return await api
    .get("rest/shipping-methods", {
      searchParams: {
        for_cart: isForCart ?? false,
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      cache: "no-cache",
    })
    .json<ShippingMethod[]>();
};

const productListSchema = z.array(
  z.object({
    productid: z.string(),
    cartid: z.number(),
    item_id: z.string(),
    item_sku: z.string(),
    item_name: z.string(),
    price: z.string(),
    item_brand: z.string(),
    item_variant: z.string(),
    item_categoryid: z.string(),
    coupon: z.string(),
    coupon_discount: z.string(),
    item_primarycategory: z.string(),
    item_category_path: z.array(z.string()),
  }),
);

export const getGtmProducts = async (
  productIdList: {
    productid: number;
    cartid: number | null | undefined;
  }[],
  token: string,
) => {
  if (process.env.NEXT_PUBLIC_WURTH_LAC_DISABLE_GTM === "1") {
    return [];
  }
  const response = await api
    .post("rest/gtm/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        products: productIdList,
      },
    })
    .json();

  return productListSchema.parse(response);
};
