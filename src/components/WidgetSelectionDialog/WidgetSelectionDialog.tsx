"use client";

import { Button } from "@/components/ui/button";
import { WidgetDetail } from "@/types/WidgetDetail";
import AddButton from "../AddButton/AddButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type WidgetSelectionDialogProps = {
  widgets: WidgetDetail[];
  onAddWidget: (widget: WidgetDetail) => void;
  addedWidgetUuids: string[];
};

const WidgetSelectionDialog = ({
  widgets,
  onAddWidget,
  addedWidgetUuids,
}: WidgetSelectionDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWidgetUuid, setSelectedWidgetUuid] = useState<string | null>(null);
  const refs = useRef(new Map<string, HTMLDivElement>());
  const scrollToWidget = (uuid: string) => {
    setTimeout(() => {
      const targetWidget = refs.current.get(uuid);
      if (targetWidget) {
        targetWidget.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 500);
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(isOpen) => {
        setDialogOpen(isOpen);
        if (!isOpen) {
          setSelectedWidgetUuid(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <AddButton data-testid="add-button" />
      </DialogTrigger>

      <DialogContent
        className={cn(
          "transition-all duration-500 w-full max-h-[80vh] overflow-y-auto overflow-x-hidden p-0 rounded-lg scrollbar-rounded",
          selectedWidgetUuid ? "sm:max-w-[750px]" : "sm:max-w-[600px]"
        )}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        data-testid="dialog"
      >
        <div className="sticky top-0 z-20 bg-white w-full h-[50px] border-b px-4 flex items-center justify-between rounded-t-lg">
          <DialogTitle asChild>
            <h2 className="text-blue-850 text-lg font-semibold m-0" data-testid="dialog-title">
              Selecciona un widget para agregar al dashboard
            </h2>
          </DialogTitle>

          <DialogClose asChild>
            <button className="text-muted-foreground hover:text-red-500 transition-colors" data-testid="close-button">
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar</span>
            </button>
          </DialogClose>
        </div>

        <div className="space-y-3 px-2">
          {widgets.map((widget) => {
            const testIdPrefix = widget.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-");
            const isSelected = widget.uuid === selectedWidgetUuid;
            const isAdded = addedWidgetUuids.includes(widget.uuid);
            return (
              <div
                key={widget.uuid}
                ref={(el) => {
                  if (el) refs.current.set(widget.uuid, el);
                }}
                onClick={() => {
                  if (isAdded) return;
                  scrollToWidget(widget.uuid);
                  setSelectedWidgetUuid(isSelected ? null : widget.uuid);
                }}
                className={cn(
                  isAdded
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer rounded transition-all duration-700 ease-in-out hover:text-blue-850 group",
                  isSelected ? "shadow-xl/30 p-4 text-blue-850" : "p-2 pl-5"
                )}
                data-testid={`${testIdPrefix}-widget`}
              >
                <h3
                  className={cn(
                    "font-medium text-lg transition-transform duration-300",
                    !isSelected &&
                    "group-hover:translate-x-5 group-hover:scale-105 text-base"
                  )}
                  data-testid={`${testIdPrefix}-title`}
                >
                  {widget.title}
                  {isAdded && (
                    <span className="ml-2 text-sm text-red-500" data-testid={`${testIdPrefix}-already-added-message`}>
                      - Ya agregado
                    </span>
                  )}
                </h3>
                {isSelected && !isAdded && (
                  <div className="flex flex-col overflow-y-auto max-h-[850px] gap-3 sm:flex-row sm:overflow-hidden">
                    <p className="w-[210px] mt-2 text-base text-foreground pl-3" data-testid={`${testIdPrefix}-description`}>
                      {widget.description}
                    </p>
                    <div className="w-[300px] h-[310px] rounded">
                      <div className="w-[600px] h-[300px] scale-[0.75] origin-top-left ml-5" data-testid={`${testIdPrefix}-preview`}>
                        {widget.preview}
                      </div>
                    </div>
                    <div className="flex items-end ">
                      <Button
                        onClick={() => {
                          const selectedWidget = widgets.find(
                            (w) => w.uuid === selectedWidgetUuid
                          );
                          if (!selectedWidget) return;
                          onAddWidget(selectedWidget);
                          setDialogOpen(false);
                          setSelectedWidgetUuid(null);
                        }}
                        className="cursor-pointer bg-lime-750 hover:bg-lime-600 ml-18"
                        data-testid="add-widget-button"
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WidgetSelectionDialog;
