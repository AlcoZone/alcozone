import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const ConfirmButtonsVariants: Record<string, { text: string; color: string; rounded: boolean }> = {
    registerNewUser: { text: "Registrar nuevo usuario", color: "bg-gray-450", rounded: false },
    changePassword: { text: "Cambiar contraseña", color: "bg-neutral-550", rounded: true },
    login: { text: "Iniciar sesión", color: "bg-neutral-550", rounded: true },
    save: { text: "Guardar", color: "bg-neutral-550", rounded: true },
    changeUser: { text: "Cambiar usuario", color: "bg-neutral-550", rounded: true },
    resetPassword: { text: "Enviar", color: "bg-neutral-550", rounded: true },
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