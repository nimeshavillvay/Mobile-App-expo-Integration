import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import type { GroupList } from "@/_lib/types";
import { getBoolean } from "@/_lib/utils";
import "server-only";
import type { FeaturedBrandGroup } from "./types";

export const getFeaturedBrand = async () => {
  const featuredBrand = await api
    .get("rest/getrandomgroups", {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<
      [
        {
          details: {
            name: string;
            descr: string;
            color: string;
            logo: string;
            background: string;
            link: string;
            link_name: string;
          };
        },
        {
          groups: GroupList[];
        },
      ]
    >();

  const details = {
    name: featuredBrand[0].details.name,
    descr: featuredBrand[0].details.descr,
    color: featuredBrand[0].details.color,
    logo: featuredBrand[0].details.logo,
    background: featuredBrand[0].details.background,
    link: featuredBrand[0].details.link,
    linkName: featuredBrand[0].details.link_name,
  };

  const groups = featuredBrand[1].groups.map(
    (group) =>
      ({
        groupId: Number(group.groupid),
        type: group.type,
        groupName: group.item_group_name,
        slug: group.slug,
        brandName: group.brandName,
        brandId: group.brandid,
        groupImage: group.group_img,
        complianceFlags: group.compliance_flags,
        fClassId: group.fclassid,
        metaTitle: group.txt_meta_title,
        itemSkuList: group.itemSkuList.map((item) => ({
          productId: item.productid,
          isExcludedProduct: item.is_product_exclude,
          productSku: item.txt_wurth_lac_item,
          productName: item.item_name,
          image: item.img,
          slug: item.slug,
          isComparison: !!item.is_comparison,
          skuAttribute: item["SKU-attribute"],
          isHazardous: getBoolean(item.txt_hazardous),
          productIdOnSap: item.txt_sap,
          mfrPartNo: item.txt_mfn,
          productDescription: item.txt_description_name,
          productSubDescription: item.txt_sub_description,
          brandCode: Number(item.sel_assigned_brand),
          unitOfMeasure: item.txt_uom_label,
          boxQuantity: Number(item.txt_box_qt) ?? 1,
          minimumOrderQuantity: Number(item.txt_min_order_amount) ?? 1,
          quantityByIncrements: Number(item.txt_box_qt) ?? 1,
          weight: Number(item.txt_weight_value),
          prop65MessageOne: item.txt_prop65_message_01,
          prop65MessageTwo: item.txt_prop65_message_02,
          prop65MessageThree: item.txt_prop65_message_03,
          listPrice: Number(item.list_price),
          isSaleItem: getBoolean(item.on_sale),
          isNewItem: getBoolean(item.is_new),
        })),
        variationsCount: group.variationsCount,
      }) satisfies FeaturedBrandGroup,
  );

  return {
    details,
    groups,
  };
};
