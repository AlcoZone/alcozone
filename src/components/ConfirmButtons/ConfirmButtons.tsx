import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const ConfirmButtonsVariants: Record<string, { text: string; color: string; rounded: boolean }> = {
    registerNewUser: { text: "Registrar nuevo usuario", color: "bg-[#001391]", rounded: false },
    changePassword: { text: "Cambiar contraseña", color: "bg-[#001391] ", rounded: true, },
    login: { text: "Iniciar sesión", color: "bg-[#001391]", rounded: true },
    save: { text: "Guardar", color: "bg-[#001391]", rounded: true },
    changeUser: { text: "Cambiar nombre de usuario", color: "bg-[#001391] ", rounded: true },
};

type ConfirmButtonsProps = {
    variant: keyof typeof ConfirmButtonsVariants;
    onClick?: () => void;
    disabled?: boolean;
};

const ConfirmButtons = ({ variant, onClick, disabled }: ConfirmButtonsProps) => {
    const { text, color, rounded } = ConfirmButtonsVariants[variant];

    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            className={cn("cursor-pointer text-lg transition duration-500", color, { "rounded-full": rounded })}>
            {text}
        </Button>
    );
};

export default ConfirmButtons;