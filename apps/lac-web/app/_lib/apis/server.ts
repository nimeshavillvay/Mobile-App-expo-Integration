import { unstable_cache as cache } from "next/cache";
import { notFound } from "next/navigation";
import "server-only";
import { api } from "../api";
import { DEFAULT_REVALIDATE } from "../constants";
import type {
  Country,
  PasswordPolicies,
  PaymentMethod,
  Plant,
  TransformedCategory,
} from "../types";
import { shippingMethods } from "./shared";

export const getBreadcrumbs = async (
  id: string,
  type: "product" | "category",
) => {
  // TODO Remove try/catch block and placeholder data when real API is ready
  try {
    const response = await api
      .get("rest/breadcrumbs", {
        searchParams: new URLSearchParams({
          [type === "product" ? "productId" : "catId"]: id,
        }),
        next: {
          revalidate: DEFAULT_REVALIDATE,
        },
      })
      .json<
        {
          oo_id: number;
          cat_name: string;
          slug: string;
        }[]
      >();

    return response.map((item) => ({
      id: Number(item.oo_id),
      categoryName: item.cat_name,
      slug: item.slug,
    }));
  } catch {
    return [
      {
        id: "113",
        categoryName: "Woodworking and Shop Supplies",
        slug: "woodworking-and-shop-supplies",
      },
      {
        id: "183",
        categoryName: "Drawer Slides & Systems",
        slug: "drawer-slides-and-systems",
      },
      {
        id: "184",
        categoryName: "Drawer Slides",
        slug: "drawer-slides-c-696",
      },
      {
        id: "185",
        categoryName: "Ball Bearing Slides",
        slug: "ball-bearing-slides",
      },
    ];
  }
};

