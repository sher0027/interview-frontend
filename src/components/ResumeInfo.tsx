import { useState, useEffect } from "react";
import { Box, Button, Heading, Stack, Textarea, SimpleGrid, FormControl, FormLabel, Flex, Select } from "@chakra-ui/react";
import EditableField from './EditableField';
import UploadCard from "./UploadCard";
import { uploadResume, fetchResume, updateResume } from "../api/resume";
import { formatField, parseField } from "../utils/format";

const ResumeInfo = () => {
    const [resumeInfo, setResumeInfo] = useState<{
        name: string;
        email: string;
        phone: string;
        address: string;
        education: { [key: string]: any }[];
        workExperience: { [key: string]: any }[];
        skills: string[];
    } & { [key: string]: any }>({
        name: "",
        email: "",
        phone: "",
        address: "",
        education: [],
        workExperience: [],
        skills: [],
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resumeVersions, setResumeVersions] = useState([]); 
    const [selectedVersion, setSelectedVersion] = useState<number>(1);

    const fields = [
        { label: "Name", name: "name" },
        { label: "Email", name: "email" },
        { label: "Phone", name: "phone" },
        { label: "Address", name: "address" },
    ];

    const otherFields = [
        { label: "Education", name: "education", isTextarea: true, isArray: true },
        { label: "Work Experience", name: "workExperience", isTextarea: true, isArray: true },
        { label: "Skills", name: "skills", isTextarea: true, isArray: false },
    ];

    const loadResumes = async () => {
        try {
            setLoading(true);
            const response = await fetchResume();
            if (response.status === 200 && response.data) {
                const resumes = response.data.resumes || [];
                setResumeVersions(resumes);

                const latestResume = resumes.reduce((latest: { version: number; }, current: { version: number; }) =>
                    current.version > latest.version ? current : latest
                );
                console.log(latestResume);
                setSelectedVersion(latestResume.version);
                setResumeInfo(latestResume); 
            }
        } catch (error) {
            console.error("Error fetching resumes:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadResume = async (version: number) => {
        try {
            setLoading(true);
            const response = await fetchResume(version); 
            if (response.status === 200 && response.data) {
                setResumeInfo(response.data);
            }
        } catch (error) {
            console.error("Error fetching resume:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadResumes();
    }, []);

    const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const version = Number(e.target.value);
        setSelectedVersion(version);
        loadResume(version); 
    };

    const handleFileUpload = async (file: File) => {
        setLoading(true);
        try {
            const response = await uploadResume(file); 
            if (response.status === 200) {
                await loadResumes(); 
            } else {
                alert("Failed to parse PDF content.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file.");
        } finally {
            setLoading(false);
        }
    };

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

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await updateResume(selectedVersion,resumeInfo);
            await loadResume(selectedVersion);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating resume:", error);
            alert("Error updating resume information.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box m={0} p={6} boxShadow="2px 0px 10px rgba(3, 3, 3, 0.1)" borderRadius="24px">
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
                                            value={
                                                field.isArray && Array.isArray(resumeInfo[field.name])
                                                    ? formatField(resumeInfo[field.name])
                                                    : resumeInfo[field.name as keyof typeof resumeInfo]
                                            }
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setResumeInfo((prevInfo) => ({
                                                    ...prevInfo,
                                                    [field.name]: field.isArray
                                                        ? parseField(value)
                                                        : value,
                                                }));
                                            }}
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
                        <FormControl>
                            <Select value={selectedVersion || ""} onChange={handleVersionChange}>
                                {resumeVersions.map((resume: any) => (
                                    <option key={resume.version} value={resume.version}>
                                        Version {resume.version}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <Button width="100%" onClick={isEditing ? handleSubmit : handleEditToggle}>
                            {isEditing ? "Save" : "Edit"}
                        </Button>
                        <UploadCard onUpload={handleFileUpload} loading={loading} />
                    </Flex>
                </SimpleGrid>
            </Stack>
        </Box>
    );
};

export default ResumeInfo;
