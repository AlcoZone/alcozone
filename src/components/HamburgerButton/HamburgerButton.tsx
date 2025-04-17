import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { RxHamburgerMenu } from "react-icons/rx";

const HamburgerButton = () => {
    return (
        <Button className={cn("w-8 h-8 bg-transparent hover:bg-transparent text-black")}>
            <RxHamburgerMenu className="size-8"/>
        </Button>
    );
};

export default HamburgerButton;