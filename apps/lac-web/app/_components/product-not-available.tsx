import { Alert as AlertIcon } from "@repo/web-ui/components/icons/alert";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@repo/web-ui/components/ui/alert";

const ProductNotAvailable = () => {
  return (
    <Alert variant="destructive">
      <AlertIcon className="size-4" />
      <AlertContent>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <span>
            Not available online. Please call Customer Service for availability
          </span>
        </AlertDescription>
      </AlertContent>
    </Alert>
  );
};

export default ProductNotAvailable;
