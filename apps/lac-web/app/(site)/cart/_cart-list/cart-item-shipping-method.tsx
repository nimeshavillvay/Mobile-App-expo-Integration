import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useUpdateCartItemMutation from "@/_hooks/cart/use-update-cart-item-mutation.hook";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import {
  DEFAULT_PLANT,
  EMPTY_STRING,
  FALSE_STRING,
  IN_STOCK,
  LIMITED_STOCK,
  NOT_AVAILABLE,
  NOT_IN_STOCK,
  TRUE_STRING,
  UI_DATE_FORMAT,
} from "@/_lib/constants";
import type {
  CartItemConfiguration,
  Plant,
  ShippingMethod,
} from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendGTMEvent } from "@next/third-parties/google";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@repo/web-ui/components/ui/button";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/web-ui/components/ui/collapsible";
import { Label } from "@repo/web-ui/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@repo/web-ui/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";
import { toast } from "@repo/web-ui/components/ui/toast";
import dayjs from "dayjs";
import type { Dispatch, SetStateAction } from "react";
import { useId, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";
import { useCartItemQuantityContext } from "../cart-item-quantity-context";
import {
  ALTERNATIVE_BRANCHES,
  AVAILABLE_ALL,
  BACK_ORDER_ALL,
  DEFAULT_SHIPPING_METHOD,
  MAIN_OPTIONS,
  TAKE_ON_HAND,
  WILLCALL_SHIPING_METHOD,
  WILLCALL_TRANSFER_SHIPING_METHOD,
} from "../constants";
import type { Availability, WillCallAnywhere } from "../types";
import useUnSavedAlternativeQuantityState from "../use-cart-alternative-qty-method-store.hook";
import NotAvailableInfoBanner from "./cart-item-not-available-banner";
import CartItemShipFromAlternativeBranchRow from "./cart-item-ship-from-alternative-branch-row";
import CartItemWillCallTransfer from "./cart-item-will-call-transfer";
import {
  createCartItemConfig,
  findAvailabilityOptionForType,
  getAlternativeBranchesConfig,
  shipFromAltQtySchema,
} from "./helpers";
import PlantName from "./plant-name";
import type { MainOption, OptionPlant, WillCallOption } from "./types";
import useCheckAvailabilityMutation from "./use-check-availability-mutation.hook";

// Vendor Direct Shipping Method

type CartItemShippingMethodProps = {
  readonly plants: Plant[];
  readonly availability: Availability;
  readonly setSelectedWillCallPlant: (plant: string) => void;
  readonly selectedWillCallPlant: string;
  readonly setSelectedShippingOption: (option: MainOption | undefined) => void;
  readonly selectedShippingOption: MainOption | undefined;
  readonly setSelectedShippingMethod: (method: string) => void;
  readonly selectedShippingMethod: string;
  readonly onSave: (config: Partial<CartItemConfiguration>) => void;
  readonly defaultShippingMethod: ShippingMethod | undefined;
  readonly shippingMethods: ShippingMethod[];
  readonly setSelectedWillCallTransfer: (option: WillCallOption) => void;
  readonly selectedWillCallTransfer: WillCallOption;
  readonly isDirectlyShippedFromVendor: boolean;
  readonly handleSelectWillCallPlant: (plant: string) => void;
  readonly willCallPlant: {
    plantCode: string;
    plantName: string;
    willCallMethod: string;
    pickupPlant: string;
  };
  readonly setSelectedBackorderShippingMethod: (method: string) => void;
  readonly selectedBackorderShippingMethod: string;
  readonly token: string;
  readonly increment: number;
  readonly uom: string;
  readonly cartItemId: number;
  readonly configuration: CartItemConfiguration;
  readonly setPreventUpdateCart: Dispatch<SetStateAction<boolean>>;
  readonly sku: string;
  readonly setOsrCartItemTotal: Dispatch<SetStateAction<number>>;
  readonly price: number;
};

const CartItemShippingMethod = ({
  plants,
  availability,
  setSelectedWillCallPlant,
  selectedWillCallPlant,
  setSelectedShippingOption,
  selectedShippingOption,
  setSelectedWillCallTransfer,
  selectedWillCallTransfer,
  setSelectedShippingMethod,
  selectedShippingMethod,
  onSave,
  defaultShippingMethod,
  shippingMethods,
  isDirectlyShippedFromVendor,
  handleSelectWillCallPlant,
  willCallPlant,
  setSelectedBackorderShippingMethod,
  selectedBackorderShippingMethod,
  token,
  increment,
  uom,
  cartItemId,
  configuration,
  sku,
  setPreventUpdateCart,
  setOsrCartItemTotal,
  price,
}: CartItemShippingMethodProps) => {
  const id = useId();
  const shipToMeId = `${MAIN_OPTIONS.SHIP_TO_ME}-${id}`;
  const shipToMeAltId = `${MAIN_OPTIONS.SHIP_TO_ME_ALT}-${id}`;
  const willCallId = `${MAIN_OPTIONS.WILL_CALL}-${id}`;

  const { lineQuantity, setLineQuantity } = useCartItemQuantityContext();
  const skus = useUnSavedAlternativeQuantityState((state) => state.sku);
  const { pushSku, popSku } = useUnSavedAlternativeQuantityState(
    (state) => state.actions,
  );

  const {
    options: availabilityOptions,
    status,
    willCallAnywhere,
  } = availability;

  const availableAll = findAvailabilityOptionForType(
    availabilityOptions,
    AVAILABLE_ALL,
  );
  const takeOnHand = findAvailabilityOptionForType(
    availabilityOptions,
    TAKE_ON_HAND,
  );
  const backOrderAll = findAvailabilityOptionForType(
    availabilityOptions,
    BACK_ORDER_ALL,
  );
  const shipAlternativeBranch = findAvailabilityOptionForType(
    availabilityOptions,
    ALTERNATIVE_BRANCHES,
  );

  const updateCartConfigMutation = useUpdateCartItemMutation();
  const checkAvailabilityMutation = useCheckAvailabilityMutation();

  const cartQuery = useSuspenseCart(token);

  const qtyChangeTimeoutRef = useRef<NodeJS.Timeout>();

  const gtmProducts = cartQuery.data.cartItems.map((item) => {
    return {
      productid: item.itemInfo.productId,
      cartid: item.cartItemId,
      quantity: item.quantity,
    };
  });

  const gtmItemInfoQuery = useGtmProducts(
    gtmProducts.length > 0 ? gtmProducts : [],
  );
  const gtmItemsInfo = gtmItemInfoQuery.data;

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  const sendToGTMShippingMethodChanged = (method: string) => {
    if (gtmItemsInfo !== null && gtmItemsInfo !== undefined) {
      gtmItemsInfo?.forEach((gtmItemInfo) => {
        sendGTMEvent({
          event: "apply_shipping",
          applyShippingData: {
            currency: "USD",
            value: gtmItemInfo?.price,
            items: [
              {
                item_id: gtmItemInfo?.item_id,
                item_sku: gtmItemInfo?.item_sku,
                item_name: gtmItemInfo?.item_name,
                item_brand: gtmItemInfo?.item_brand,
                price: gtmItemInfo?.price,
                shipping: method,
                quantity: gtmProducts.find(
                  (item) => item.productid === Number(gtmItemInfo?.productid),
                )?.quantity,
              },
            ],
          },
          data: {
            userid: gtmUser?.userid,
            account_type: gtmUser?.account_type,
            account_industry: gtmUser?.account_industry,
            account_sales_category: gtmUser?.account_sales_category,
          },
        });
      });
    }
  };

  const isVendorShipped = isDirectlyShippedFromVendor === true;

  const isSameDayShippingEnabled = !!availableAll?.plants?.find(
    (value) => value?.isSameDayAvail,
  )?.isSameDayAvail;

  // Ship to me logics
  const isShipToMeEnabled = status === IN_STOCK || status === LIMITED_STOCK;

  let availableAllPlant: OptionPlant | undefined = undefined;
  let takeOnHandPlant: OptionPlant | undefined = undefined;

  if (availableAll) {
    // Find available plant details within plants object
    availableAllPlant = Object.values(availableAll?.plants)?.at(0) ?? undefined;
  }

  if (takeOnHand) {
    // Find take on hand plant details within plants object
    takeOnHandPlant = Object.values(takeOnHand?.plants)?.at(0) ?? undefined;
  }

  const homeBranchAvailability = availability.availableLocations?.find(
    ({ location }) => location === willCallPlant?.plantCode,
  );

  const homeBranchAvailableQuantity = homeBranchAvailability?.amount ?? 0;

  const homePlant = willCallPlant.plantCode ?? DEFAULT_PLANT.code;

  const boPlant = availability.backorderLocation;

  const getHomePlantDisplayQuantity = (plantAvailableQuantity: number) => {
    const totalAvailableQty =
      shipAlternativeBranch?.plants.reduce((sum, current) => {
        return sum + Number(current.quantity);
      }, 0) ?? 0;

    return Number(lineQuantity) > totalAvailableQty
      ? plantAvailableQuantity + Number(lineQuantity) - totalAvailableQty
      : plantAvailableQuantity;
  };

  const cartItem = cartQuery.data.cartItems.filter(
    (item) => item.cartItemId === cartItemId,
  );

  const getPlantQuantity = (plant: string, quantity = 0, index: number) => {
    const avail_1 = cartItem[0]?.configuration.avail_1;
    const avail_2 = cartItem[0]?.configuration.avail_2;
    const avail_3 = cartItem[0]?.configuration.avail_3;
    const avail_4 = cartItem[0]?.configuration.avail_4;
    const avail_5 = cartItem[0]?.configuration.avail_5;

    const boQuantity = cartItem[0]?.configuration.backorder_quantity;
    const homePlantQty = Number(avail_1) + Number(boQuantity);

    if (plant === boPlant) {
      return selectedShippingOption === undefined ||
        selectedShippingOption === MAIN_OPTIONS.SHIP_TO_ME_ALT
        ? homePlantQty
        : getHomePlantDisplayQuantity(quantity);
    } else if (
      homePlantQty !== cartItem[0]?.quantity &&
      cartItem[0]?.configuration.plant_1 === homePlant
    ) {
      if (plant === homePlant) {
        return homePlantQty;
      } else {
        switch (`avail_${index}`) {
          case "avail_1": {
            return Number(avail_1);
          }
          case "avail_2": {
            return Number(avail_2);
          }
          case "avail_3": {
            return Number(avail_3);
          }
          case "avail_4": {
            return Number(avail_4);
          }
          case "avail_5": {
            return Number(avail_5);
          }
        }
      }
    } else {
      if (plant !== homePlant) {
        switch (`avail_${index}`) {
          case "avail_1": {
            return avail_1 ? Number(avail_1) : Number(quantity);
          }
          case "avail_2": {
            return avail_2 ? Number(avail_2) : Number(quantity);
          }
          case "avail_3": {
            return avail_3 ? Number(avail_3) : Number(quantity);
          }
          case "avail_4": {
            return avail_4 ? Number(avail_4) : Number(quantity);
          }
          case "avail_5": {
            return avail_5 ? Number(avail_5) : Number(quantity);
          }
        }
      } else {
        return getHomePlantDisplayQuantity(homeBranchAvailableQuantity);
      }
    }
  };

  const getPlantShippingMethodFromCart = (index: number) => {
    const shipping_method_1 = cartItem[0]?.configuration.shipping_method_1;
    const shipping_method_2 = cartItem[0]?.configuration.shipping_method_2;
    const shipping_method_3 = cartItem[0]?.configuration.shipping_method_3;
    const shipping_method_4 = cartItem[0]?.configuration.shipping_method_4;
    const shipping_method_5 = cartItem[0]?.configuration.shipping_method_5;
    const backorder_all = cartItem[0]?.configuration.backorder_all;

    if (backorder_all === TRUE_STRING) {
      return shipping_method_1;
    }
    switch (`shipping_method_${index}`) {
      case "shipping_method_1": {
        return shipping_method_1;
      }
      case "shipping_method_2": {
        return shipping_method_2;
      }
      case "shipping_method_3": {
        return shipping_method_3;
      }
      case "shipping_method_4": {
        return shipping_method_4;
      }
      case "shipping_method_5": {
        return shipping_method_5;
      }
      default:
        return "";
    }
  };

  const getPlantShippingMethod = (
    index: number,
    shippingMethods: ShippingMethod[],
  ) => {
    const shippingMethod = getPlantShippingMethodFromCart(index);

    return shippingMethod !== "" &&
      shippingMethods.some((method) => method.code === shippingMethod)
      ? shippingMethod
      : shippingMethods.length > 0
        ? shippingMethods[0]?.code
        : DEFAULT_SHIPPING_METHOD;
  };

  const getDefaultFormValues = () => {
    return {
      quantityAlt:
        shipAlternativeBranch?.plants.map((plant) =>
          getPlantQuantity(plant.plant, plant.quantity, plant.index),
        ) ?? [],

      shippingMethod:
        shipAlternativeBranch?.plants.map((plant) =>
          getPlantShippingMethod(plant.index, plant.shippingMethods),
        ) ?? [],
    };
  };
  const schema = shipFromAltQtySchema(increment);
  type ShipFromAltQtySchema = z.infer<typeof schema>;

  const form = useForm<ShipFromAltQtySchema>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultFormValues(),
  });

  const formId = `alternative-${cartItemId}`;

  const shipToMeShippingMethods =
    shippingMethods?.length > 0
      ? shippingMethods
      : availableAll?.plants[0] !== undefined &&
          availableAll?.plants[0]?.shippingMethods.length > 0
        ? availableAll?.plants[0]?.shippingMethods
        : backOrderAll?.plants[0] !== undefined &&
            backOrderAll?.plants[0]?.shippingMethods.length > 0
          ? backOrderAll?.plants[0]?.shippingMethods
          : [];

  const getFirstBackOrderDateFromPlants = (
    plants: {
      backOrderDate?: string;
    }[],
  ) => {
    return plants?.at(0)?.backOrderDate;
  };

  const getFirstPlantFromPlants = (
    plants: {
      plant: string;
    }[],
  ) => {
    return plants?.at(0)?.plant ?? DEFAULT_PLANT.code;
  };

  const handleDeliveryOptionSelect = ({
    checked,
    selectedOption,
  }: {
    checked: boolean;
    selectedOption: MainOption;
  }) => {
    if (checked) {
      form.reset(getDefaultFormValues());
      const isWillCallOptionSelected =
        selectedOption === MAIN_OPTIONS.WILL_CALL;
      const isWillCallAnywhere =
        willCallAnywhere !== undefined && willCallAnywhere !== null;

      // Ship to me configs
      if (selectedOption === MAIN_OPTIONS.SHIP_TO_ME) {
        handleShipToMeOptions();

        if (availableAll) {
          const setShippingMethod =
            availableAllPlant?.shippingMethods?.find(
              (method) => method.code === selectedShippingMethod,
            )?.code ??
            availableAllPlant?.shippingMethods?.at(0)?.code ??
            selectedShippingMethod;
          setSelectedShippingMethod(setShippingMethod);
          onSave({
            ...createCartItemConfig({
              method: setShippingMethod,
              quantity: availableAllPlant?.quantity ?? 0,
              plant: availableAllPlant?.plant ?? EMPTY_STRING,
              hash: availableAll.hash,
              backOrderAll: false,
            }),
            will_call_avail: EMPTY_STRING,
            will_call_shipping: EMPTY_STRING,
            will_call_plant: EMPTY_STRING,
            will_call_not_in_stock: FALSE_STRING,
          });

          sendToGTMShippingMethodChanged(setShippingMethod);
        } else if (takeOnHand) {
          const setShippingMethod =
            takeOnHandPlant?.shippingMethods?.find(
              (method) => method.code === selectedShippingMethod,
            )?.code ??
            takeOnHandPlant?.shippingMethods?.at(0)?.code ??
            selectedShippingMethod;
          setSelectedShippingMethod(setShippingMethod);
          onSave({
            ...createCartItemConfig({
              method: setShippingMethod,
              quantity: takeOnHandPlant?.quantity ?? 0,
              plant: takeOnHandPlant?.plant ?? EMPTY_STRING,
              hash: takeOnHand.hash,
              backOrderDate: takeOnHandPlant?.backOrderDate,
              backOrderQuantity: takeOnHandPlant?.backOrderQuantity,
            }),
            will_call_avail: EMPTY_STRING,
            will_call_shipping: EMPTY_STRING,
            will_call_plant: EMPTY_STRING,
            will_call_not_in_stock: FALSE_STRING,
          });

          sendToGTMShippingMethodChanged(setShippingMethod);
        }

        // Back order all can have only this config
        else if (backOrderAll) {
          const setShippingMethod =
            backOrderAll.plants
              ?.at(0)
              ?.shippingMethods?.find(
                (method) => method.code === selectedBackorderShippingMethod,
              )?.code ??
            backOrderAll.plants?.at(0)?.shippingMethods?.at(0)?.code ??
            selectedBackorderShippingMethod;
          setSelectedBackorderShippingMethod(setShippingMethod);
          onSave({
            ...createCartItemConfig({
              method: setShippingMethod,
              quantity: 0,
              plant: getFirstPlantFromPlants(backOrderAll?.plants),
              hash: backOrderAll.hash,
              backOrderAll: true,
              backOrderDate: backOrderAll.plants[0]?.backOrderDate ?? "",
              backOrderQuantity: backOrderAll.plants[0]?.backOrderQuantity ?? 0,
            }),
            will_call_avail: EMPTY_STRING,
            will_call_shipping: EMPTY_STRING,
            will_call_plant: EMPTY_STRING,
            will_call_not_in_stock: FALSE_STRING,
          });

          sendToGTMShippingMethodChanged(setShippingMethod);
        }
      }

      // Ship to me configs
      if (selectedOption === MAIN_OPTIONS.SHIP_TO_ME_ALT) {
        handleShipToMeFromAlternativeOptions();
      }
      if (
        isWillCallOptionSelected &&
        isWillCallAnywhere &&
        willCallAnywhere[0]
      ) {
        const willCall =
          willCallPlant.willCallMethod === WILLCALL_SHIPING_METHOD
            ? MAIN_OPTIONS.WILL_CALL
            : MAIN_OPTIONS.WILL_CALL_TRANSFER;
        setSelectedWillCallTransfer(willCall);
        const willCallIndex =
          willCallPlant.willCallMethod === WILLCALL_TRANSFER_SHIPING_METHOD &&
          willCallAnywhere[1] &&
          willCallAnywhere[1].isTransfer
            ? 1
            : 0;
        processWillCallAnywhereItem(
          willCallAnywhere[willCallIndex] ?? willCallAnywhere[0],
        );
      }
    }
  };

  const processWillCallAnywhereItem = (item: WillCallAnywhere) => {
    setSelectedShippingOption(MAIN_OPTIONS.WILL_CALL);
    setSelectedWillCallPlant(willCallPlant.pickupPlant);
    const isNotInStock = item && item.status === NOT_IN_STOCK;
    if (item && !isNotInStock) {
      onSave({
        ...createCartItemConfig({
          method: DEFAULT_SHIPPING_METHOD,
          quantity: item?.willCallQuantity,
          plant: item?.willCallPlant,
          hash: item.hash,
          backOrderDate: item?.backOrderDate_1,
          backOrderQuantity: item?.backOrderQuantity_1,
          shippingMethod: item.shippingMethod,
        }),
        will_call_avail: (item?.status === NOT_IN_STOCK
          ? 0
          : item?.willCallQuantity ?? 0
        ).toString(),
        will_call_plant: item?.willCallPlant ?? EMPTY_STRING,
        will_call_not_in_stock:
          item?.status === NOT_AVAILABLE ? TRUE_STRING : FALSE_STRING,
      });
    }

    sendToGTMShippingMethodChanged(DEFAULT_SHIPPING_METHOD);
    // Will call pickup configs and all are backorder
    if (item && isNotInStock) {
      onSave({
        ...createCartItemConfig({
          method: DEFAULT_SHIPPING_METHOD,
          quantity: 0,
          plant: item.willCallPlant,
          hash: item.hash,
          backOrderAll: true,
          backOrderDate: item?.willCallBackOrder,
          backOrderQuantity: item?.willCallQuantity,
          shippingMethod: item.shippingMethod,
        }),
        will_call_plant: item?.willCallPlant ?? EMPTY_STRING,
        will_call_not_in_stock:
          item?.status === NOT_AVAILABLE ? TRUE_STRING : FALSE_STRING,
      });

      sendToGTMShippingMethodChanged(DEFAULT_SHIPPING_METHOD);
    }
  };

  const handleWillCallOptions = (willCallOption: string) => {
    if (
      willCallOption === MAIN_OPTIONS.WILL_CALL &&
      willCallAnywhere &&
      willCallAnywhere[0]
    ) {
      setSelectedShippingOption(MAIN_OPTIONS.WILL_CALL);
      setSelectedWillCallTransfer(MAIN_OPTIONS.WILL_CALL);
      processWillCallAnywhereItem(willCallAnywhere[0]);
    }
    if (
      willCallOption === MAIN_OPTIONS.WILL_CALL_TRANSFER &&
      willCallAnywhere &&
      willCallAnywhere[1]
    ) {
      setSelectedShippingOption(MAIN_OPTIONS.WILL_CALL);
      setSelectedWillCallTransfer(MAIN_OPTIONS.WILL_CALL_TRANSFER);
      processWillCallAnywhereItem(willCallAnywhere[1]);
    }
  };

  const handleShipToMeMethod = (shippingMethod: string) => {
    setSelectedShippingMethod(shippingMethod);
    sendToGTMShippingMethodChanged(shippingMethod);

    if (shippingMethod) {
      if (availableAll) {
        onSave(
          createCartItemConfig({
            method: shippingMethod,
            quantity: availableAllPlant?.quantity ?? 0,
            plant: availableAllPlant?.plant ?? EMPTY_STRING,
            hash: availableAll?.hash ?? "",
            backOrderAll: false,
          }),
        );
      } else if (takeOnHand) {
        onSave(
          createCartItemConfig({
            method: shippingMethod,
            quantity: takeOnHandPlant?.quantity ?? 0,
            plant: takeOnHandPlant?.plant ?? EMPTY_STRING,
            hash: takeOnHand?.hash ?? "",
            backOrderDate: takeOnHandPlant?.backOrderDate,
            backOrderQuantity: takeOnHandPlant?.backOrderQuantity,
          }),
        );
      }
    }
  };

  const handleShipToMeOptions = () => {
    // Reset the selected shipping method to default
    setSelectedShippingOption(MAIN_OPTIONS.SHIP_TO_ME);
    if (defaultShippingMethod) {
      setSelectedShippingMethod(defaultShippingMethod.code);
      sendToGTMShippingMethodChanged(defaultShippingMethod.code);

      if (takeOnHand) {
        const setShippingMethod =
          takeOnHandPlant?.shippingMethods?.find(
            (method) => method.code === selectedShippingMethod,
          )?.code ??
          takeOnHandPlant?.shippingMethods?.[0]?.code ??
          selectedShippingMethod;
        setSelectedShippingMethod(setShippingMethod);
        onSave({
          ...createCartItemConfig({
            method: setShippingMethod,
            quantity: takeOnHandPlant?.quantity ?? 0,
            plant: takeOnHandPlant?.plant ?? EMPTY_STRING,
            hash: takeOnHand.hash,
            backOrderDate: takeOnHandPlant?.backOrderDate,
            backOrderQuantity: takeOnHandPlant?.backOrderQuantity,
          }),
          will_call_not_in_stock: FALSE_STRING,
        });

        sendToGTMShippingMethodChanged(setShippingMethod);
      }
    }
  };

  const handleShipToMeFromAlternativeOptions = () => {
    if (shipAlternativeBranch) {
      const setShippingMethod =
        shipAlternativeBranch.plants
          ?.at(0)
          ?.shippingMethods?.find(
            (method) => method.code === selectedShippingMethod,
          )?.code ??
        shipAlternativeBranch.plants?.at(0)?.shippingMethods?.at(0)?.code ??
        selectedShippingMethod;
      setSelectedShippingMethod(setShippingMethod);
      const homePlant = willCallPlant.plantCode ?? DEFAULT_PLANT.code;

      onSave({
        ...getAlternativeBranchesConfig({
          plants: shipAlternativeBranch.plants,
          method: setShippingMethod,
          hash: shipAlternativeBranch.hash,
          backOrderDate: shipAlternativeBranch.backOrder
            ? shipAlternativeBranch?.plants?.[0]?.backOrderDate
            : "",
          backOrderQuantity: shipAlternativeBranch.backOrder
            ? shipAlternativeBranch?.plants?.[0]?.backOrderQuantity
            : 0,
          homePlant: homePlant,
        }),
        will_call_not_in_stock: FALSE_STRING,
      });
      sendToGTMShippingMethodChanged(setShippingMethod);
    }
    // Reset the selected shipping method to default
    if (defaultShippingMethod) {
      setSelectedShippingMethod(defaultShippingMethod.code);
      sendToGTMShippingMethodChanged(defaultShippingMethod.code);

      if (shipAlternativeBranch) {
        onSave({
          ...getAlternativeBranchesConfig({
            plants: shipAlternativeBranch?.plants,
            method: defaultShippingMethod.code,
            hash: shipAlternativeBranch.hash,
            backOrderDate: shipAlternativeBranch.backOrder
              ? shipAlternativeBranch?.plants?.[0]?.backOrderDate
              : "",
            backOrderQuantity: shipAlternativeBranch.backOrder
              ? shipAlternativeBranch?.plants?.[0]?.backOrderQuantity
              : 0,
            homePlant: willCallPlant.plantCode ?? DEFAULT_PLANT.code,
          }),
          will_call_not_in_stock: FALSE_STRING,
        });
      }
    }
  };

  const getQuantity = (plant: string, qty: number) => {
    if (plant === homePlant) {
      if (qty > homeBranchAvailableQuantity) {
        return homeBranchAvailableQuantity;
      } else {
        return qty;
      }
    } else {
      return qty;
    }
  };

  const onSubmit = form.handleSubmit(async (formData) => {
    clearTimeout(qtyChangeTimeoutRef.current);
    popSku([sku]);

    const altQtySum = formData.quantityAlt.reduce((collector, num) => {
      return (collector += Number(num));
    }, 0);

    qtyChangeTimeoutRef.current = setTimeout(() => {
      checkAvailabilityMutation.mutate(
        {
          productId: availability.productId,
          qty: altQtySum,
        },
        {
          onSuccess: ({ options, backorderDate }) => {
            if (options.length > 0) {
              const shipAlternativeBranch = findAvailabilityOptionForType(
                options,
                ALTERNATIVE_BRANCHES,
              );
              const availableAll = findAvailabilityOptionForType(
                options,
                AVAILABLE_ALL,
              );

              if (availableAll) {
                setLineQuantity(altQtySum.toString());
                const setShippingMethod =
                  availableAll.plants
                    ?.at(0)
                    ?.shippingMethods?.find(
                      (method) => method.code === selectedShippingMethod,
                    )?.code ??
                  availableAll.plants?.at(0)?.shippingMethods?.at(0)?.code ??
                  selectedShippingMethod;
                setSelectedShippingMethod(setShippingMethod);
                onSave({
                  ...createCartItemConfig({
                    method: setShippingMethod,
                    quantity: availableAll.plants?.at(0)?.quantity ?? 0,
                    plant: availableAll.plants?.at(0)?.plant ?? EMPTY_STRING,
                    hash: availableAll.hash,
                  }),
                  will_call_not_in_stock: FALSE_STRING,
                });
              } else if (shipAlternativeBranch) {
                setLineQuantity(altQtySum.toString());
                setSelectedShippingOption(MAIN_OPTIONS.SHIP_TO_ME_ALT);

                const SelectedPlants = shipAlternativeBranch.plants.map(
                  (plant, index) => ({
                    index: plant.index,
                    quantity: getQuantity(
                      plant.plant,
                      Number(formData.quantityAlt[index]),
                    ),
                    method: formData.shippingMethod[index],
                    plant: plant.plant,
                  }),
                );

                const allPlants = [...SelectedPlants];

                if (SelectedPlants.length < 5) {
                  for (let i = 5; i > SelectedPlants.length; i--) {
                    allPlants.push({
                      index: i,
                      quantity: 0,
                      method: "",
                      plant: "",
                    });
                  }
                }
                setPreventUpdateCart(true);

                const config = {
                  ...getAlternativeBranchesConfig({
                    plants: allPlants,
                    method: selectedShippingMethod,
                    hash: shipAlternativeBranch.hash,
                    backOrderDate: backorderDate ?? "",
                    backOrderQuantity: calculateDefaultAltBO(
                      allPlants[0]?.plant ?? "",
                      Number(formData.quantityAlt[0]),
                    ),
                    homePlant: homePlant,
                  }),
                  will_call_not_in_stock: FALSE_STRING,
                };
                if (altQtySum > 0) {
                  setPreventUpdateCart(true);
                  updateCartConfigMutation.mutate(
                    [
                      {
                        cartItemId: cartItemId,
                        quantity: altQtySum,
                        config: {
                          ...configuration,
                          ...config,
                        },
                      },
                    ],
                    {
                      onSettled: () => {
                        const getQuantity = (
                          plant: string,
                          quantity: number,
                        ) => {
                          return plant === homePlant
                            ? quantity +
                                calculateDefaultAltBO(
                                  homePlant,
                                  Number(formData.quantityAlt[0]),
                                )
                            : quantity;
                        };
                        form.reset({
                          quantityAlt:
                            SelectedPlants.map((plant) =>
                              getQuantity(plant.plant, plant.quantity) === 0
                                ? 0
                                : getQuantity(plant.plant, plant.quantity),
                            ) ?? [],

                          shippingMethod:
                            SelectedPlants.map(
                              (plant) => plant.method ?? DEFAULT_PLANT.code,
                            ) ?? [],
                        });

                        toast({
                          description: "Successfully updated cart",
                        });
                      },
                    },
                  );
                }
              }
            }
          },
          onError: () => {
            pushSku(sku);
          },
          onSettled: () => {
            setOsrCartItemTotal(Number(altQtySum) * price);
          },
        },
      );
    }, 500);
  });

  const onFormChange = () => {
    const isDirty = form.formState.isDirty;
    if (isDirty) {
      if (!skus.includes(sku)) {
        pushSku(sku);
      }
    } else {
      if (skus.includes(sku)) {
        popSku([sku]);
      }
    }
  };

  const calculateDefaultAltBO = (plant: string, plantQty: number) => {
    return plant === homePlant && plantQty > homeBranchAvailableQuantity
      ? plantQty - homeBranchAvailableQuantity
      : 0;
  };

  if (isVendorShipped) {
    const date = backOrderAll?.plants
      ? getFirstBackOrderDateFromPlants(backOrderAll?.plants)
      : "N/A";

    return (
      <ul className="flex flex-col gap-3">
        <li>
          <div className="flex flex-col gap-1 rounded-xl bg-yellow-50 px-4 py-2 text-sm">
            <div>Drop Ship Item</div>
            <div className="text-xs text-wurth-gray-500">
              This item ships directly from the vendor. Additional freight
              charges may apply. Expected shipping date:{" "}
              {date !== "" ? dayjs(date).format(UI_DATE_FORMAT) : "N/A"}.
            </div>
          </div>
        </li>
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {(isShipToMeEnabled || !!backOrderAll) && (
        <li className="flex flex-col items-stretch">
          <div className="flex flex-row items-center gap-3">
            <Checkbox
              id={shipToMeId}
              className="size-5 rounded-full"
              iconClassName="size-4"
              checked={selectedShippingOption === MAIN_OPTIONS.SHIP_TO_ME}
              onCheckedChange={(checked) =>
                handleDeliveryOptionSelect({
                  checked: checked === true,
                  selectedOption: MAIN_OPTIONS.SHIP_TO_ME,
                })
              }
            />

            <Label htmlFor={shipToMeId} className="text-base">
              Availability at{" "}
              <PlantName
                plants={plants}
                plantCode={willCallPlant.plantCode ?? DEFAULT_PLANT.code}
              />
            </Label>
          </div>

          <div className="ml-[1.625rem] flex flex-col gap-2">
            <div className="pl-1.5 text-sm font-medium">
              {Number(lineQuantity) <= homeBranchAvailableQuantity && (
                <ItemInStockCountBadge
                  availableCount={homeBranchAvailableQuantity}
                />
              )}
              {Number(lineQuantity) > homeBranchAvailableQuantity && (
                <>
                  <ItemLimitedStockOrBoCountBadge
                    availableCount={homeBranchAvailableQuantity}
                    showOutOfStock={
                      homePlant === availability.backorderLocation
                    }
                  />
                  <BackOrderItemCountLabel
                    count={Number(lineQuantity) - homeBranchAvailableQuantity}
                    showOutOfStock={
                      homePlant === availability.backorderLocation
                    }
                    plant={
                      plants.find(
                        (plant) =>
                          plant.code === availability.backorderLocation,
                      )?.name
                    }
                  />
                </>
              )}
            </div>
            {shipToMeShippingMethods.length > 0 && (
              <Select
                disabled={
                  selectedShippingOption !== MAIN_OPTIONS.SHIP_TO_ME ||
                  shipToMeShippingMethods?.length === 1
                }
                value={selectedShippingMethod}
                onValueChange={(method) => handleShipToMeMethod(method)}
              >
                <SelectTrigger className="avail-change-button w-full">
                  <SelectValue placeholder="Select a delivery method" />
                </SelectTrigger>

                <SelectContent>
                  {shipToMeShippingMethods.map((option) => (
                    <SelectItem key={option.code} value={option.code}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {isSameDayShippingEnabled && (
              <div className="text-sm">
                Get it by <b>today</b> if you order before noon
              </div>
            )}
          </div>
        </li>
      )}

      {/* Ship from alternative branches option */}
      {shipAlternativeBranch && shipAlternativeBranch.plants?.length > 0 && (
        <>
          <div className="flex flex-col gap-2 px-2 py-2 text-sm">
            <div className="flex flex-col gap-0.5">
              <Collapsible
                className="mt-1.5 flex flex-col gap-1"
                disabled={!backOrderAll}
                open={selectedShippingOption === MAIN_OPTIONS.SHIP_TO_ME_ALT}
              >
                <CollapsibleTrigger
                  className="group flex h-7 cursor-default flex-row items-center justify-start"
                  id={shipToMeAltId}
                  onClick={() => {
                    handleDeliveryOptionSelect({
                      checked: true,
                      selectedOption: MAIN_OPTIONS.SHIP_TO_ME_ALT,
                    });
                  }}
                >
                  <span
                    className={cn(
                      selectedShippingOption === MAIN_OPTIONS.SHIP_TO_ME_ALT
                        ? "size-[1.12rem] bg-wurth-gray-800 text-wurth-gray-50"
                        : "flex size-5 shrink-0 items-center justify-center rounded-sm border text-current",
                      "mr-2 cursor-pointer rounded-full",
                    )}
                  >
                    {selectedShippingOption === MAIN_OPTIONS.SHIP_TO_ME_ALT && (
                      <CheckIcon className={"size-4"} />
                    )}
                  </span>

                  <span className="text-base font-medium text-wurth-gray-800">
                    Ship from Alternate Branch(es)
                  </span>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <FormProvider {...form}>
                    <form
                      onChange={onFormChange}
                      onSubmit={onSubmit}
                      id={formId}
                    >
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-light">
                              Location
                            </TableHead>
                            <TableHead className="text-end font-light">
                              Items
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="font-light">
                          {shipAlternativeBranch.plants &&
                            Object.values(shipAlternativeBranch.plants)?.map(
                              (plant, quantityFieldIndex) => (
                                <CartItemShipFromAlternativeBranchRow
                                  plant={plant}
                                  plants={plants}
                                  quantityFieldIndex={quantityFieldIndex}
                                  key={quantityFieldIndex}
                                  boPlant={boPlant}
                                  availability={availability}
                                  availableQuantityInPlant={plant.quantity ?? 0}
                                  increment={increment}
                                  uom={uom}
                                  sku={sku}
                                  cartItemId={cartItemId}
                                />
                              ),
                            )}

                          <TableRow className="border-y-0 hover:bg-transparent">
                            <TableCell colSpan={2}>
                              <Button
                                variant="default"
                                type="submit"
                                className="float-right justify-end"
                                disabled={
                                  !form.formState.isDirty ||
                                  updateCartConfigMutation.isPending ||
                                  !skus.includes(sku)
                                }
                              >
                                Apply
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </form>
                  </FormProvider>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
          {selectedShippingOption === MAIN_OPTIONS.SHIP_TO_ME_ALT && (
            <ShipToMeBOInfoBanner option={shipAlternativeBranch} />
          )}
        </>
      )}

      <li className="flex flex-col items-stretch gap-2">
        <div className="flex flex-row items-center gap-3">
          <Checkbox
            id={willCallId}
            className="size-5 rounded-full"
            iconClassName="size-4"
            checked={selectedShippingOption === MAIN_OPTIONS.WILL_CALL}
            onCheckedChange={(checked) =>
              handleDeliveryOptionSelect({
                checked: checked === true,
                selectedOption: MAIN_OPTIONS.WILL_CALL,
              })
            }
            disabled={false}
          />

          <Label htmlFor={willCallId} className="text-base">
            Store pick up (Will call)
          </Label>
        </div>

        {selectedShippingOption === MAIN_OPTIONS.WILL_CALL && (
          <div className="ml-[1.625rem] flex flex-col gap-2">
            <Select
              disabled={selectedShippingOption !== MAIN_OPTIONS.WILL_CALL}
              value={selectedWillCallPlant}
              onValueChange={(plant) => {
                if (willCallAnywhere && willCallAnywhere[0]) {
                  handleSelectWillCallPlant(plant);
                }
                setSelectedWillCallPlant(plant);
                setSelectedWillCallTransfer(
                  willCallPlant.willCallMethod !== WILLCALL_SHIPING_METHOD &&
                    willCallAnywhere[1]?.isTransfer
                    ? MAIN_OPTIONS.WILL_CALL_TRANSFER
                    : MAIN_OPTIONS.WILL_CALL,
                );
                setSelectedShippingOption(MAIN_OPTIONS.WILL_CALL);
              }}
            >
              <SelectTrigger className="avail-change-button w-full">
                <SelectValue placeholder="Select a store" />
              </SelectTrigger>

              <SelectContent>
                {plants?.length > 0 &&
                  plants.map((option) => (
                    <SelectItem key={option.code} value={option.code}>
                      {option.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {willCallAnywhere && willCallAnywhere[0] && (
              <div className="flex flex-col gap-1">
                {willCallAnywhere[0].status === IN_STOCK && (
                  <RadioGroup
                    value={selectedWillCallTransfer}
                    onValueChange={(value) =>
                      handleWillCallOptions(value as WillCallOption)
                    }
                  >
                    {willCallAnywhere[0].status === IN_STOCK && (
                      <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
                        <RadioGroupItem
                          value={MAIN_OPTIONS.WILL_CALL}
                          id={MAIN_OPTIONS.WILL_CALL}
                        />

                        <div className="flex flex-col gap-0.5">
                          <div className="text-wrap font-medium">
                            <ItemCountBadge
                              count={willCallAnywhere[0].willCallQuantity}
                            />
                            &nbsp;
                            <span className="font-medium">
                              pick up at &nbsp;
                              <PlantName
                                plants={plants}
                                plantCode={willCallAnywhere[0].willCallPlant}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <CartItemWillCallTransfer
                      value={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      id={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      willCallAnywhere={willCallAnywhere}
                      plants={plants}
                      xPlant={availability.xplant}
                    />
                    {willCallAnywhere[1]?.backOrder && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.backOrderDate_1 ?? ""}
                      />
                    )}

                    {willCallAnywhere[1]?.status === NOT_IN_STOCK && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.willCallBackOrder ?? ""}
                      />
                    )}
                  </RadioGroup>
                )}

                {willCallAnywhere[0].status === LIMITED_STOCK && (
                  <RadioGroup
                    value={selectedWillCallTransfer}
                    onValueChange={(value) =>
                      handleWillCallOptions(value as WillCallOption)
                    }
                  >
                    <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
                      <RadioGroupItem
                        value={MAIN_OPTIONS.WILL_CALL}
                        id={MAIN_OPTIONS.WILL_CALL}
                      />

                      <div className="flex flex-col gap-0.5">
                        <div className="text-wrap font-medium">
                          <ItemCountBadge
                            count={willCallAnywhere[0].willCallQuantity}
                          />
                          &nbsp;
                          <span className="font-medium">
                            pick up at &nbsp;
                            <PlantName
                              plants={plants}
                              plantCode={willCallAnywhere[0].willCallPlant}
                            />
                          </span>
                        </div>

                        {willCallAnywhere[0]?.backOrder && (
                          <BackOrderItemCountLabel
                            count={willCallAnywhere[0].backOrderQuantity_1 ?? 0}
                          />
                        )}
                      </div>
                    </div>
                    {willCallAnywhere[0]?.backOrder && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[0]?.backOrderDate_1 ?? ""}
                      />
                    )}
                    <CartItemWillCallTransfer
                      value={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      id={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      willCallAnywhere={willCallAnywhere}
                      plants={plants}
                      xPlant={availability.xplant}
                    />
                    {willCallAnywhere[1]?.backOrder && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.backOrderDate_1 ?? ""}
                      />
                    )}
                    {willCallAnywhere[1]?.status === NOT_IN_STOCK && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.willCallBackOrder ?? ""}
                      />
                    )}{" "}
                  </RadioGroup>
                )}

                {willCallAnywhere[0].status === NOT_IN_STOCK && (
                  <RadioGroup
                    value={selectedWillCallTransfer}
                    onValueChange={(value) =>
                      handleWillCallOptions(value as WillCallOption)
                    }
                  >
                    <div className="flex flex-row gap-2 rounded-lg border border-wurth-gray-150 px-2 py-2 text-sm shadow-sm">
                      <RadioGroupItem
                        value={MAIN_OPTIONS.WILL_CALL}
                        id={MAIN_OPTIONS.WILL_CALL}
                      />

                      <div className="flex flex-col gap-0.5">
                        <div className="rounded bg-red-800/10 px-2 py-1 text-sm text-red-800">
                          This item is out of stock at&nbsp;
                          <PlantName
                            plants={plants}
                            plantCode={willCallAnywhere[0].willCallPlant}
                          />
                        </div>

                        {willCallAnywhere[0]?.willCallQuantity && (
                          <BackOrderItemCountLabel
                            count={willCallAnywhere[0].willCallQuantity}
                          />
                        )}
                      </div>
                    </div>

                    {willCallAnywhere[0]?.backOrder && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[0]?.backOrderDate_1 ?? ""}
                      />
                    )}

                    {willCallAnywhere[0]?.status === NOT_IN_STOCK && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[0]?.willCallBackOrder ?? ""}
                      />
                    )}
                    <CartItemWillCallTransfer
                      value={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      id={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      willCallAnywhere={willCallAnywhere}
                      plants={plants}
                      xPlant={availability.xplant}
                    />
                    {willCallAnywhere[1]?.backOrder && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.backOrderDate_1 ?? ""}
                      />
                    )}

                    {willCallAnywhere[1]?.status === NOT_IN_STOCK && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.willCallBackOrder ?? ""}
                      />
                    )}
                  </RadioGroup>
                )}

                {willCallAnywhere[0].status === NOT_AVAILABLE && (
                  <RadioGroup
                    value={selectedWillCallTransfer}
                    onValueChange={(value) =>
                      handleWillCallOptions(value as WillCallOption)
                    }
                  >
                    <NotAvailableInfoBanner
                      willCallType={MAIN_OPTIONS.WILL_CALL}
                      plants={plants}
                      willCallPlant={willCallAnywhere[0].willCallPlant ?? ""}
                    />
                    {willCallAnywhere[0]?.backOrder && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[0]?.backOrderDate_1 ?? ""}
                      />
                    )}
                    <CartItemWillCallTransfer
                      value={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      id={MAIN_OPTIONS.WILL_CALL_TRANSFER}
                      willCallAnywhere={willCallAnywhere}
                      plants={plants}
                      xPlant={availability.xplant}
                    />
                    {willCallAnywhere[1]?.status === NOT_IN_STOCK && (
                      <BackOrderInfoBanner
                        date={willCallAnywhere[1]?.willCallBackOrder ?? ""}
                      />
                    )}
                  </RadioGroup>
                )}
              </div>
            )}
          </div>
        )}
      </li>
    </ul>
  );
};

