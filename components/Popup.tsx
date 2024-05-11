"use client"

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Link, Textarea } from "@nextui-org/react";
import { Expense } from "./TableNextUI";
import { SubmitButton } from "@/app/login/submit-button";
import { updateDepenseCommentaire } from "./UpdateDepense";

interface ExpensePopupProps {
    expense: Expense;
    onClose: () => void;
}

const ExpensePopup: React.FC<ExpensePopupProps> = ({ expense, onClose }) => {
    const [commentaire, setCommentaire] = useState<string>("");

    const handleDownloadFile = () => {
        console.log("Downloading file:", expense.file_url);
    };

    const handleSave = () => {
        console.log("Comment added: ", commentaire);
        try {
            updateDepenseCommentaire(expense.id, commentaire);
            onClose();
        } catch (error) {
            console.error("Can't update comment", error);
        }
    };

    return (
        <Modal
            isOpen={true}
            onOpenChange={onClose}
            size="xl"
            isDismissable={false}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{expense.title}</ModalHeader>
                        <ModalBody>
                            <p>Numéro Employé: {expense.numeroemployee}</p>
                            <p>Catégorie: {expense.category}</p>
                            <p>Coût: € {expense.cost}</p>
                            <p>Description: {expense.description}</p>
                            <div className="flex justify-end mt-4">
                                <Button variant="bordered" color="success" onClick={handleDownloadFile}>Télécharger Document</Button>
                            </div>
                            <form>
                                <Textarea
                                    label="Ajouter Commentaire"
                                    placeholder="Entrer votre commentaire ici"
                                    rows={3}
                                    name="commentaire"
                                    className="mt-4"
                                    value={commentaire}
                                    onChange={(e) => setCommentaire(e.target.value)}
                                />
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSave}>
                                Enregistrer
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ExpensePopup;
