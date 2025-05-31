import { useEffect, useState } from "react";
import api from "@/services/api";
import { Dashboard } from "@/types/Dashboard";

export function useDashboards(userUuid: string) {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get<Dashboard[]>(
          `/dashboards?userUuid=${userUuid}`
        );
        setDashboards(res.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (userUuid) load();
  }, [userUuid]);

  return { dashboards, loading, error };
}
