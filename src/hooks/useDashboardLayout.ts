import { useEffect, useState } from "react";
import api from "@/services/api";

export interface GridItem {
  id: number;
  uuid: string;
  name: string;
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW: number;
  minH: number;
}

export function useDashboardLayout(dashboardUuid: string) {
  const [layout, setLayout] = useState<GridItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadLayout = async () => {
      if (!dashboardUuid) return;

      try {
        const res = await api.get(`/dashboards/${dashboardUuid}/widgets`);
        const widgets = res.data;

        const gridLayout = widgets.map((w: any) => ({
          id: w.id,
          uuid: w.uuid,
          name: w.name,
          i: w.name,
          x: w.gridPositionX,
          y: w.gridPositionY,
          w: w.gridWidth,
          h: w.gridHeight,
          minW: w.minWidth,
          minH: w.minHeight,
        }));

        setLayout(gridLayout);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadLayout();
  }, [dashboardUuid]);

  return { layout, loading, error };
}
