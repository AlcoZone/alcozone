import React from "react";
import Image from "next/image";

export const Banner = () => {
  return (
    <div className="w-full bg-[#04138b] flex justify-center items-center py-3 relative bottom-0">
      <Image
        src="/eic.png"
        alt="Tecnológico de Monterrey Banner"
        width={300}
        height={40}
      />
    </div>
  );
};
