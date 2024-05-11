import { useState, ChangeEvent, FormEvent } from 'react';
import { createClient } from '@/utils/supabase/client';
import { SubmitButton } from '../login/submit-button';
import DeployButton from '@/components/DeployButton';
import AuthButton from '@/components/AuthButton';
import { Textarea } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from "uuid";

export default function ExpenseForm() {
    const handleSubmit = async (formData: FormData) => {
        "use server"

        console.log('Form data collected', formData);

        const numeroemployee = formData.get("name") as string;
        const title = formData.get("label") as string;
        const category = formData.get("category") as string;
        const cost = formData.get("cost") as string;
        const description = formData.get("description") as string;
        const documentFile = formData.get("document") as File;

        const supabase = createClient();

        const fileNameSplit = documentFile.name.split('.');
        const fileExtension = fileNameSplit.pop();
        const fileNameWithoutExtension = fileNameSplit.join('.');

        const uniqueDocName = `${fileNameWithoutExtension}-${uuidv4()}.${fileExtension}`;

        const currentDate = new Date().toISOString().split('T')[0];

        const { data: fileData, error: fileError } = await supabase
            .storage
            .from('documents-commerciaux')
            .upload(uniqueDocName, documentFile);

        if (fileError) {
            console.error("Error uploading file:", fileError);
            throw new Error('Error uploading file');
        }
        // console.log('File data:', fileData);

        const documentUrl = fileData.path;

        const { data: depenseData, error: depenseError } = await supabase
            .from('depenses')
            .insert([
                {
                    numeroemployee,
                    title,
                    category,
                    cost: parseFloat(cost),
                    description,
                    file_url: documentUrl,
                    created_at: currentDate,
                    status: "attente",
                }
            ]);

        if (depenseError) {
            console.error('Error inserting expense data:', depenseError);
            throw new Error('Error inserting expense data');
        }

        console.log("L'ajout du nouveau frais est accomplie", depenseData);
        return redirect("/new-expense?message=L'action d'ajout du nouveau frais est accomplie !");
    };

    return (
        <div className="flex-1 w-full flex flex-col">
            <div className="w-full mb-4 sticky top-0 bg-background">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center px-3 text-sm">
                        <DeployButton />
                    </div>
                </nav>
            </div>

            <h1 className="text-2xl font-semibold mx-12 mb-4">Insérer une dépense</h1>
            <form className="max-w-xl self-center bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <h1 className="text-xl font-medium mb-4">Informations</h1>
                {/* Name */}
                <div className="mb-3">
                    <label htmlFor="name" className="sr-only text-md text-dark-background">
                        Numéro employé
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="w-full rounded-md px-4 py-2 bg-inherit border mb-3 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        placeholder="Numéro employé"
                    />
                </div>
                {/* Label */}
                <div className="mb-3">
                    <label htmlFor="label" className="sr-only text-md text-dark-background">
                        Libelé de la dépense
                    </label>
                    <input
                        type="text"
                        name="label"
                        className="w-full rounded-md px-4 py-2 bg-inherit border mb-3 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        placeholder="Libelé de la dépense"
                    />
                </div>
                {/* Category */}
                <div className="mb-3">
                    <label htmlFor="category" className="sr-only text-md text-dark-background">
                        Catégorie
                    </label>
                    <select
                        // id="category"
                        name="category"
                        className="w-full rounded-md px-4 py-2 bg-inherit border mb-3 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                    >
                        <option className="text-black-100" value="">Sélectionner une catégorie</option>
                        <option value="Forfaits">Connexion Internet</option>
                        <option value="Utilities">Médical/Santé</option>
                        <option value="Office Equipment">Équipments de bureau</option>
                        <option value="Transport">Transport/Logistiques</option>
                    </select>
                </div>
                {/* Cost */}
                <div className="mb-3">
                    <label htmlFor="cost" className="sr-only text-md text-dark-background">
                        Coût (en Euros)
                    </label>
                    <input
                        type="text"
                        name="cost"
                        className="w-full rounded-md px-4 py-2 bg-inherit border mb-3 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        placeholder="Entrer le coût en euros"
                    />
                </div>
                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="description" className="sr-only text-md text-dark-background">
                        Description
                    </label>
                    <Textarea
                        label="description"
                        placeholder='Entrer une description pour cette dépense'
                        // className='w-full rounded-md bg-inherit border mb-3 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary'
                        classNames={{
                            base: "w-full mb-3 z-20",
                            // inputWrapper: !isFocused ? "bg-white border rounded-md bg-inherit" : "bg-white border rounded-md bg-inherit border-2 border-primary",
                            inputWrapper: "bg-white border rounded-md bg-inherit border",
                            label: "hidden",
                            input: "text-base"
                        }}
                        rows={3}
                        maxLength={280}
                        name='description'
                    />
                </div>
                {/* Document Upload */}
                <div className="mb-3 mt-2">
                    <label htmlFor="document" className="sr-only text-md text-dark-background">
                        Document Upload
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        name="document"
                        className="w-full rounded-md px-4 py-2 bg-inherit border mb-3 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                    />
                </div>
                {/* Submit Button */}
                <div className="flex items-center justify-center">
                    <SubmitButton
                        formAction={handleSubmit}
                        className="w-full bg-primary rounded-md px-4 py-2 text-background font-semibold mb-2"
                        pendingText='En cours...'
                    >
                        Submit
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}

