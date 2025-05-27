import api from "../api"; 
import type { DatasetItem } from "@/types/DataSetItem";

export const getRevisionCsvList = async (): Promise<DatasetItem[]> => {
  try {
    const response = await api.get<DatasetItem[]>("/revision/csv/list");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la lista de revisiones:", error);
    return [];
  }
};
