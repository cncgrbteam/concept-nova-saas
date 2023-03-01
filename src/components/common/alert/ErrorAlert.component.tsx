import { AlertProgressBar } from "@components";
import { useState } from "react";

export const ErrorAlert = ({ message }: { message: string }) => {
  const [show, setShow] = useState<boolean>(true);

  return (
    <>
      {show && (
        <div className="bg-red-100 text-red-500 rounded w-full">
          <div className="py-2 px-5">{message ? message : "Success"}</div>
          <AlertProgressBar showParent={setShow} className="bg-red-500" />
        </div>
      )}
    </>
  );
};
