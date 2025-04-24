import React from "react";
import { Banner } from "./Banner";

export default {
  title: "Components/Banner",
  component: Banner,
  argTypes: {
    width: { control: { type: "range", min: 100, max: 500 } },
    height: { control: { type: "range", min: 20, max: 100 } },
  },
};

export const Default = () => <Banner width={300} height={40} />;
