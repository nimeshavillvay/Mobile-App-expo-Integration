import { cn } from "@/_lib/utils";

type InstructionsProps = {
  readonly type: "desktop" | "mobile";
  readonly className?: string;
};

const Instructions = ({ type, className }: InstructionsProps) => {
  return (
    <section
      className={cn(
        "grid gap-5 text-sm text-wurth-gray-800 print:hidden",
        type === "mobile" ? "grid-cols-1" : "grid-cols-2",
        className,
      )}
    >
      <h2
        className={cn(
          type === "mobile"
            ? "hidden"
            : "col-span-2 font-title text-2xl tracking-[-0.144px]",
        )}
      >
        Instructions
      </h2>

      <div className="space-y-5">
        <Warning />

        <p>
          Upon arrival at your facility, please carefully inspect the packaging
          and contents IMMEDIATELY upon offloading equipment from the truck.
          Count and inspect the goods thoroughly before signing the carrier
          receipts. Open the cartons if necessary. Check the top and bottom of
          the packages, not just the sides.
        </p>

        <Warning />

        <div>
          <div>If ANY damage is found:</div>

          <ol className="list-outside list-decimal pl-4">
            <li>
              Note on the Bill of Lading of ANY and ALL damages or
              irregularities to the equipment. If there is ANY damage to the
              packing, note this on the carrier receipt prior to signing even if
              the machines does not appear to have damage. If damage has
              occurred and the trucking company Bill of Lading is not noted with
              the damage, Wurth Louis and Company will not be responsible for
              any costs related to repairing the damaged equipment.
            </li>
          </ol>
        </div>
      </div>

      <div className="space-y-5">
        <ol className="list-outside list-decimal pl-4" start={2}>
          <li>Immediately take pictures of all damages.</li>

          <li>
            If you accept delivery with the exceptions noted on the carrier
            receipt, DO NOT throw away any of the crating or packing material
            until advised by the Wurth Louis and Company The carrier has the
            right to inspect the machine and all packing to determine their
            liability.
          </li>

          <li>
            Once the machine has been accepted, there is still always the chance
            of concealed damage and/or missing components this MUST be reported
            within 24 hours of delivery. If you find concealed damage and /or
            missing components, please contact Wurth Louis and Company and the
            Trucking Company immediately.
          </li>

          <li>
            Immediately notify Wurth Louis and Company of damages by telephone,
            contact Tammy Schachair 800-422-4389 ex 2207 or email
            tschachair@wurthlac.com. Further instructions will be provided to
            you at that time and you will be advised of the next actions to be
            taken to resolve any damage issues.
          </li>
        </ol>

        <p>
          Failure to follow these instructions will result in damage and/or loss
          not covered by Wurth Louis and Company/wurthmachinery.com
        </p>
      </div>
    </section>
  );
};

export default Instructions;

const Warning = () => {
  return (
    <div className="flex flex-row items-start gap-2 rounded-lg border border-[#A16207] bg-[#FEFCE8] px-4 py-2 text-[#A16207]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
        className="shrink-0"
      >
        <path
          stroke="#A16207"
          strokeLinecap="square"
          d="M8 6.333v3m0 1.66V11m0-9L1.5 13h13L8 2z"
        />
      </svg>

      <div className="space-y-1">
        <h4>Important!</h4>

        <p>
          A forklift must be available at time of delivery unless otherwise
          notated.
        </p>
      </div>
    </div>
  );
};