export default CartItemShippingMethod;

export const ItemCountBadge = ({
  count = 0,
  className,
}: {
  readonly count: number;
  readonly className?: string;
}) => {
  return (
    <span
      className={cn(
        "rounded bg-green-700/10 px-1 font-medium text-green-700",
        className,
      )}
    >
      {count}&nbsp;{count > 1 ? "items" : "item"}
    </span>
  );
};

export const ItemInStockCountBadge = ({
  availableCount = 0,
}: {
  readonly availableCount: number;
}) => {
  return (
    <>
      <span className="text-green-700">{availableCount}</span>&nbsp;in stock
    </>
  );
};

export const ItemLimitedStockOrBoCountBadge = ({
  availableCount = 0,
  showOutOfStock = true,
}: {
  readonly availableCount: number;
  readonly showOutOfStock: boolean;
}) => {
  if (availableCount === 0) {
    return (
      <span className="text-red-700">
        {showOutOfStock ? "Out of stock" : "Not stocked"}
      </span>
    );
  }

  return (
    <>
      Only <span className="text-yellow-700">{availableCount}</span> in stock
    </>
  );
};

export const BackOrderItemCountLabel = ({
  count,
  showOutOfStock = true,
  plant,
}: {
  readonly count: number;
  readonly showOutOfStock?: boolean;
  readonly plant?: string;
}) => {
  return (
    <div className="text-sm font-medium">
      <span className="rounded bg-yellow-700/10 px-1 text-yellow-700">
        Backorder
      </span>
      &nbsp;{count}&nbsp;{count > 1 ? "items" : "item"}
      {!showOutOfStock && ` from ${plant}`}
    </div>
  );
};

const BackOrderInfoBanner = ({ date }: { readonly date: string }) => {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-yellow-50 px-4 py-2 text-sm">
      <div>
        Backordered items are expected to ship by&nbsp;
        {date !== "" ? dayjs(date).format(UI_DATE_FORMAT) : "N/A"}.
      </div>
      <div className="text-xs text-wurth-gray-500">
        Delivery dates are subject to change without notice.
      </div>
    </div>
  );
};

const ShipToMeBOInfoBanner = ({
  option,
}: {
  readonly option:
    | {
        backOrder: boolean;
        plants: {
          backOrderDate?: string;
        }[];
      }
    | undefined;
}) => {
  if (option?.backOrder) {
    return (
      <BackOrderInfoBanner date={option?.plants?.at(0)?.backOrderDate ?? ""} />
    );
  }

  return null;
};
