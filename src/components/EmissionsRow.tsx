import type { EmissionsDataInterface } from "../hooks/useFetchEmissions";
import moment from "moment";

interface DataInterface extends EmissionsDataInterface {
  status?: "normal" | "alert";
}

export const EmissionsRow = ({ data }: { data: DataInterface[] }) => {
  const hasExceededLimit = (data: DataInterface) => {
    return data.co2 > 450 || data.nox > 80 || data.so2 > 20 || data.pm25 > 35;
  };
  const rowStyle = "flex-1 text-center border-l-[0.5px] p-2";
  return (
    <>
      {data?.map((emission) => (
        <tr className="w-full flex justify-between border-b-[0.5px] text-sm text-gray-600">
          <td className={rowStyle}>{emission.sensorId}</td>
          <td className={rowStyle}>{emission.industry}</td>
          <td className={rowStyle}>{emission.location}</td>
          <td className={rowStyle}>{emission.co2}</td>
          <td className={rowStyle}>{emission.nox}</td>
          <td className={rowStyle}>{emission.so2}</td>
          <td className={rowStyle}>{emission.pm25}</td>
          <td className={`${rowStyle} text-[12px]`}>
            {moment(emission.timestamp).format("lll")}
          </td>
          <td
            className={`flex-1 p-2 capitalize ${rowStyle} ${hasExceededLimit(emission) && "text-red-700 bg-red-200/50"}`}
          >
            {hasExceededLimit(emission) ? "Alert" : "Normal"}
          </td>
        </tr>
      ))}
    </>
  );
};