type Banner = {
  "banner-id": string;
  priority: string;
  banners: {
    id: string;
    slot: string;
    class: string;
    "data-descr": string;
    active: number;
    alt_tag: string;
    priority: string;
    html_content: string;
    pdf_file_name: string;
    pdf_file_path: string;
    use_custom_link: number;
    custom_url: string;
    file_name: string;
    file_path: string;
    mobile_file_name: string;
    mobile_file_path: null | string;
  }[];
};
export const getBanners = async (categoryId: string) => {
  return await api
    .get("rest/banners", {
      searchParams: {
        categoryid: categoryId,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<{
      B: Banner[];
      H: Banner[];
      T: Banner[];
    }>();
};

export const getJobRoles = async () => {
  return await api
    .get("rest/get-roles", {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<{
      roles: {
        code: string;
        description: string;
      }[];
    }>();
};

export const getPasswordPolicies = async (): Promise<PasswordPolicies> => {
  const response = await api
    .get("rest/passwordpolicy", {
      next: { revalidate: DEFAULT_REVALIDATE },
    })
    .json<{
      success: boolean;
      message: string;
      error_code: number;
      data: {
        passwordPolicies: {
          code: string;
          value: string;
          desc: string;
        }[];
      };
    }>();

  const minimumLength =
    response.data.passwordPolicies.find(
      (policy) => policy.code === "MIN_CHAR_LEN",
    )?.value ?? "1";
  const minimumNumbers =
    response.data.passwordPolicies.find(
      (policy) => policy.code === "MIN_NUMBER",
    )?.value ?? "1";
  const minimumAlphabets =
    response.data.passwordPolicies.find(
      (policy) => policy.code === "MIN_CHAR_Cha_LEN",
    )?.value ?? "1";

  return {
    minimumLength: !isNaN(parseInt(minimumLength))
      ? parseInt(minimumLength)
      : 1,
    minimumNumbers: !isNaN(parseInt(minimumNumbers))
      ? parseInt(minimumNumbers)
      : 0,
    minimumAlphabets: !isNaN(parseInt(minimumAlphabets))
      ? parseInt(minimumNumbers)
      : 0,
  };
};

export const getShippingMethods = cache(
  () => shippingMethods(),
  ["shipping-methods"],
  {
    revalidate: DEFAULT_REVALIDATE,
  },
);

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const response = await api
    .get("rest/payment_methods", {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<
      {
        code: string;
        name: string;
        is_credit_card: boolean;
      }[]
    >();

  return response.map((method) => ({
    code: method.code,
    name: method.name,
    isCreditCard: method.is_credit_card,
  }));
};

export const getPlants = async (token: string) => {
  return await api
    .get("rest/plants", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<Plant[]>();
};

export const getOrderDetails = async (token: string, orderId: string) => {
  try {
    const response = await api
      .get("rest/order-history/detail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        searchParams: {
          orderNo: orderId,
        },
        cache: "no-store",
      })
      .json<{
        orderNo: string;
        orderType: string;
        status: string;
        email: string;
        orderDate: string;
        pickupDate: string;
        orderBy: string;
        firstName: string;
        lastName: string;
        soldTo: string;
        shipTo: string;
        po: string;
        jobName: string;
        handlingFee: number;
        deliveryInstruction: boolean;
        discount: number;
        subTotal: number;
        orderTotal: number;
        tax: number;
        promoCode: string;
        paymentMethod: string;
        lastCardDigits: string;
        driverNotes: string;
        completeDelivery: boolean;
        shipToAddress: {
          "xc-addressid": string;
          "country-name": string;
          county: string;
          locality: string;
          organization: string;
          "phone-number": string;
          region: string;
          "street-address": string;
          "postal-code": string;
          zip4: string;
          soldto: string;
        };
        billToAddress: {
          "xc-addressid": string;
          "country-name": string;
          county: string;
          locality: string;
          organization: string;
          "phone-number": string;
          region: string;
          "street-address": string;
          "postal-code": string;
          zip4: string;
          "ship-to": string;
          default: boolean;
        };
        item: {
          sku: string;
          productid: string;
          totalQuantity: string;
          lineItems: {
            itemNo: string;
            sku: string;
            productid: string;
            itemDescription: string;
            itemTotalQuantity: string;
            price: number;
            deliveryDate: string | null;
            plant: string;
            shippingCondition: string;
            delivery: string;
            invoice: string;
            itemPo: string;
            promoCode: string;
            shipQuantity: string;
            boQty: number;
            boDate: string | null;
            itemStatus: string;
            descChanged: boolean;
            sapNo: string;
            categoryId: string;
            brandId: string;
            categoryName: string;
            brandName: string;
            img: string;
            is_willcall: boolean;
          }[];
          itemSubTotal: number;
          promoCode: string;
          itemNo: string;
          sapNo: string;
          price: number;
          itemPo: string;
          itemDescription: string;
          descriptionChanged: boolean;
        }[];
      }>();

    const transformedData = {
      orderNo: response.orderNo,
      orderType: response.orderType,
      orderStatus: response.status,
      email: response.email,
      orderDate: response.orderDate ?? "",
      pickupDate: response.pickupDate ?? "",
      orderBy: response.orderBy,
      firstName: response.firstName,
      lastName: response.lastName,
      soldTo: response.soldTo,
      shipTo: response.shipTo,
      po: response.po,
      jobName: response.jobName,
      handlingFee: response.handlingFee,
      deliveryInstruction: response.deliveryInstruction,
      discount: response.discount,
      subTotal: response.subTotal,
      orderTotal: response.orderTotal,
      taxAmount: response.tax,
      promoCode: response.promoCode,
      paymentMethod: response.paymentMethod,
      lastCardDigits: response.lastCardDigits,
      driverNotes: response.driverNotes,
      completeDelivery: response.completeDelivery,
      shipToAddress: {
        attention: response.shipToAddress.organization,
        street: response.shipToAddress["street-address"],
        city: response.shipToAddress.locality,
        zip4: response.shipToAddress.zip4,
        zipCode: response.shipToAddress["postal-code"],
        country: response.shipToAddress["country-name"],
        county: response.shipToAddress.county,
        region: response.shipToAddress.region,
        phoneNumber: response.shipToAddress["phone-number"],
        soldTo: response.shipToAddress.soldto,
      },
      billToAddress: {
        attention: response.billToAddress.organization,
        street: response.billToAddress["street-address"],
        city: response.billToAddress.locality,
        zip4: response.billToAddress.zip4,
        zipCode: response.billToAddress["postal-code"],
        country: response.billToAddress["country-name"],
        county: response.billToAddress.county,
        region: response.billToAddress.region,
        phoneNumber: response.billToAddress["phone-number"],
        shipTo: response.billToAddress["ship-to"],
        default: response.billToAddress.default,
      },
      items: response?.item?.length
        ? response.item.map((item) => ({
            sku: item.sku,
            productId: Number(item.productid),
            totalQuantity: Number(item.totalQuantity),
            lineItems: item?.lineItems?.length
              ? item.lineItems.map((lineItem) => ({
                  itemNo: lineItem.itemNo,
                  sku: lineItem.sku,
                  productId: Number(lineItem.productid),
                  itemDescription: lineItem.itemDescription,
                  itemTotalQuantity: lineItem.itemTotalQuantity,
                  price: lineItem.price,
                  totalPrice:
                    lineItem.price * parseInt(lineItem.itemTotalQuantity),
                  deliveryDate: lineItem.deliveryDate ?? "",
                  plant: lineItem.plant,
                  shippingCondition: lineItem.shippingCondition,
                  delivery: lineItem.delivery,
                  invoice: lineItem.invoice,
                  itemPo: lineItem.itemPo,
                  promoCode: lineItem.promoCode,
                  shipQuantity: Number(lineItem.shipQuantity),
                  boQty: lineItem.boQty,
                  boDate: lineItem.boDate ?? "",
                  itemStatus: lineItem.itemStatus,
                  descChanged: lineItem.descChanged,
                  sapNo: lineItem.sapNo,
                  categoryId: lineItem.categoryId,
                  brandId: lineItem.brandId,
                  categoryName: lineItem.categoryName,
                  brandName: lineItem.brandName,
                  itemImage: lineItem.img,
                  isWillCall: lineItem.is_willcall,
                }))
              : [],
            itemSubTotal: item.itemSubTotal,
            promoCode: item.promoCode,
            itemNo: item.itemNo,
            sapNo: item.sapNo,
            price: item.price,
            itemPo: item.itemPo,
            itemDescription: item.itemDescription,
            descriptionChanged: item.descriptionChanged,
          }))
        : [],
    };

    return transformedData;
  } catch {
    return notFound();
  }
};

export const getCategoriesList = async () => {
  type Category = {
    id: string;
    name: string;
    slug: string;
    shortcode: string;
    item_count: string;
    direct_item_count: string;
    img: null | string;
    subcategory?: Category[];
  };

  const categories = await api
    .get("rest/getcategorylist/0", {
      searchParams: {
        membershipid: 1,
        level: 3,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<Category[]>();

  const transformCategory = (category: Category): TransformedCategory => {
    const {
      id,
      name,
      slug,
      shortcode,
      item_count,
      direct_item_count,
      img,
      subcategory,
    } = category;

    const transformSubcategory = (data: Category): TransformedCategory => ({
      id: Number(data.id),
      name: data.name,
      slug: data.slug,
      shortCode: data.shortcode,
      itemCount: Number(data.item_count),
      directItemCount: Number(data.direct_item_count),
      image: data.img,
      subCategory: data.subcategory
        ? data.subcategory.map(transformSubcategory)
        : [],
    });

    return {
      id: Number(id),
      name,
      slug,
      shortCode: shortcode,
      itemCount: Number(item_count),
      directItemCount: Number(direct_item_count),
      image: img,
      subCategory: subcategory ? subcategory.map(transformSubcategory) : [],
    };
  };

  return categories.map(transformCategory);
};

export const getCountries = async () => {
  return await api
    .get("rest/register/countries", {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<Country[]>();
};
