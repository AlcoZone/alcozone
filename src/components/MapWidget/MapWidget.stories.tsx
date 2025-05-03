import type { Meta, StoryObj } from "@storybook/react";

import { MapWidget } from "./MapWidget";

const meta: Meta<typeof MapWidget> = {
  title: "Widgets/MapWidget",
  component: MapWidget,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["clusterize", "predict"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MapWidget>;

const mockClusterData = [
  { id: "1", latitude: 19.4326, longitude: -99.1332 },
  { id: "2", latitude: 19.4426, longitude: -99.1232 },
  { id: "3", latitude: 19.4526, longitude: -99.1432 },
  { id: "4", latitude: 19.4356, longitude: -99.1382 },
];

const mockPredictionData = {
  monday: [
    { latitude: 19.4326, longitude: -99.1332 },
    { latitude: 19.4376, longitude: -99.1300 },
  ],
  saturday: [
    { latitude: 19.4500, longitude: -99.1350 },
    { latitude: 19.4520, longitude: -99.1380 },
    { latitude: 19.4550, longitude: -99.1400 },
  ],
  sunday: [
    { latitude: 19.4600, longitude: -99.1200 },
  ],
};

export const Clusterize: Story = {
  args: {
    variant: "clusterize",
    data: mockClusterData,
  },
};

export const Predict: Story = {
  args: {
    variant: "predict",
    data: mockPredictionData,
  },
};
