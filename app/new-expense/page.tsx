"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import { createClient } from '@/utils/supabase/client';
import { SubmitButton } from '../login/submit-button';
import DeployButton from '@/components/DeployButton';
import AuthButton from '@/components/AuthButton';

interface ExpenseFormData {
    name: string;
    label: string;
    category: string;
    cost: string;
    description: string;
    document: File | null;
}

export default function ExpenseForm() {
    const [formData, setFormData] = useState<ExpenseFormData>({
        name: '',
        label: '',
        category: '',
        cost: '',
        description: '',
        document: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prevFormData) => ({
            ...prevFormData,
            document: file,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const supabase = createClient();
            const { data, error } = await supabase.from('expenses').insert([formData]);
            if (error) {
                throw error;
            }
            console.log('Expense submitted successfully:', data);
            // Clear form data after submission
            setFormData({
                name: '',
                label: '',
                category: '',
                cost: '',
                description: '',
                document: null,
            });
        } catch (error) {
            console.error('Error submitting expense:', (error as Error).message);
        }
    };

    return (
        <div className="flex-1 w-full flex flex-col px-4">
            <div className="w-full mb-4 sticky top-0 bg-background">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center px-3 text-sm">
                        <DeployButton />
                        {/* <AuthButton /> */}
                    </div>
                </nav>
            </div>

            <h1 className="text-2xl font-semibold mb-4">Insérer une dépense</h1>
            <form onSubmit={handleSubmit} className="max-w-xl self-center bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <h1 className="text-xl font-medium mb-4">Informations</h1>
                {/* Name */}
                <div className="mb-3">
                    <label htmlFor="name" className="sr-only text-md text-dark-background">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md px-4 py-2 bg-inherit border mb-3 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        placeholder="Enter your name"
                    />
                </div>
                {/* Label */}
                <div className="mb-3">
                    <label htmlFor="label" className="sr-only text-md text-dark-background">
                        Label
                    </label>
                    <input
                        type="text"
                        name="label"
                        id="label"
                        value={formData.label}
                        onChange={handleChange}
                        className="w-full rounded-md px-4 py-2 bg-inherit border mb-3 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        placeholder="Enter label/title"
                    />
                </div>
                {/* Category */}
                <div className="mb-3">
                    <label htmlFor="category" className="sr-only text-md text-dark-background">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-md px-4 py-2 bg-inherit border mb-3 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                    >
                        {/* Add options for categories */}
                        <option value="">Select category</option>
                        <option value="Transport">Transport</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Office Equipment">Office Equipment</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                {/* Cost */}
                <div className="mb-3">
                    <label htmlFor="cost" className="sr-only text-md text-dark-background">
                        Cost (in Euros)
                    </label>
                    <input
                        type="text"
                        name="cost"
                        id="cost"
                        value={formData.cost}
                        onChange={handleChange}
                        className="w-full rounded-md px-4 py-2 bg-inherit border mb-3 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        placeholder="Enter cost"
                    />
                </div>
                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="description" className="sr-only text-md text-dark-background">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-md px-4 py-2 bg-inherit border mb-3 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                        placeholder="Enter description"
                        maxLength={140}
                    />
                </div>
                {/* Document Upload */}
                <div className="mb-3">
                    <label htmlFor="document" className="sr-only text-md text-dark-background">
                        Document Upload
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        id="document"
                        name="document"
                        onChange={handleFileChange}
                        className="w-full rounded-md px-4 py-2 bg-inherit border mb-3 z-20 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
                    />
                </div>
                {/* Submit Button */}
                <div className="flex items-center justify-center">
                    <SubmitButton className="bg-primary rounded-md px-4 py-2 text-background font-semibold mb-2">
                        Submit
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}

