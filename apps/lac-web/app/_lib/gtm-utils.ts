import {
  GTM_ITEM_PAGE_TYPES,
  GTM_PAGE_TYPE_OTHER,
  GTM_PAGE_TYPES,
} from "./constants";

export const getGTMPageType = (pathName: string) => {
  const pageType = pathName.split("/");
  switch (pageType[1]) {
    case "category": {
      return GTM_PAGE_TYPES.CATEGORY;
    }
    case "search": {
      return GTM_PAGE_TYPES.SEARCH;
    }
    case "product": {
      return GTM_PAGE_TYPES.PRODUCT;
    }
    case "catalogs-literature":
    case "tax-form":
    case "about-us":
    case "careers":
    case "compliance":
    case "branch-main":
    case "branch-finder":
    case "faqs":
    case "government":
    case "privacy-policy":
    case "right-request":
    case "subscribe-thank-you":
    case "supply-chain":
    case "Terms-and-Conditions-for-WLACs-Purchase-of-Products-from-Suppliers":
    case "terms-of-sale": {
      return GTM_PAGE_TYPES.CONTENT;
    }
    case "sign-in": {
      return GTM_PAGE_TYPES.LOGIN;
    }
    case "": {
      return GTM_PAGE_TYPES.HOME;
    }
    default: {
      return GTM_PAGE_TYPE_OTHER;
    }
  }
};

export const getGTMItemListPage = (pathName: string) => {
  const pageType = pathName.split("/");
  switch (pageType[1]) {
    case "checkout": {
      return GTM_ITEM_PAGE_TYPES.CHECKOUT;
    }
    case "search": {
      return GTM_ITEM_PAGE_TYPES.SEARCH;
    }
    case "product": {
      return GTM_ITEM_PAGE_TYPES.RELATED_PRODUCT;
    }
    case "catalog": {
      return GTM_ITEM_PAGE_TYPES.CATALOG;
    }
    default: {
      return GTM_PAGE_TYPE_OTHER;
    }
  }
};
