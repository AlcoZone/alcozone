import React from "react";
import Image from "next/image";

type BannerProps = {
  background?: string;
  width?: number;
  height?: number;
};

export const Banner = ({ width = 300, height = 40 }: BannerProps) => {
  return (
    <div
      className={`w-full bg-[#04138b] flex justify-center items-center py-3 fixed bottom-0 left-0 right-0`}
    >
      <Image
        src="/eic.png"
        alt="Tecnológico de Monterrey Banner"
        width={width}
        height={height}
      />
    </div>
  );
};
