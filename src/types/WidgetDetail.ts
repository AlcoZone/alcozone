export type WidgetDetail = {
  id: number;
  uuid: string;
  name: string;
  description: string;
  minWidth: number;
  minHeight: number;
  preview?: React.ReactNode;
};
