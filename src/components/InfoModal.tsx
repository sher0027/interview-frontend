import { ReactNode } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';

interface InfoModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const InfoModal = ({ children, isOpen, onClose }: InfoModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent 
                p={0} 
				borderRadius="24px"
                width="fit-content"           
                maxWidth="none"            
                maxHeight="fit-content"  
            >
                <ModalCloseButton 
					style={{
						border: "none", 
						outline: "none", 
						// _focus: { boxShadow: "none" },
					}} />
                <ModalBody 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center"
                    p={0}
                >
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default InfoModal;
