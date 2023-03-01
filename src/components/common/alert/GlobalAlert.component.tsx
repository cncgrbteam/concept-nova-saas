import { useAlertHandler } from "@context";
import { IAlert } from "@utils";
import { ErrorAlert, SuccessAlert } from "@components";

export const GlobalAlert = () => {
  const { alerts } = useAlertHandler();

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 w-[30vw]">
        {alerts.map((alert: IAlert) => (
          <div key={alert.id} className={`py-1`}>
            {/* success alert */}
            {alert.type === "success" && (
              <SuccessAlert message={alert?.message} />
            )}

            {/* error alert */}
            {alert.type === "error" && <ErrorAlert message={alert?.message} />}
          </div>
        ))}
      </div>
    </div>
  );
};
