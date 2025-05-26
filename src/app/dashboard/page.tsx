"use client";

import { useState, useEffect } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useDashboards } from "@/hooks/useDashboards";
import { GridItem, useDashboardLayout } from "@/hooks/useDashboardLayout";

import AccidentsBarWidget from "@/components/BarWidget/AccidentsBarWidget";
import { BarChartWidget } from "@/components/BarChartWidget/BarChartWidget";
import { ComparisonWidget } from "@/components/ComparisonWidget/ComparisonWidget";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, ChevronsUpDown, Check, Save, CirclePlus } from "lucide-react";
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

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [savedName, setSavedName] = useState("Dashboard principal");
  const [draftName, setDraftName] = useState(savedName);
  const { dashboards, loading, error } = useDashboards(
    "oh1ntUykRjWWlYSothlaAVtAfG53"
  );
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(
    null
  );
  const { layout, loading: layoutLoading } = useDashboardLayout(
    selectedDashboard || ""
  );

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
    if (!loading && dashboards.length > 0) {
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
    }
  }, [dashboards, loading]);

  const getHeight = (id: string) => {
    const item = (isEditing ? draftLayout : savedLayout).find(
      (l) => l.name === id
    );
    return item ? item.h * rowHeight : 300;
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

  const handleSave = async () => {
    if (!selectedDashboard) return;

    setIsSaving(true);

    try {
      await api.put(`/dashboards/${selectedDashboard}`, {
        name: draftName,
      });

      const widgets = draftLayout.map((item) => ({
        id: item.id,
        uuid: item.uuid,
        name: item.name,
        gridPositionX: item.x,
        gridPositionY: item.y,
        gridWidth: item.w,
        gridHeight: item.h,
        minWidth: item.minW,
        minHeight: item.minH,
      }));

      console.log("widgets: ", widgets);

      await api.post(`/dashboards/${selectedDashboard}/widgets`, widgets);

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
        .map(({ i, x, y, w, h }) => ({ i, x, y, w, h }))
        .sort((a, b) => a.i.localeCompare(b.i));

    const changed =
      JSON.stringify(sanitizeLayout(draftLayout)) !==
        JSON.stringify(sanitizeLayout(savedLayout)) || draftName !== savedName;

    setHasChanges(changed);
  }, [draftLayout, draftName, savedLayout, savedName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isEditing) {
        setDraftLayout([...savedLayout]);
        setDraftName(savedName);
        setAvailableDashboards((prev) =>
          prev.map((d) =>
            d.id === selectedDashboard ? { ...d, name: savedName } : d
          )
        );
        setIsEditing(false);
        setHasChanges(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditing, savedLayout, savedName, selectedDashboard]);

  if (layoutLoading) return <div>Cargando layout del dashboard...</div>;

  return (
    <main
      className={cn("p-6 transition-colors", isEditing && "bg-muted")}
      style={{ cursor: isEditing ? "grab" : "default" }}
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
                  {availableDashboards.find((d) => d.id === selectedDashboard)
                    ?.name || "Selecciona un dashboard"}
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
                        <CommandItem
                          key={d.id}
                          value={d.id}
                          onSelect={(val) => {
                            setSelectedDashboard(val);
                            localStorage.setItem("selectedDashboardUuid", val);
                            setOpen(false);
                            const selected = dashboards.find(
                              (d) => d.uuid === val
                            );
                            setDraftName(selected?.name || "");
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectedDashboard === d.id
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          {d.name}
                        </CommandItem>
                      ))}
                      {/* Nuevo Widget button as a styled CommandItem */}
                      <CommandItem
                        className="text-primary font-medium mt-1 border-t pt-2 cursor-pointer"
                        onSelect={() => {
                          console.log("Nuevo Widget clicked");
                          setOpen(false);
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
        </div>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: isEditing ? draftLayout : savedLayout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 2 }}
        rowHeight={rowHeight}
        isResizable={isEditing}
        isDraggable={isEditing}
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
        <div key="accidents-bar" style={{ width: "100%", height: "100%" }}>
          <AccidentsBarWidget
            title="Accidentes por alcoholismo"
            subtitle="2.1% vs el año pasado"
            description="2023 vs 2024"
            data={[
              { month: "Enero", month1: 186, month2: 80 },
              { month: "Febrero", month1: 305, month2: 200 },
              { month: "Marzo", month1: 237, month2: 120 },
              { month: "Abril", month1: 73, month2: 190 },
              { month: "Mayo", month1: 209, month2: 130 },
              { month: "Junio", month1: 214, month2: 140 },
            ]}
            config={{
              mes1: { label: "2022", color: "#00E096" },
              mes2: { label: "2021", color: "#0095FF" },
            }}
            chartHeight={getHeight("accidents-bar")}
          />
        </div>

        <div key="bar-chart" style={{ width: "100%", height: "100%" }}>
          <BarChartWidget
            title="Incidentes causados por alcohol"
            description="Comparación mensual por categoría"
            data={[
              { month: "January", "Causa: Alcohol": 400, "Otras causas": 300 },
              { month: "February", "Causa: Alcohol": 300, "Otras causas": 200 },
              { month: "March", "Causa: Alcohol": 500, "Otras causas": 450 },
              { month: "April", "Causa: Alcohol": 200, "Otras causas": 100 },
            ]}
            categories={["Causa: Alcohol", "Otras causas"]}
            categoryColors={["#0095FF", "#00E096"]}
            chartHeight={getHeight("bar-chart")}
          />
        </div>

        <div key="comparison" style={{ width: "100%", height: "100%" }}>
          <ComparisonWidget
            title="Accidentes por Mes"
            data={[
              { month: "January", alcoholRelated: 120, nonAlcoholRelated: 200 },
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
      </ResponsiveGridLayout>
    </main>
  );
}
