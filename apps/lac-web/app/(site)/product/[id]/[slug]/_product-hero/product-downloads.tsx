"use client";

import { cn } from "@/_lib/utils";
import { Download } from "@repo/web-ui/components/icons/download";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import { useState } from "react";

type ProductDownloadsProps = {
  readonly attachments: {
    path: string;
    name: string;
    title: string;
  }[];
};

const ProductDownloads = ({ attachments }: ProductDownloadsProps) => {
  const [hidden, setHidden] = useState(true);

  if (!attachments.length) {
    return null;
  }

  const topAttachments = attachments.slice(0, 4);
  const hiddenAttachments = attachments.slice(4);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Downloads</h3>

      <div className="grid grid-cols-2 gap-2">
        {topAttachments.map((attachment) => (
          <DownloadLink key={attachment.path} {...attachment} />
        ))}

        {hiddenAttachments.length > 0 && (
          <>
            {!hidden &&
              hiddenAttachments.map((attachment) => (
                <DownloadLink key={attachment.path} {...attachment} />
              ))}

            <div className="col-span-2">
              <Button
                variant="link"
                className="h-fit p-0 text-sm font-medium"
                onClick={() => setHidden((hidden) => !hidden)}
                data-button-action={`Product ${hidden ? "Show" : "Hide"} All Downloads`}
              >
                {hidden ? "Show" : "Hide"} all downloads
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDownloads;

const DownloadLink = ({
  path,
  name,
  title,
}: {
  readonly path: string;
  readonly name: string;
  readonly title: string;
}) => {
  return (
    <a
      href={`https://${path}`}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "btnAction flex h-fit max-w-full flex-col items-start gap-2 overflow-hidden rounded-lg border-wurth-gray-250 p-3 shadow-sm",
      )}
      target="_blank"
      rel="noopener noreferrer"
      download={name}
      data-button-action="Download Resource"
    >
      <Download width={20} height={20} className="mt-1 shrink-0" />

      <span className="resource-name text-wrap text-left text-sm font-semibold text-wurth-gray-800">
        {title}
      </span>
    </a>
  );
};
