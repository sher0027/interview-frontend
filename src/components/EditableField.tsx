import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface EditableFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isEditing: boolean;
}

const EditableField = ({ label, name, value, onChange, isEditing }: EditableFieldProps) => {
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <Input
                width="300px"
                name={name}
                value={value}
                onChange={onChange}
                isReadOnly={!isEditing}
                bg={isEditing ? "white" : "gray.100"}
            />
      </FormControl>
    );
};

export default EditableField;
