import React from "react";
import Image from "next/image";

export const Banner = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#04138b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px 0",
        position: "relative",
        bottom: 0,
      }}
    >
      <Image
        src="/eic.png"
        alt="Tecnológico de Monterrey Banner"
        width={300}
        height={40}
      />
    </div>
  );
};
