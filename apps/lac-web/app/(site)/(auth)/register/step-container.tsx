import { cn } from "@/_lib/utils";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  createContext,
  useContext,
  type ComponentProps,
  type ReactNode,
} from "react";

type StepState = "open" | "closed";

const StepContext = createContext<{
  state: StepState;
  title: string;
}>({
  state: "open",
  title: "",
});

const useStepContext = () => {
  return useContext(StepContext);
};

type StepContainerProps = {
  readonly title: string;
  readonly children: ReactNode;
  readonly state: StepState;
};

export const StepContainer = ({
  title,
  children,
  state = "open",
}: StepContainerProps) => {
  return (
    <StepContext.Provider
      value={{
        state,
        title,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const StepContainerOpen = ({
  children,
  className,
  steps,
  submitBtnText = "Continue",
  disableSubmit = false,
  allFieldsRequired = false,
  ...delegated
}: ComponentProps<"form"> & {
  readonly steps: {
    current: number;
    total: number;
  };
  readonly submitBtnText?: string;
  readonly disableSubmit?: boolean;
  readonly allFieldsRequired?: boolean;
}) => {
  const { state, title } = useStepContext();

  if (state === "closed") {
    return null;
  }

  return (
    <form
      className={cn(
        "flex flex-col gap-5 rounded-lg border border-wurth-gray-250 p-6 shadow-lg",
        className,
      )}
      {...delegated}
    >
      <div className="flex flex-row items-start justify-between">
        <h3 className="text-base font-semibold text-wurth-gray-800">{title}</h3>

        <div className="text-sm text-wurth-gray-500">
          {steps.current} of {steps.total} steps
        </div>
      </div>

      {children}

      <div className="flex flex-row-reverse items-center justify-between pt-1">
        <Button
          type="submit"
          className="h-fit min-w-[7.5rem] py-2.5 font-bold shadow-md"
          disabled={disableSubmit}
          data-button-action={submitBtnText}
        >
          {submitBtnText}
        </Button>

        {allFieldsRequired && (
          <div className="text-xs text-wurth-gray-500">
            *All fields are required
          </div>
        )}
      </div>
    </form>
  );
};

export const StepContainerClosed = ({
  children,
  onClick,
  disabled = false,
}: {
  readonly children?: ReactNode;
  readonly onClick?: ComponentProps<typeof Button>["onClick"];
  readonly disabled?: boolean;
}) => {
  const { state, title } = useStepContext();

  if (state === "open") {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-wurth-gray-250 p-6 shadow-lg">
      <div className="flex flex-row items-center gap-3">
        <CheckCircle className="size-5 stroke-green-700" />

        <h3 className="flex-1 text-base font-semibold text-wurth-gray-800">
          {title}
        </h3>

        <Button
          variant="subtle"
          className="font-bold"
          onClick={onClick}
          disabled={disabled}
          data-button-action="Register Update User"
        >
          Edit
        </Button>
      </div>

      {children}
    </section>
  );
};
