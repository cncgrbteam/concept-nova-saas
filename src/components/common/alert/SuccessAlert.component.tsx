import { AlertProgressBar } from "@components";
import { useState } from "react";

export const SuccessAlert = ({ message }: { message: string }) => {
  const [show, setShow] = useState<boolean>(true);

  return (
    <>
      {show && (
        <div className="bg-green-100 text-green-500 rounded w-full">
          <div className="py-2 px-5">{message ? message : "Success"}</div>
          <AlertProgressBar showParent={setShow} className="bg-green-500" />
        </div>
      )}
    </>
  );
};
