import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DownloadCsvModal from "./DownloadCsvModal";

const meta: Meta<typeof DownloadCsvModal> = {
  title: "Components/Modals/DownloadCsvModal",
  component: DownloadCsvModal,
  tags: ["autodocs"],
  args: {
    reports: [
      "Reporte 1",
      "Reporte 2",
      "Reporte 3",
      "Reporte 4",
    ],
    onClose: action("Modal cerrado"),
    onDownload: action("Descargando reporte"),
  },
};

export default meta;
type Story = StoryObj<typeof DownloadCsvModal>;

export const Default: Story = {};