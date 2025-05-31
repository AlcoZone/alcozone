"use client";

import { useState, useEffect } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useDashboards } from "@/hooks/useDashboards";
import { useAvailableWidgets } from "@/hooks/useAvailableWidgets";
import { v4 as uuidv4 } from "uuid";

import { GridItem, useDashboardLayout } from "@/hooks/useDashboardLayout";

import { BarChartWidgetResizable as BarChartWidget } from "@/components/BarChartWidget/BarChartWidgetResizable";
import { ComparisonWidgetResizable as ComparisonWidget } from "@/components/ComparisonWidget/ComparisonWidgetResizable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  ChevronsUpDown,
  Check,
  Save,
  CirclePlus,
  X,
  Trash2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import { WidgetDetail } from "@/types/WidgetDetail";
import WidgetSelectionDialog from "@/components/WidgetSelectionDialog/WidgetSelectionDialog";
import { getAuth } from "firebase/auth";
import { MapWidget } from "@/components/MapWidget/MapWidget";
import { RadialChartWidget } from "@/components/RadialChartWidget/RadialChartWidget";
import { DonutChartWidget } from "@/components/DonutChartWidget/DonutChartWidget";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [savedName, setSavedName] = useState("Dashboard principal");
  const [draftName, setDraftName] = useState(savedName);

  const auth = getAuth();
  const user = auth.currentUser;

  const [userUuid, setUserUuid] = useState(user?.uid || "");
  const { dashboards, loading, error } = useDashboards(userUuid);
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(
    null
  );
  const { layout, loading: layoutLoading } = useDashboardLayout(
    selectedDashboard || ""
  );

  const {
    widgets: availableWidgets,
    loading: widgetsLoading,
    error: widgetsError,
  } = useAvailableWidgets();

  const [savedLayout, setSavedLayout] = useState<GridItem[]>([]);
  const [draftLayout, setDraftLayout] = useState<GridItem[]>([]);

  const [hasChanges, setHasChanges] = useState(false);
  const [open, setOpen] = useState(false);
  const [availableDashboards, setAvailableDashboards] = useState<
    { id: string; name: string }[]
  >([]);
  const [isSaving, setIsSaving] = useState(false);

  const rowHeight = 100;

  useEffect(() => {
    if (!layoutLoading) {
      const deepCloned = layout.map((item) => ({ ...item }));
      setSavedLayout(deepCloned);
      setDraftLayout(deepCloned.map((item) => ({ ...item })));
    }
  }, [layout, layoutLoading]);

  useEffect(() => {
    if (!loading) {
      if (dashboards.length > 0) {
        setAvailableDashboards(
          dashboards.map((d) => ({ id: d.uuid, name: d.name }))
        );

        const lastViewedUuid = localStorage.getItem("selectedDashboardUuid");
        const found = dashboards.find((d) => d.uuid === lastViewedUuid);
        const fallback = dashboards[0];

        const active = found || fallback;

        setSelectedDashboard(active.uuid);
        setSavedName(active.name);
        setDraftName(active.name);
        localStorage.setItem("selectedDashboardUuid", active.uuid);
        setIsEditing(false);
      } else {
        setSelectedDashboard(null);
        setSavedLayout([]);
        setDraftLayout([]);
        setSavedName("Nuevo Dashboard");
        setDraftName("Nuevo Dashboard");
        setIsEditing(true);
      }
    }
  }, [dashboards, loading]);

  const getHeight = (id: string) => {
    const item = (isEditing ? draftLayout : savedLayout).find(
      (l) => l.name === id
    );
    return item ? item.h * rowHeight : 300;
  };

  // add-widget handler
  const handleAddWidget = (widget: WidgetDetail) => {
    const newItem: GridItem = {
      id: 0,
      uuid: uuidv4(),
      widgetUuid: widget.uuid,
      name: widget.name,
      i: widget.name,
      x: 0,
      y: 0,
      w: widget.minWidth,
      h: widget.minHeight,
      minW: widget.minWidth,
      minH: widget.minHeight,
    };
    setDraftLayout((prev) => [...prev, newItem]);
    setHasChanges(true);
  };

  const handleRemoveWidget = (widgetName: string) => {
    setDraftLayout((prev) => prev.filter((w) => w.name !== widgetName));
    setHasChanges(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setDraftName(newName);
    setAvailableDashboards((prev) =>
      prev.map((d) =>
        d.id === selectedDashboard ? { ...d, name: newName } : d
      )
    );
    setHasChanges(true);
  };

  const handleDeleteDashboard = async (
    dashboardName: string,
    dashboardUuidToDelete: string
  ) => {
    const confirmed = window.confirm(
      `¿Seguro que deseas borrar el dashboard "${dashboardName}"?`
    );
    if (!confirmed) {
      return;
    }

    setAvailableDashboards((prev) =>
      prev.filter((d) => d.id !== dashboardUuidToDelete)
    );

    if (selectedDashboard === dashboardUuidToDelete) {
      localStorage.removeItem("selectedDashboardUuid");
      setSelectedDashboard(null);

      if (availableDashboards.length > 0) {
        const remaining = availableDashboards.filter(
          (d) => d.id !== dashboardUuidToDelete
        );
        if (remaining.length) {
          const next = remaining[0].id;
          setSelectedDashboard(next);
          localStorage.setItem("selectedDashboardUuid", next);
          const found = dashboards.find((db) => db.uuid === next);
          if (found) {
            setSavedName(found.name);
            setDraftName(found.name);
          }
        }
      }
    }
    try {
      await api.delete(`/dashboards/${dashboardUuidToDelete}/widgets`);
      await api.delete(`/dashboards/${dashboardUuidToDelete}`);
    } catch (err) {
      console.error("Error al borrar dashboard:", err);
    }
  };

  const handleSave = async () => {
    let dashboardUuidToUse = selectedDashboard;

    if (selectedDashboard === null) {
      try {
        const createRes = await api.post("/dashboards", {
          userUuid: userUuid,
          name: draftName,
        });

        dashboardUuidToUse = createRes.data.uuid;
        setAvailableDashboards((prev) => [
          ...prev,
          { id: dashboardUuidToUse!, name: draftName },
        ]);
        setSelectedDashboard(dashboardUuidToUse);
        localStorage.setItem("selectedDashboardUuid", dashboardUuidToUse || "");
      } catch (err) {
        console.error("Error creating new dashboard:", err);
      }
    }

    setIsSaving(true);

    try {
      await api.put(`/dashboards/${dashboardUuidToUse}`, {
        name: draftName,
      });

      const widgets = draftLayout.map((item) => ({
        id: item.id,
        uuid: item.uuid,
        widgetUuid: item.widgetUuid,
        name: item.name,
        gridPositionX: item.x,
        gridPositionY: item.y,
        gridWidth: item.w,
        gridHeight: item.h,
        minWidth: item.minW,
        minHeight: item.minH,
      }));

      await api.post(`/dashboards/${dashboardUuidToUse}/widgets`, widgets);

      setSavedName(draftName);
      setSavedLayout([...draftLayout]);
      setIsEditing(false);
      setHasChanges(false);
    } catch (err) {
      console.error("Error saving dashboard:", err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const sanitizeLayout = (layout: GridItem[]) =>
      layout
        .map(({ name, x, y, w, h }) => ({ name, x, y, w, h }))
        .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));

    const changed =
      JSON.stringify(sanitizeLayout(draftLayout)) !==
        JSON.stringify(sanitizeLayout(savedLayout)) || draftName !== savedName;

    setHasChanges(changed);
  }, [draftLayout, draftName, savedLayout, savedName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isEditing) {
        if (selectedDashboard === null) {
          if (dashboards.length === 0) {
            return;
          }
          const lastViewed = localStorage.getItem("selectedDashboardUuid");
          if (lastViewed) {
            setSelectedDashboard(lastViewed);
            const previously = dashboards.find((d) => d.uuid === lastViewed);
            if (previously) {
              setSavedName(previously.name);
              setDraftName(previously.name);
            }
          }
        } else {
          setDraftLayout([...savedLayout]);
          setDraftName(savedName);
          setAvailableDashboards((prev) =>
            prev.map((d) =>
              d.id === selectedDashboard ? { ...d, name: savedName } : d
            )
          );
        }
        setIsEditing(false);
        setHasChanges(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditing, savedLayout, savedName, selectedDashboard]);

  if (layoutLoading && dashboards.length > 0)
    return <div>Cargando layout del dashboard...</div>;

  const isWidgetVisible = (name: string) =>
    (isEditing ? draftLayout : savedLayout).some((w) => w.name === name);

  return (
    <main
      className={cn(
        "p-6 transition-colors h-100 w-full",
        isEditing && "bg-muted"
      )}
      style={{
        cursor: isEditing ? "grab" : "default",
        minHeight: "calc(100vh - 175px)",
      }}
    >
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex-1">
          {isEditing ? (
            <Input
              value={draftName}
              onChange={handleNameChange}
              className="text-xl font-semibold border-none px-2 py-1 bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[220px] justify-between">
                  {selectedDashboard === null
                    ? "Nuevo Dashboard"
                    : availableDashboards.find(
                        (d) => d.id === selectedDashboard
                      )?.name || "Selecciona un dashboard"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[220px] p-0">
                <Command>
                  <CommandInput placeholder="Buscar..." className="text-sm" />
                  <CommandList>
                    <CommandEmpty>No hay dashboards.</CommandEmpty>
                    <CommandGroup>
                      {availableDashboards.map((d) => (
                        <div
                          key={d.id}
                          className="flex items-center justify-between px-2"
                        >
                          <CommandItem
                            value={d.id}
                            onSelect={(val) => {
                              setSelectedDashboard(val);
                              localStorage.setItem(
                                "selectedDashboardUuid",
                                val
                              );
                              setOpen(false);
                              const selected = dashboards.find(
                                (db) => db.uuid === val
                              );
                              setDraftName(selected?.name || "");
                            }}
                            className="flex-1 flex items-center space-x-2 overflow-hidden"
                          >
                            <Check
                              className={`h-4 w-4 flex-shrink-0 ${
                                selectedDashboard === d.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                            <span className="truncate">{d.name}</span>
                          </CommandItem>

                          <Trash2
                            size={16}
                            className="ml-2 flex-shrink-0 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDashboard(d.name, d.id);
                            }}
                          />
                        </div>
                      ))}
                      <CommandItem
                        className="text-primary font-medium mt-1 border-t pt-2 cursor-pointer"
                        onSelect={() => {
                          setOpen(false);
                          setSelectedDashboard(null);
                          setSavedLayout([]);
                          setDraftLayout([]);
                          setSavedName("Nuevo Dashboard");
                          setDraftName("Nuevo Dashboard");
                          setIsEditing(true);
                        }}
                      >
                        <CirclePlus className="mr-2 h-4 w-4" />
                        Nuevo Dashboard
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className="flex-1 text-center">
          {isEditing && (
            <div className="bg-[#eef4ff] text-[#001391] px-4 py-1 rounded-lg border border-[#cddfff] text-sm font-medium inline-block">
              🛠️ Modo edición — presiona <kbd className="mx-1">Esc</kbd> para
              salir
            </div>
          )}
        </div>

        <div className="flex-1 text-right">
          {hasChanges && isEditing ? (
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="text-white bg-[#001391]/80 hover:bg-[#001391]"
            >
              {isSaving ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Guardar
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={() => {
                setDraftLayout([...savedLayout]);
                setDraftName(savedName);
                setIsEditing(true);
              }}
              className="text-white bg-neutral-550 hover:bg-neutral-600"
            >
              <Pencil className="mr-2 h-4 w-4" /> Editar
            </Button>
          )}
          {isEditing && !widgetsLoading && !widgetsError && (
            <WidgetSelectionDialog
              widgets={availableWidgets}
              addedWidgetIds={draftLayout.map((i) => i.widgetUuid)}
              onAddWidget={handleAddWidget}
            />
          )}
        </div>
      </div>

      {isEditing && draftLayout.length === 0 && (
        <div className="p-6 text-center italic text-gray-600">
          El Dashboard está vacío. Agrega nuevos Widgets arriba a la derecha.
        </div>
      )}

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: isEditing ? draftLayout : savedLayout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 2 }}
        rowHeight={rowHeight}
        isResizable={isEditing}
        isDraggable={isEditing}
        draggableCancel=".non-draggable"
        onLayoutChange={(newLayout) => {
          if (isEditing) {
            setDraftLayout((prev) =>
              newLayout.map((updated: GridItem) => {
                const original = prev.find((item) => item.name === updated.i);
                return {
                  ...original,
                  x: updated.x,
                  y: updated.y,
                  w: updated.w,
                  h: updated.h,
                };
              })
            );
          }
        }}
      >
        {isWidgetVisible("bar-chart") && (
          <div
            key="bar-chart"
            style={{ width: "100%", height: "100%" }}
            className="relative overflow-visible"
          >
            {isEditing && (
              <RemoveButton onClick={() => handleRemoveWidget("bar-chart")} />
            )}
            <BarChartWidget
              title="Incidentes causados por alcohol"
              description="Comparación mensual por categoría"
              data={[
                {
                  month: "January",
                  "Causa: Alcohol": 400,
                  "Otras causas": 300,
                },
                {
                  month: "February",
                  "Causa: Alcohol": 300,
                  "Otras causas": 200,
                },
                { month: "March", "Causa: Alcohol": 500, "Otras causas": 450 },
                { month: "April", "Causa: Alcohol": 200, "Otras causas": 100 },
              ]}
              categories={["Causa: Alcohol", "Otras causas"]}
              categoryColors={["#0095FF", "#00E096"]}
              chartHeight={getHeight("bar-chart")}
            />
          </div>
        )}

        {isWidgetVisible("comparison") && (
          <div
            key="comparison"
            style={{ width: "100%", height: "100%" }}
            className="relative overflow-visible"
          >
            {isEditing && (
              <RemoveButton onClick={() => handleRemoveWidget("comparison")} />
            )}
            <ComparisonWidget
              title="Accidentes por Mes"
              data={[
                {
                  month: "January",
                  alcoholRelated: 120,
                  nonAlcoholRelated: 200,
                },
                {
                  month: "February",
                  alcoholRelated: 160,
                  nonAlcoholRelated: 230,
                },
                { month: "March", alcoholRelated: 110, nonAlcoholRelated: 220 },
                { month: "April", alcoholRelated: 90, nonAlcoholRelated: 170 },
                { month: "May", alcoholRelated: 130, nonAlcoholRelated: 210 },
                { month: "June", alcoholRelated: 150, nonAlcoholRelated: 200 },
              ]}
              config={{
                alcoholRelated: {
                  label: "Relacionado al alcohol",
                  color: "#07E098",
                },
                nonAlcoholRelated: {
                  label: "No relacionado al alcohol",
                  color: "#0095FF",
                },
              }}
              footer="Enero - Junio 2024"
              chartHeight={getHeight("comparison")}
            />
          </div>
        )}

        {isWidgetVisible("map") && (
          <div
            key="map"
            style={{ width: "100%", height: "100%" }}
            className="relative overflow-visible"
          >
            {isEditing && (
              <RemoveButton onClick={() => handleRemoveWidget("map")} />
            )}
            <MapWidget
              variant="clusterize"
              data={[
                { id: "1", latitude: 19.4326, longitude: -99.1332 },
                { id: "2", latitude: 19.4426, longitude: -99.1232 },
                { id: "3", latitude: 19.4526, longitude: -99.1432 },
                { id: "4", latitude: 19.4356, longitude: -99.1382 },
              ]}
            />
          </div>
        )}
        {isWidgetVisible("radial-chart") && (
          <div
            key="radial-chart"
            style={{ width: "100%", height: "100%" }}
            className="relative overflow-visible"
          >
            {isEditing && (
              <RemoveButton
                onClick={() => handleRemoveWidget("radial-chart")}
              />
            )}
            <RadialChartWidget
              title="Tipos de accidente"
              description="Porcentaje de accidentes"
              footer=""
              data={[
                { percentage: 28.47, subType: "Choque con lesionados" },
                { percentage: 9.72, subType: "Motociclista" },
                { percentage: 9.43, subType: "Atropellado" },
              ]}
            />
          </div>
        )}
        {isWidgetVisible("donut") && (
          <div
            key="donut"
            style={{ width: "100%", height: "100%" }}
            className="relative overflow-visible"
          >
            {isEditing && (
              <RemoveButton onClick={() => handleRemoveWidget("donut")} />
            )}
            <DonutChartWidget
              title="Alcadías con más peligro"
              footer="Datos del último mes disponibles"
              centerLabel="Total accidentes"
              data={[
                { town: "Iztapalapa", total_accidents: "2747" },
                { town: "Gustavo A. Madero", total_accidents: "1846" },
              ]}
            />
          </div>
        )}
      </ResponsiveGridLayout>
    </main>
  );
}

export function RemoveButton({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`non-draggable absolute -top-2 -right-2 z-10 ${className} cursor-pointer bg-white rounded-full shadow-md p-0.5 pointer-events-auto`}
    >
      <X size={18} />
    </button>
  );
}
