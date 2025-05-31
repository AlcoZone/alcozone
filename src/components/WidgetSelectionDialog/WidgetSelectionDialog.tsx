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
  addedWidgetIds: string[];
};

const WidgetSelectionDialog = ({
  widgets,
  onAddWidget,
  addedWidgetIds,
}: WidgetSelectionDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const refs = useRef(new Map<string, HTMLDivElement>());
  const scrollToWidget = (id: string) => {
    setTimeout(() => {
      const targetWidget = refs.current.get(id);
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
          setSelectedWidgetId(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <AddButton />
      </DialogTrigger>

      <DialogContent
        className={cn(
          "transition-all duration-500 w-full max-h-[80vh] overflow-y-auto overflow-x-hidden p-0 rounded-lg scrollbar-rounded",
          selectedWidgetId ? "sm:max-w-[700px]" : "sm:max-w-[600px]"
        )}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="sticky top-0 z-20 bg-white w-full h-[50px] border-b px-4 flex items-center justify-between rounded-t-lg">
          <DialogTitle asChild>
            <h2 className="text-blue-850 text-lg font-semibold m-0">
              Selecciona un widget para agregar al dashboard
            </h2>
          </DialogTitle>

          <DialogClose asChild>
            <button className="text-muted-foreground hover:text-red-500 transition-colors">
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar</span>
            </button>
          </DialogClose>
        </div>

        <div className="space-y-3 mt-2 px-2">
          {widgets.map((widget) => {
            const isSelected = widget.id === selectedWidgetId;
            const isAdded = addedWidgetIds.includes(widget.id);
            return (
              <div
                key={widget.id}
                ref={(el) => {
                  if (el) refs.current.set(widget.id, el);
                }}
                onClick={() => {
                  if (isAdded) return;
                  scrollToWidget(widget.id);
                  setSelectedWidgetId(isSelected ? null : widget.id);
                }}
                className={cn(
                  isAdded
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer rounded transition-all duration-700 ease-in-out hover:text-blue-850 group",
                  isSelected ? "shadow-xl/30 p-4 text-blue-850" : "p-2 pl-5"
                  //selectedWidgetId !== null && !isSelected && "text-muted-foreground",
                )}
              >
                <h3
                  className={cn(
                    "font-medium text-base transition-transform duration-300",
                    !isSelected &&
                      "group-hover:translate-x-5 group-hover:scale-105"
                  )}
                >
                  {widget.name}
                  {isAdded && (
                    <span className="ml-2 text-sm text-red-500">
                      - Ya agregado
                    </span>
                  )}
                </h3>
                {isSelected && !isAdded && (
                  <div className="flex flex-col overflow-y-auto max-h-[250px] gap-3 sm:flex-row sm:overflow-hidden">
                    <p className="w-[210px] mt-2 text-sm text-foreground pl-3">
                      {widget.description}
                    </p>
                    <div className="w-[300px] h-[210px] rounded">
                      <div className="w-[600px] h-[200px] scale-[0.43] origin-top-left">
                        {widget.preview}
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={() => {
                          const selectedWidget = widgets.find(
                            (w) => w.id === selectedWidgetId
                          );
                          if (!selectedWidget) return;
                          onAddWidget(selectedWidget);
                          setDialogOpen(false);
                          setSelectedWidgetId(null);
                        }}
                        className="cursor-pointer bg-lime-750 hover:bg-lime-600"
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
