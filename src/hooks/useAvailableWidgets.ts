// src/hooks/useAvailableWidgets.ts
import { useState, useEffect } from "react";
import api from "@/services/api";
import { WidgetDetail } from "@/types/WidgetDetail";
import { widgetRegistry } from "@/constants/widgetRegistry";

export function useAvailableWidgets() {
  const [widgets, setWidgets] = useState<WidgetDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api
      .get("/widgets")
      .then((res) => {
        console.log("res from widgets", res);
        const details = res.data.map((w: any) => {
          const entry = widgetRegistry[w.uuid];
          return {
            id: w.id,
            uuid: w.uuid,
            name: w.name,
            description: w.description,
            preview: entry ? entry.component(null, {}) : null,
          };
        });
        setWidgets(details);
      })
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));
  }, []);

  return { widgets, loading, error };
}
