"use client";

import { Table } from "@/components/Table/Table";
import api from "@/services/api";
import React, { useState, useEffect } from "react";

export default function DatabasePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [startDate, setStartDate] = useState("2022-01-01");
  const [endDate, setEndDate] = useState("2022-01-01");

  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCrashes() {
      try {
        setLoading(true);
        setError(null);

        const formatDate = (dateStr: string) => {
          const [year, month, day] = dateStr.split("-");
          return `${day}-${month}-${year}`;
        };

        const formattedStart = formatDate(startDate);
        const formattedEnd = formatDate(endDate);

        const response = await api.get(
          `/crashes/date?start=${formattedStart}&end=${formattedEnd}`
        );

        const json = response.data;

        setCount(json.count);

        const mappedData = json.data.map((crash: any) => {
          const [fecha, hora] = crash.datetime.split(" ");
          return {
            fecha,
            hora,
            alcaldia: crash.town,
            colonia: crash.neighbourhood,
            longitud: crash.longitude.toString(),
            latitud: crash.latitude.toString(),
            incidente: crash.subType.toString(),
          };
        });

        setData(mappedData);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchCrashes();
  }, [startDate, endDate]);

  const handleSearch = () => {
    if (new Date(tempEndDate) >= new Date(tempStartDate)) {
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);
      setError(null);
    } else {
      alert("La fecha final debe ser igual o posterior a la fecha inicial");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 data-testid="page-title" className="text-2xl font-bold text-blue-850">
          Accidentes
        </h1>
        <div data-testid="total-accidents" className="text-gray-700 font-semibold">
          Total: {count} accidentes
        </div>
      </div>

      <div className="flex space-x-4 mb-4 items-center">
        <label>
          Fecha inicio:{" "}
          <input
            data-testid="start-date-input"
            type="date"
            value={tempStartDate}
            onChange={(e) => setTempStartDate(e.target.value)}
            max={tempEndDate}
            className="border rounded p-1"
          />
        </label>

        <label>
          Fecha fin:{" "}
          <input
            data-testid="end-date-input"
            type="date"
            value={tempEndDate}
            onChange={(e) => setTempEndDate(e.target.value)}
            min={tempStartDate}
            className="border rounded p-1"
          />
        </label>

        <button
          data-testid="search-button"
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>

      {loading && (
        <p data-testid="loading-message">Cargando datos...</p>
      )}
      {error && (
        <p data-testid="error-message" className="text-red-600">
          Error: {error}
        </p>
      )}

      {!loading && !error && (
        <div
          style={{
            maxHeight: "620px",
            overflowX: "hidden",
          }}
          data-testid="table-container"
        >
          <style>{`
            div > table > thead > tr > th:nth-child(4),
            div > table > tbody > tr > td:nth-child(4) {
              white-space: normal !important;
              word-break: break-word !important;
              max-width: 150px;
            }
            div > table > thead > tr > th,
            div > table > tbody > tr > td {
              padding-left: 15px;
              padding-right: 15px;
            }
          `}</style>
          <Table
            variant="default"
            columns={[
              { header: "Fecha", accessor: "fecha" },
              { header: "Hora", accessor: "hora" },
              { header: "Alcaldía", accessor: "alcaldia" },
              { header: "Colonia", accessor: "colonia" },
              { header: "Longitud", accessor: "longitud" },
              { header: "Latitud", accessor: "latitud" },
              { header: "Incidente", accessor: "incidente" },
            ]}
            data={data}
          />
        </div>
      )}
    </>
  );
}
