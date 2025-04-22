import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { IoHome, IoPersonSharp } from "react-icons/io5";
import { FaChartColumn } from "react-icons/fa6";
import { FaDatabase, FaMapMarkedAlt } from "react-icons/fa";
import { RiFileUploadFill, RiFileDownloadFill } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";


const TabSwitchButtonsVariants: Record<string, { icon: ReactNode; text: string }> = {
    home: { icon: <IoHome/>, text: "Inicio" },
    dashboard: { icon: <FaChartColumn/>, text: "Dashboard" },
    database: { icon: <FaDatabase/>, text: "Base de datos" },
    map: { icon: <FaMapMarkedAlt/>, text: "Mapa interactivo" },
    account: { icon: <IoPersonSharp/>, text: "Mi cuenta" },
    upload: { icon: <RiFileUploadFill/>, text: "Cargar archivo" },
    download: { icon: <RiFileDownloadFill/>, text: "Descargar archivos" },
    logout: { icon: <SlLogout/>, text: "Cerrar sesión" },
};

type TabSwitchButtonsProps = {
    variant: keyof typeof TabSwitchButtonsVariants;
    color?: "default" | "active";
};

const TabSwitchButtons = ({ variant, color = "default" }: TabSwitchButtonsProps) => {
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
        <Button className={cn("bg-transparent hover:bg-transparent hover:text-blue-850 text-lg transition duration-300 hover:brightness-125", textColorMap[color])}>
            <span className={cn(iconColorMap[color])}>
                {icon}
            </span>
            {text}
        </Button>
    );
};

export default TabSwitchButtons;