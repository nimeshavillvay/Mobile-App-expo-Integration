import type { Product } from "@/_lib/types";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const LaminateGroup = ({
  product,
  brandName,
  brandImage,
}: {
  readonly product: Product;
  readonly brandName: string;
  readonly brandImage: string;
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="flex w-full gap-4 lg:w-60 lg:flex-col">
      <div>
        <Image
          src={brandImage ?? product.groupImage}
          alt={brandName ?? product.groupName}
          width={44}
          height={44}
        />
        <h3
          className="mt-2 text-xl font-bold"
          dangerouslySetInnerHTML={{ __html: product.groupName }}
        />
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <Image
              src={product.groupImage ?? product.variants[0]?.image}
              alt={product.groupName}
              width={240}
              height={240}
            />
          </div>
        </DialogTrigger>

        <DialogContent className="h-fit max-h-[90vh] w-fit max-w-[90vw] overflow-hidden border-none p-0">
          <div className="relative">
            <Button
              variant="ghost"
              className="absolute right-2 top-2 z-10 size-6 bg-black p-0 text-white hover:bg-black hover:text-white/[.7]"
              onClick={() => setLightboxOpen(false)}
            >
              <X
                className="h-6 w-6"
                data-button-action="Laminate Finder Close Enlarged Image"
              />
            </Button>
            <Image
              src={product.groupImage ?? product.variants[0]?.image}
              alt={product.groupName}
              width={800}
              height={800}
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-2 text-sm text-wurth-gray-500">
        <strong>Note:</strong>
        <p className="mb-2">
          Image color is for reference only. Actual colors may vary due to
          monitor settings.
        </p>
        <p>To obtain a sample, please contact your local branch.</p>
      </div>
    </div>
  );
};

export default LaminateGroup;
