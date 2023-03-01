import { Dispatch, SetStateAction, useState } from "react";
import { useInterval } from "@hooks";

export const AlertProgressBar = ({
  className,
  showParent,
}: {
  className: string;
  showParent: Dispatch<SetStateAction<boolean>>;
}) => {
  const [progressWidth, setProgressWidth] = useState<number>(100);

  useInterval(() => {
    if (progressWidth > 0) {
      setProgressWidth((prev) => prev - 1);
    } else {
      showParent(false);
    }
  }, 50);

  return (
    <div className="flex justify-end">
      <div
        className={`h-1 ${className}`}
        style={{ width: `${progressWidth}%` }}
      />
    </div>
  );
};
