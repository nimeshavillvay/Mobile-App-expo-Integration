import { cn } from "@/_lib/utils";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { Close } from "@repo/web-ui/components/icons/close";
import { Download } from "@repo/web-ui/components/icons/download";
import { FileDownload } from "@repo/web-ui/components/icons/file-download";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  useDropzone,
  type DropzoneInputProps,
  type DropzoneRootProps,
} from "react-dropzone";
import { getExcelData, validateFile } from "./client-helper";

const BulkUpload = ({
  file,
  setFile,
  setBulkUploadItems,
  isBulkUploadDone = false,
  isFileProcessingState = false,
}: {
  readonly file: File | null;
  readonly setFile: Dispatch<SetStateAction<File | null>>;
  readonly setBulkUploadItems: Dispatch<
    SetStateAction<
      {
        sku: string;
        quantity: string;
        jobName: string;
      }[]
    >
  >;
  readonly isBulkUploadDone: boolean;
  readonly isFileProcessingState: boolean;
}) => {
  const [fileErrorMessage, setFileErrorMessage] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) {
        return;
      }
      setFile(file);
      setFileErrorMessage("");
    },
    [setFile],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const upload = async () => {
    if (!file) {
      return;
    }

    const errorMessage = validateFile(file);
    setFileErrorMessage(errorMessage);

    if (errorMessage) {
      return;
    }

    const bulkUploadItems = await getExcelData(file);
    bulkUploadItems.shift(); // remove excel header row

    setBulkUploadItems(
      bulkUploadItems.map((item) => ({
        sku: item?.[0] || "",
        quantity: item?.[1] || "",
        jobName: item?.[2] || "",
      })),
    );
  };

  return (
    <div className="my-3 w-full rounded bg-wurth-gray-50 p-4 text-sm">
      <div className="flex items-center justify-between">
        <div className="font-medium">
          Add items by uploading an Excel or a CSV file
        </div>

        <a
          className="btnAction flex items-center gap-2 font-medium text-wurth-red-650"
          href="/upload-order-form.csv"
          download={true}
          data-btn-action="Download Bulk Order Template"
        >
          <FileDownload className="stroke-wurth-red-650" />
          <span>Download the template</span>
        </a>
      </div>

      <div
        className={cn(
          "mt-3 min-h-[68px] cursor-pointer rounded border-2 bg-white",
          file ? "border-solid" : "border-dashed",
        )}
      >
        {file ? (
          <div className="p-5">
            {isBulkUploadDone ? (
              <FileUploadSuccess />
            ) : (
              <div>
                {isFileProcessingState ? (
                  <FileUploadProgress />
                ) : (
                  <FileInfoAndErrors
                    file={file}
                    setFile={setFile}
                    upload={upload}
                    fileErrorMessage={fileErrorMessage}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <InitialUploadState
            getRootProps={getRootProps()}
            getInputProps={getInputProps()}
          />
        )}
      </div>
    </div>
  );
};

export default BulkUpload;

const InitialUploadState = ({
  getRootProps,
  getInputProps,
}: {
  readonly getRootProps: DropzoneRootProps;
  readonly getInputProps: DropzoneInputProps;
}) => {
  return (
    <div {...getRootProps} className="">
      <input {...getInputProps} />

      <div className="flex min-h-[68px] items-center justify-center gap-3">
        <Download className="h-4 w-4" />

        <div>
          Drag and drop or <u>choose file</u> to upload
        </div>
      </div>
    </div>
  );
};

const FileInfoAndErrors = ({
  file,
  setFile,
  upload,
  fileErrorMessage,
}: {
  readonly file: File;
  readonly setFile: Dispatch<React.SetStateAction<File | null>>;
  readonly upload: () => void;
  readonly fileErrorMessage: string;
}) => {
  return (
    <>
      <div className="flex min-h-[68px] items-center justify-center gap-3">
        <div className="max-w-72">{file.name}</div>

        <Button
          className=""
          variant="default"
          onClick={upload}
          data-button-action="Bulk Upload"
        >
          Upload
        </Button>

        <Button
          className="bg-wurth-gray-50 text-wurth-red-650"
          variant="ghost"
          onClick={() => {
            setFile(null);
          }}
        >
          <Close
            className="h-4 w-4 stroke-wurth-red-650"
            data-button-action="Bulk Upload Remove File"
          />

          <span data-button-action="Bulk Upload Remove File">Remove</span>
        </Button>
      </div>

      {!!fileErrorMessage && (
        <div className="text-center text-wurth-red-650">{fileErrorMessage}</div>
      )}
    </>
  );
};

const FileUploadProgress = () => {
  return (
    <div>
      <div className="mb-2 text-center text-sm">
        File uploading, please wait...
      </div>
      <div className="m-auto flex max-w-72">
        <div
          className={cn(
            `h-2 w-6/12 rounded-full rounded-r-none bg-wurth-red-650`,
          )}
        />
        <div className={cn(`h-2 w-4/12 rounded-full bg-wurth-gray-50`)} />
      </div>
    </div>
  );
};

const FileUploadSuccess = () => {
  return (
    <div className="relative m-auto flex max-w-72 items-center gap-2 font-semibold">
      <CheckCircle className="stroke-green-700" />
      <div className="text-green-700">File successfully uploaded</div>
    </div>
  );
};
