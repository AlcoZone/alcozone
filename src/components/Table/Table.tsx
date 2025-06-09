"use client";

import {
  Table as BaseTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableVariant = "default" | "withActions";

type Column<T> = {
  header: string;
  accessor: keyof T;
};

type Action<T> = {
  label: string;
  onClick: (row: T) => void;
  className?: string;
};

type TableProps<T> = {
  variant?: TableVariant;
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
};

export function Table<T extends Record<string, any>>({
  variant = "default",
  columns,
  data,
  actions = [],
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border rounded">
      <BaseTable>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={String(col.accessor)}>{col.header}</TableHead>
            ))}
            {variant === "withActions" && <TableHead>Acción</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} data-testid={row.name}>
              {columns.map((col) => (
                <TableCell key={String(col.accessor)}>
                  {row[col.accessor]}
                </TableCell>
              ))}
              {variant === "withActions" && (
                <TableCell>
                  <div className="flex gap-2">
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => action.onClick(row)}
                        className={`text-sm underline ${action.className}`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </BaseTable>
    </div>
  );
}
