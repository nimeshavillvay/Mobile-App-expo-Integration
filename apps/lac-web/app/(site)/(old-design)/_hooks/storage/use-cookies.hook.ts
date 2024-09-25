import {
  ACCOUNT_NO_COOKIE,
  ACCOUNT_TOKEN_COOKIE,
  ADDRESS_ID_COOKIE,
  TOKEN_COOKIE,
} from "@/old/_lib/constants";
import { useCookies as useReactCookies } from "react-cookie";

const useCookies = () => {
  return useReactCookies([
    TOKEN_COOKIE, // Main authentication token
    ACCOUNT_TOKEN_COOKIE, // Authentication token after selecting account and address
    ACCOUNT_NO_COOKIE, // Account number
    ADDRESS_ID_COOKIE, // Address ID
  ]);
};

export default useCookies;
