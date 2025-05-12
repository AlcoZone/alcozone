"use client";
import React, { useState } from "react";

interface DownloadCsvModalProps {
  reports: string[];
  onClose: () => void;
  onDownload: (selectedReport: string) => void;
}

const DownloadCsvModal: React.FC<DownloadCsvModalProps> = ({ reports, onClose, onDownload }) => {
  const [search, setSearch] = useState<string>("");
  const [selectedReport, setSelectedReport] = useState<string>("");

  const filteredReports = reports.filter((report) =>
    report.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (selectedReport) {
      onDownload(selectedReport);
      onClose();
    } else {
      alert("Por favor selecciona un reporte.");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-md">
        <h2 className="text-xl font-bold mb-4">Seleccionar reporte</h2>

        <input
          type="text"
          placeholder="Buscar reporte..."
          className="border rounded px-3 py-2 w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ul className="max-h-40 overflow-y-auto border rounded mb-4">
          {filteredReports.map((report, idx) => (
            <li
              key={idx}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                selectedReport === report ? "bg-blue-200 font-semibold" : ""
              }`}
              onClick={() => setSelectedReport(report)}
            >
              {report}
            </li>
          ))}
          {filteredReports.length === 0 && (
            <li className="px-3 py-2 text-gray-500">No se encontraron reportes.</li>
          )}
        </ul>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">Cancelar</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-850 text-white">
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadCsvModal;