'use client'

import { createClient } from '@/utils/supabase/client';
import { Chip, ChipProps, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, getKeyValue } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

import { EyeIcon } from './EyeIcon';
import { EditIcon } from './EditIcon';
import { DeleteIcon } from './DeleteIcon';
import ExpensePopup from './Popup';
import { CheckmarkIcon } from './CheckIcon';

export interface Expense {
    id: number;
    numeroemployee: string;
    title: string;
    category: string;
    cost: number;
    description: string;
    file_url: string;
    status: string;
    comment: string;
    created_at: string;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
    valide: "success",
    'non valide': "danger",
    'en attente': "warning",
};

const ExpenseTable: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

    const handleEyeIconClick = (expense: Expense) => {
        setSelectedExpense(expense);
    };

    const doNothing = () => {
        console.log('Just a dummy function');
    }

    const fetchExpenses = async () => {
        const supabase = createClient();

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
            console.error('Error fetching user:', error);
            return;
        }

        const { data: userData, error: userError } = await supabase.from('users').select('numeroemployee').eq('email', user?.email ?? '');
        if (userError) {
            console.error('Couldn\'t fetch user\'s data: ', userError);
            return;
        }

        const { data: depenseData, error: depenseError } = await supabase.from('depenses').select().eq('numeroemployee', userData?.[0]?.numeroemployee ?? '');
        if (depenseError) {
            console.error('Error fetching expenses:', depenseError);
            return;
        }

        setExpenses(depenseData as Expense[]);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const columns = [
        {
            key: "status",
            label: "STATUS",
        },
        {
            key: "title",
            label: "Libelé",
        },
        {
            key: "category",
            label: "Catégorie",
        },
        {
            key: "cost",
            label: "Coût"
        },
        {
            key: "description",
            label: "Description"
        },
        {
            key: "created_at",
            label: "Date créé",
        },
        {
            key: "actions",
            label: "Actions"
        },
    ];

    const renderCell = React.useCallback((
        depense: Expense,
        columnKey: React.Key,
        handleEyeIconClick: (expense: Expense) => void
    ) => {
        const cellValue = depense[columnKey as keyof Expense];

        switch (columnKey) {
            case "status":
                return (
                    <Chip className='capitalize' color={statusColorMap[depense.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        {/* <Tooltip content="Voir Plus">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleEyeIconClick(depense)}>
                                <EyeIcon />
                            </span>
                        </Tooltip> */}
                        <Tooltip content="Approuver">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Supprimer">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            case "cost":
                return (
                    <div className="flex flex-col">
                        <p className="font-normal text-sm">{"€ "}{cellValue}</p>
                    </div>
                )
            case "description":
                const truncatedDescription = depense.description.length > 48
                    ? `${depense.description.slice(0, 48)}...`
                    : depense.description;
                return (
                    <div className="flex flex-col">
                        <p className="font-normal text-sm">{truncatedDescription}</p>
                    </div>
                )
            default:
                return (
                    <div className="flex flex-col">
                        <p className="font-normal text-sm">{cellValue}</p>
                    </div>
                )

        }

    }, []);

    return (
        <div className="overflow-x-visible">
            <Table aria-label='Table des depenses'>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} align={column.key === "status" ? "center" : "start"}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={expenses} emptyContent={"Pas encore de données"}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {columnKey === "actions" ?
                                        renderCell(item, columnKey, handleEyeIconClick) :
                                        renderCell(item, columnKey, doNothing)
                                    }
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {selectedExpense &&
                <ExpensePopup expense={selectedExpense} onClose={() => setSelectedExpense(null)} />
            }
        </div>
    );
};

export default ExpenseTable;
