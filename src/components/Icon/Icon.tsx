import Image from "next/image";
import { LockIcon, UserIcon } from "lucide-react";

type IconVariant = "user" | "lock" | "logo";

type IconProps = {
  variant: IconVariant;
  width?: number;
  height?: number;
};

export const Icon = ({ variant, width = 40, height = 40 }: IconProps) => {
  switch (variant) {
    case "user":
      return <UserIcon width={width} height={height} />;

    case "lock":
      return <LockIcon width={width} height={height} />;

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
