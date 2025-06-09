import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const ConfirmButtonsVariants: Record<string, { text: string; color: string; rounded: boolean }> = {
    registerNewUser: { text: "Registrar nuevo usuario", color: "bg-[#001391]", rounded: false },
    changePassword: { text: "Cambiar contraseña", color: "bg-[#001391]", rounded: true },
    login: { text: "Iniciar sesión", color: "bg-[#001391]", rounded: true },
    save: { text: "Guardar", color: "bg-[#001391]", rounded: true },
    changeUser: { text: "Cambiar nombre de usuario", color: "bg-[#001391]", rounded: true },
    resetPassword: { text: "Enviar", color: "bg-neutral-550", rounded: true },
    backToLogin: { text: "Volver al login", color: "bg-[#001391]", rounded: true,},
};

type ConfirmButtonsProps = {
    variant: keyof typeof ConfirmButtonsVariants;
    onClick?: () => void;
    disabled?: boolean;
    id?: string;
    testId?: string;
};

const ConfirmButtons = ({ variant, onClick, disabled, id, testId }: ConfirmButtonsProps) => {
    const { text, color, rounded } = ConfirmButtonsVariants[variant];

    return (
        <Button
            id={id}
            onClick={onClick}
            disabled={disabled}
            data-testid={testId}
            className={cn("cursor-pointer text-lg transition duration-500", color, { "rounded-full": rounded })}>
            {text}
        </Button>
    );
};

export default ConfirmButtons;
