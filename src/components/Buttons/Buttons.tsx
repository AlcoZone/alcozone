import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { IoHome, IoPersonSharp } from "react-icons/io5";
import { FaChartColumn } from "react-icons/fa6";
import { FaDatabase, FaMapMarkedAlt } from "react-icons/fa";
import { RiFileUploadFill, RiFileDownloadFill } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";
import { RiAddLargeLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";


// ---------- TabSwitchButtons ----------

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
        default: "#656565",
        active: "#001391",
    };

    const iconColorMap: Record<string, string> = {
        default: "text-gray-500",
        active: "text-black",
    };

    return (
        <Button className="bg-transparent hover:bg-transparent text-lg transition duration-200 hover:brightness-125" style={{ color: textColorMap[color] }}>
            <span className={cn(iconColorMap[color])}>
                {icon}
            </span>
            {text}
        </Button>
    );
};


// ---------- ConfirmButtons  ----------

const ConfirmButtonsVariants: Record<string, { text: string; color: string; rounded: boolean }> = {
    registerNewUser: { text: "Registrar nuevo usuario", color: "#8C9093", rounded: false },
    changePassword: { text: "Cambiar contraseña", color: "#656565", rounded: true },
    login: { text: "Iniciar sesión", color: "#656565", rounded: true },
    save: { text: "Guardar", color: "#656565", rounded: true },
};

type ConfirmButtonsProps = {
    variant: keyof typeof ConfirmButtonsVariants;
};

const ConfirmButtons = ({ variant }: ConfirmButtonsProps) => {
    const { text, color, rounded } = ConfirmButtonsVariants[variant];

    return (
        <Button className={cn("text-lg transition duration-200 hover:brightness-110", { "rounded-full": rounded })}
            style={{ backgroundColor: color }}>
            {text}
        </Button>
    );
};


// ---------- AddButton   ----------

const AddButton = () => {
    return (
        <Button className={cn("w-10 h-10 flex items-center justify-center rounded-full transition duration-200 hover:brightness-150")}
            style={{ backgroundColor: "#367E14" }}>
            <RiAddLargeLine className="size-8"/>
        </Button>
    );
};


// ---------- HamburgerButton   ----------

const HamburgerButton = () => {
    return (
        <Button className={cn("w-8 h-8 bg-transparent hover:bg-transparent text-black")}>
            <RxHamburgerMenu className="size-8"/>
        </Button>
    );
};

export { TabSwitchButtons, ConfirmButtons, AddButton, HamburgerButton};