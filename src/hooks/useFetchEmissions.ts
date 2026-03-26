import { useEffect, useState } from "react";
import { fetchEmissions } from "../services/api";

export interface EmissionsDataInterface {
  sensorId: string;
  industry: string;
  location: string;
  timestamp: string;
  co2: number;
  nox: number;
  so2: number;
  pm25: number;
}

export const useFetchEmissions = () => {
  const [data, setData] = useState<EmissionsDataInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const emissionsData = async () => {
      try {
        const response = await fetchEmissions();
        console.log(response, "Emit DAta");
        if (!response) {
          setError(true);
          throw new Error("Erro fetching data");
        }
        setData(response as unknown as EmissionsDataInterface[]);
      } catch (error) {
        setError(true);
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    emissionsData();

    const interval = setInterval(emissionsData, 10000); // auto-fetchiubg every 10secs
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};
