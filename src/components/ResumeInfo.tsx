import { useState } from "react";
import { Box, Button, Heading, Stack, Textarea, SimpleGrid, FormControl, FormLabel, Flex } from "@chakra-ui/react";
import EditableField from './EditableField';  
import UploadCard from "./UploadCard";

const ResumeInfo = () => {
    const [resumeInfo, setResumeInfo] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Cityville",
        linkedIn: "linkedin.com/in/johndoe",
        education: "B.Sc in Computer Science, XYZ University",
        workExperience: "Software Engineer at ABC Corp for 2 years",
        skills: "React, Node.js, Python, SQL",
    });

    const [isEditing, setIsEditing] = useState(false);

    const fields = [
        { label: "Name", name: "name" },
        { label: "Email", name: "email" },
        { label: "Phone", name: "phone" },
        { label: "Address", name: "address" },
        // { label: "LinkedIn", name: "linkedIn" },
    ];

    const otherFields = [
        { label: "Education", name: "education", isTextarea: true },
        { label: "Work Experience", name: "workExperience", isTextarea: true },
        { label: "Skills", name: "skills", isTextarea: true },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
        }));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = () => {
        setIsEditing(false);
        console.log("Resume Info Updated:", resumeInfo);
    };

    return (
        <Box 
            m="auto" 
            p={6} 
            boxShadow="2px 0px 10px rgba(3, 3, 3, 0.1)"
            borderRadius="24px"
        >
            <Heading mb={5}>Resume Information</Heading>

            <Stack spacing={6} mb={4}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    <Flex flexDirection="column" gap={4}>
                        {fields.map((field) => (
                            <EditableField
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            value={resumeInfo[field.name as keyof typeof resumeInfo]}
                            onChange={handleChange}
                            isEditing={isEditing}
                            />
                        ))}
                    </Flex>
                    <Flex flexDirection="column" justifyContent="space-around">
                        {otherFields.map((field) => (
                        <Box key={field.name}>
                        {field.isTextarea ? (
                            <FormControl>
                                <FormLabel>{field.label}</FormLabel>
                                <Textarea
                                    name={field.name}
                                    value={resumeInfo[field.name as keyof typeof resumeInfo]}
                                    onChange={handleChange}
                                    isReadOnly={!isEditing}
                                    bg={isEditing ? "white" : "gray.100"}
                                    placeholder={`Add ${field.label.toLowerCase()}`}
                                />
                            </FormControl>
                        ) : (
                            <EditableField
                                label={field.label}
                                name={field.name}
                                value={resumeInfo[field.name as keyof typeof resumeInfo]}
                                onChange={handleChange}
                                isEditing={isEditing}
                            />
                        )}
                        </Box>
                    ))}
                    </Flex>

                    <Flex flexDirection="column" justifyContent="center" gap={4}>
                        <Button width="100%" onClick={isEditing ? handleSubmit : handleEditToggle}>
                            {isEditing ? "Save" : "Edit"}
                        </Button>
                        <UploadCard></UploadCard>
                    </Flex>
                
                </SimpleGrid>
                
            </Stack>
        </Box>
    );
};

export default ResumeInfo;
