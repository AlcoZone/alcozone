import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

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

export default ConfirmButtons;