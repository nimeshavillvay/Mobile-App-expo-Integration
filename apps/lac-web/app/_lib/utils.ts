import type { Filters, FilterTitle, PasswordPolicies } from "@/_lib/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RefinementCtx } from "zod";

/**
 * Conditionally merge Tailwind CSS classes without conflicts
 */
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const filterAndMapValues = (filters: Filters[], title: FilterTitle) => {
  return filters.find((filter) => filter.filter === title);
};

type ErrorResponse = {
  status_code: string | undefined;
  message: string;
};

export const isErrorResponse = (error: unknown): error is ErrorResponse => {
  if (
    typeof error === "object" &&
    (typeof (error as ErrorResponse)?.status_code === "string" ||
      typeof (error as ErrorResponse)?.status_code === "undefined") &&
    typeof (error as ErrorResponse)?.message === "string"
  ) {
    return true;
  }

  return false;
};

export const checkPasswordComplexity = ({
  password,
  passwordPolicies,
  context,
  allowEmptyPassword = false,
}: {
  password: string;
  passwordPolicies: PasswordPolicies;
  context: RefinementCtx;
  allowEmptyPassword?: boolean;
}) => {
  if (allowEmptyPassword && password === "") {
    return true; // Allow empty passwords
  }

  const containsAlphabet = (ch: string) => /[a-z,A-Z]/.test(ch);
  const containsNumber = (ch: string) => /[0-9]/.test(ch);

  let countOfAlphabets = 0;
  let countOfNumbers = 0;

  if (password) {
    for (const ch of password) {
      if (containsAlphabet(ch)) {
        countOfAlphabets++;
      } else if (containsNumber(ch)) {
        countOfNumbers++;
      }
    }
  }

  if (password.length < passwordPolicies.minimumLength) {
    context.addIssue({
      path: ["password"],
      code: "custom",
      message: `Password must contain at least ${passwordPolicies.minimumLength} characters.`,
    });
  }

  if (
    countOfAlphabets < passwordPolicies.minimumAlphabets ||
    countOfNumbers < passwordPolicies.minimumNumbers
  ) {
    context.addIssue({
      path: ["password"],
      code: "custom",
      message: "Password does not meet complexity requirements",
    });
  }
};

/**
 * Format a number to price
 */
export const formatNumberToPrice = (value?: number) => {
  if (!value && value !== 0) {
    return "";
  }

  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const getBoolean = (value: string | undefined) => {
  return value === "Y";
};

export const calculateReduceQuantity = (
  quantity: number,
  minQty: number,
  increaseQty: number,
) => {
  const displayQuantity =
    quantity % minQty === 0
      ? quantity - increaseQty
      : quantity - (quantity % minQty);

  return displayQuantity > minQty ? displayQuantity : minQty;
};
export const calculateIncreaseQuantity = (
  quantity: number,
  minQty: number,
  increaseQty: number,
) => {
  return quantity - (quantity % minQty) + increaseQty;
};
