import React, { useState } from 'react';
import { Box, Heading, Button, Stack, Textarea, FormControl, FormLabel, Flex } from "@chakra-ui/react";
import EditableField from './EditableField';  

const CompanyInfo = () => {
    const [companyInfo, setCompanyInfo] = useState({
        companyName: "Google",
        roleName: "Software Engineer",
        jobDescription: `• Design, develop, and deliver technical solutions rapidly, end to end, and across the full stack.
        • Work collaboratively with other engineers, QA, Product Managers, UX, and other cross-functional teams as needed.
        • Uphold and maintain a high bar for code quality and robustness of production systems.`,
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCompanyInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
        }));
    };

  const fields = [
        { label: "Company Name", name: "companyName", type: "text" },
        { label: "Role Name", name: "roleName", type: "text" },
        { label: "Job Description", name: "jobDescription", type: "textarea" },
  ];

  return (
    <Box 
        m={0} 
        p={6} 
        boxShadow="2px 0px 10px rgba(3, 3, 3, 0.1)"
        borderRadius="24px"
        maxWidth="600px"
    >
      <Heading mb={5}>Company Information</Heading>

      <Stack spacing={6}>
        <Flex flexDirection="column" gap={4}>
            {fields.map((field) => (
                field.type === "textarea" ? (
                    <FormControl key={field.name}>
                        <FormLabel>{field.label}</FormLabel>
                        <Textarea
                            name={field.name}
                            value={companyInfo[field.name as keyof typeof companyInfo]}
                            onChange={handleChange}
                            isReadOnly={!isEditing}
                            bg={isEditing ? "white" : "gray.100"}
                            placeholder={`Add ${field.label.toLowerCase()}`}
                        />
                    </FormControl>
                ) : (
                    <EditableField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={companyInfo[field.name as keyof typeof companyInfo]}
                        onChange={handleChange}
                        isEditing={isEditing}
                    />
                )
            ))}
        </Flex>

        <Button width="100%" onClick={handleEditToggle}>
            {isEditing ? "Save" : "Edit"}
        </Button>
      </Stack>
    </Box>
  );
};

export default CompanyInfo;
