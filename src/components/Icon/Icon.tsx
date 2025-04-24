import Image from "next/image";

type IconVariant = "user" | "lock" | "logo";

type IconProps = {
  variant: IconVariant;
  width?: number;
  height?: number;
};

export const Icon = ({ variant, width = 32, height = 32 }: IconProps) => {
  switch (variant) {
    case "user":
      return (
        <svg width={width} height={height} fill="black" viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      );

    case "lock":
      return (
        <svg width={width} height={height} fill="black" viewBox="0 0 24 24">
          <path d="M12 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6-7h-1V7a5 5 0 00-10 0v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-8-3a2 2 0 014 0v3H10V7z" />
        </svg>
      );

    case "logo":
      return (
        <Image
          src="/logo.png"
          alt="Alcozone logo"
          width={width}
          height={height}
        />
      );
  }
};
