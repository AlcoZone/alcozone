import api from "../api";

export const getRevisionCsv = async (uuid: string, name = "revision") => {
  try {
    const response = await api.get(`/revision/csv`, {
      params: { revision: uuid, withData: true },
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al descargar el CSV:", error);
    alert("No se pudo descargar el archivo.");
  }
};