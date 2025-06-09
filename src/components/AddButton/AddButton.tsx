import { Button } from "../ui/button";
import { RiAddLargeLine } from "react-icons/ri";

type AddButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;


const AddButton = (props: AddButtonProps) => {
    return (
        <Button
            {...props}
            className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-blue-850 transition duration-500 hover:bg-blue-700">
            <RiAddLargeLine className="size-8" />
        </Button>
    );
};

export default AddButton;