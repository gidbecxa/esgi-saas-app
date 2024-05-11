'use client'

import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const AccessDeniedModal: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        onOpen();
    }, []);

    const handleRedirectToHome = () => {
        onClose();
        router.push("/");
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={handleRedirectToHome} isDismissable={false} backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="text-2xl">Non Autorisé</ModalHeader>
                        <ModalBody>
                            <h1 className="text-lg font-medium">Désolé,</h1>
                            <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
                            <p>Veuillez contacter votre administrateur pour en savoir plus.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="warning" variant="light" onPress={handleRedirectToHome}>
                                Aller à l'Acceuil
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AccessDeniedModal;
