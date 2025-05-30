import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithLabelProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export function TableInput({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
}: InputWithLabelProps) {
  return (
    <td className="px-4 py-2">
      <Label htmlFor={id} className="block text-sm font-medium">{label}</Label>
      <Input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full"
      />
    </td>
  );
}
