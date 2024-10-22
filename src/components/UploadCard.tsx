import { useState } from "react";
import { Box, Text, Button, Input, Icon } from "@chakra-ui/react";
import { FaFilePdf } from "react-icons/fa";

const UploadCard = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === "application/pdf") {
        setSelectedFile(file);
        } else {
        alert("Please upload a valid PDF file.");
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            console.log("Uploading file: ", selectedFile.name);
        }
    };

    return (
        <Box
            borderRadius="24px"
            boxShadow="2px 0px 10px rgba(3, 3, 3, 0.1)"
            p={6}
            textAlign="center"
            bg="secondary"
        >
        <Input 
            type="file" 
            accept="application/pdf" 
            onChange={handleFileChange}
            mb={4}
            hidden
            id="pdf-upload"
        />
        <label htmlFor="pdf-upload">
            <Box
                as="div"
                borderRadius="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderWidth="2px"
                borderStyle="dashed"
                borderColor="gray.400"
                padding="40px"
                cursor="pointer"
                _hover={{ borderColor: "primary" }}
            >
                <Icon as={FaFilePdf} w={8} h={8} color="primary" mr={2} />
                <Text>{selectedFile ? selectedFile.name : "Click to upload PDF"}</Text> 
            </Box>
        </label>

        {selectedFile && (
            <Button colorScheme="teal" onClick={handleUpload} mt={4}>
            Upload File
            </Button>
        )}
        </Box>
    );
};

export default UploadCard;
