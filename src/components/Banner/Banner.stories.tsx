import React from "react";
import { Banner } from "./Banner";

export default {
  title: "Components/Banner",
  component: Banner,
};

export const Default = () => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    <div style={{ flex: 1 }}>Page Content</div>
    <Banner />
  </div>
);
