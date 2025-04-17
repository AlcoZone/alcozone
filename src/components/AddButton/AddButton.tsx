import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { RiAddLargeLine } from "react-icons/ri";


const AddButton = () => {
    return (
        <Button className={cn("w-10 h-10 flex items-center justify-center rounded-full transition duration-200 hover:brightness-150")}
            style={{ backgroundColor: "#367E14" }}>
            <RiAddLargeLine className="size-8"/>
        </Button>
    );
};

export default AddButton;