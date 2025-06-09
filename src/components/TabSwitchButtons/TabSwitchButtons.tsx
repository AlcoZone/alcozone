import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { IoHome, IoPersonSharp } from "react-icons/io5";
import { FaChartColumn } from "react-icons/fa6";
import { FaDatabase, FaMapMarkedAlt } from "react-icons/fa";
import { RiFileDownloadFill } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";


const TabSwitchButtonsVariants: Record<string, { icon: ReactNode; text: string }> = {
    home: { icon: <IoHome/>, text: "Inicio" },
    dashboard: { icon: <FaChartColumn/>, text: "Dashboard" },
    database: { icon: <FaDatabase/>, text: "Base de datos" },
    users: { icon: <FaDatabase/>, text: "Base de datos usuarios" },
    map: { icon: <FaMapMarkedAlt/>, text: "Mapa interactivo" },
    account: { icon: <IoPersonSharp/>, text: "Mi cuenta" },
    revisions: { icon: <RiFileDownloadFill/>, text: "Revisiones" },
    logout: { icon: <SlLogout/>, text: "Cerrar sesión" },
};

type TabSwitchButtonsProps = {
    variant: keyof typeof TabSwitchButtonsVariants;
    color?: "default" | "active";
    onClick?: () => void;
};

const TabSwitchButtons = ({ variant, color = "default", onClick }: TabSwitchButtonsProps) => {
    const { icon, text } = TabSwitchButtonsVariants[variant];

    const textColorMap: Record<string, string> = {
        default: "text-neutral-550",
        active: "text-blue-850",
    };

    const iconColorMap: Record<string, string> = {
        default: "text-gray-500",
        active: "text-black",
    };

    return (
        <Button variant="ghost"
            data-testid={`menu-btn-${variant}`}
            onClick={onClick}
            className={cn("cursor-pointer w-full justify-start text-sm gap-2 font-normal px-2 py-1 bg-transparent hover:bg-transparent hover:text-blue-850 transition-all", textColorMap[color])}>
            <span className={cn(iconColorMap[color], "text-base")}>
                {icon}
            </span>
            {text}
        </Button>
    );
};

export default TabSwitchButtons;