import { IAlert } from "@utils";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

type alertContextType = {
  alerts: IAlert[];
  handleAlert: (alert: IAlert) => void;
};

type AlertProviderProps = {
  children: ReactNode;
};

export const AlertContext = createContext<alertContextType>({
  alerts: [],
  handleAlert: () => {},
});

export const useAlertHandler = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (alerts.length > 0) {
        setAlerts(alerts.slice(1));
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [alerts]);

  const handleAlert = (alert: IAlert) => {
    // add id to alert
    alert.id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    setAlerts((alerts) => [...alerts, alert]);
  };

  return (
    <AlertContext.Provider value={{ alerts, handleAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
