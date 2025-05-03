import { Button } from "../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";

type HamburgerButtonProps = {
    onClick?: () => void;
};

const HamburgerButton = ({ onClick }: HamburgerButtonProps) => {
    return (
        <Button
            onClick={onClick}
            className="w-8 h-8 bg-transparent hover:bg-transparent text-black shadow-none">
            <RxHamburgerMenu className="size-6" />
        </Button>
    );
};

export default HamburgerButton;