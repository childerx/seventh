import { useMemo, useState, type ChangeEvent } from "react";
import { useFetchEmissions } from "../hooks/useFetchEmissions";
import { EmissionsRow } from "./EmissionsRow";

const EmissionsTable = () => {
  const { data, loading, error } = useFetchEmissions();
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const industries = useMemo(
    () => [...new Set(data.map((item) => item.industry))],
    [data],
  );

  const filteredAndSortedData = useMemo(() => {
    const filteredData =
      selectedIndustry === "all"
        ? data
        : data.filter((item) => item.industry === selectedIndustry);

    return [...filteredData].sort((a, b) => b.co2 - a.co2);
  }, [data, selectedIndustry]);

  const handleFilterIndustry = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndustry(e.target.value);
  };

  const headers = [
    "SensorID",
    "Industry",
    "Location",
    "CO2",
    "NOx",
    "SO2",
    "PM2.5",
    "Timestamp",
    "Status",
  ];

  if (loading)
    return (
      <>
        <div className="">Loading emissions data...</div>
      </>
    );

  if (error)
    return (
      <>
        <div className="text-red-400">
          <h4>Unable to load emissions data.</h4>
        </div>
      </>
    );

  return (
    <div className="w-full flex flex-col items-end">
      <select
        name="industry"
        id="industry"
        value={selectedIndustry}
        onChange={handleFilterIndustry}
        className="w-fit border-[0.5px] p-3 mb-4 rounded-lg"
      >
        <option value="all">All Industries</option>
        {industries.map((industry) => (
          <option key={industry} value={industry}>
            {industry}
          </option>
        ))}
      </select>
      <table className="w-full border-[0.5px] table-auto rounded-lg">
        <thead className="flex justify-between bg-gray-100 border-black border-b-[0.5px]">
          {headers.map((header: string, idx: number) => (
            <th
              aria-label="table header"
              className="flex-1 p-2 border-l-[0.5px]"
              key={idx}
            >
              <p className="text-sm text-gray-700 ">{header}</p>
            </th>
          ))}
        </thead>
        <tbody>
          <EmissionsRow data={filteredAndSortedData} />
        </tbody>
      </table>
    </div>
  );
};

export default EmissionsTable;
