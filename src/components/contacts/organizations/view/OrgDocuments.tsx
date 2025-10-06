import NoDocumentsIcon from "@/components/ui/icons/NoDocuments";
import { sliceFilename } from "@/utils/helpers/SliceName";
import dayjs from "dayjs";
import { FileIcon, Loader } from "lucide-react";

const OrgDocuments = ({
  orgDocs,
  isLoading,
}: {
  orgDocs?: any;
  isLoading?: boolean;
}) => {
  return (
    <div className="h-full px-2">
      {isLoading ? (
        <div className="text-center h-[calc(100vh-314px)] flex items-center justify-center">
          <Loader className="w-5 h-5 animate-spin" />
        </div>
      ) : orgDocs?.length === 0 ? (
        <div>
          <div className="text-center h-[calc(100vh-314px)] flex flex-col justify-center items-center">
            <NoDocumentsIcon />
            <p className="text-xl text-gray-700">No Documents</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-4 ">
          {orgDocs?.map((document) => (
            <div key={document?.id}>
              <div className="border text-sm rounded p-1 w-full">
                <div className="flex w-full items-center gap-2 bg-gray-100 rounded p-1">
                  <div className="shrink-0">
                    <FileIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 w-full">
                    <div
                      className="text-sm truncate w-full overflow-hidden whitespace-nowrap"
                      title={document?.name}
                    >
                      {sliceFilename(document?.name, 20)}
                    </div>
                    <div className="text-[11px]">
                      {(document?.meta_data?.file_size / (1024 * 1024)).toFixed(
                        2
                      )}
                      MB
                    </div>
                  </div>
                </div>
                <div className="text-[11px] mt-1 flex justify-end font-light">
                  {dayjs(document?.created_at).format("DD-MM-YYYY")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrgDocuments;
