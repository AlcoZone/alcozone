import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const ConfirmButtonsVariants: Record<string, { text: string; color: string; rounded: boolean }> = {
    registerNewUser: { text: "Registrar nuevo usuario", color: "bg-gray-450", rounded: false },
    changePassword: { text: "Cambiar contraseña", color: "bg-neutral-550", rounded: true },
    login: { text: "Iniciar sesión", color: "bg-neutral-550", rounded: true },
    save: { text: "Guardar", color: "bg-neutral-550", rounded: true },
    changeUser: { text: "Cambiar usuario", color: "bg-neutral-550", rounded: true },
};

type ConfirmButtonsProps = {
    variant: keyof typeof ConfirmButtonsVariants;
    onClick?: () => void;
};

const ConfirmButtons = ({ variant, onClick }: ConfirmButtonsProps) => {
    const { text, color, rounded } = ConfirmButtonsVariants[variant];

    return (
        <Button
            onClick={onClick}
            className={cn("text-lg transition duration-500", color, { "rounded-full": rounded })}>
            {text}
        </Button>
    );
};

export default ConfirmButtons;