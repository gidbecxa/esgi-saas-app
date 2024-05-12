import { Button, DatePicker, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import Image from 'next/image';
import ExpenseTable from '@/components/TableNextUI';
import DeployButton from '@/components/DeployButton';
import AuthButton from '@/components/AuthButton';
import ChevronDown from '@/assets/chevron-down-svgrepo-com.svg';
import SearchButton from '@/assets/search-4-svgrepo-com.svg'
import AccessDeniedModal from '@/components/AccessDenied';
// import { checkComptableRole } from '@/utils/droits/roles';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    /* const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    } */

    const checkComptableRole = async () => {
        const supabase = createClient();

        const { data: { user }, error } = await supabase.auth.getUser();

        if (!user) {
            console.log("User not found!");
            return redirect("/login");
        }

        const { data: userData, error: userError } = await supabase.from('users').select('role').eq('email', user?.email ?? '');
        console.log("User data: ", userData);

        if (userError) {
            console.error('Couldn\'t fetch user\'s data: ', userError);
            return false;
        }

        return userData?.[0]?.role === "comptable";
    };

    const isComptable = await checkComptableRole();

    if (!isComptable) {
        return <AccessDeniedModal />
    }

    return (
        <div className="flex-1 w-full flex flex-col items-center">
            <div className="w-full">
                <nav className="w-full flex justify-center h-24">
                    <div className="w-full flex justify-between items-center p-8 text-sm">
                        <DeployButton />
                        <AuthButton />
                    </div>
                </nav>
            </div>

            <div className='w-full px-8 py-4 flex flex-col lg:flex-row lg:justify-between items-start lg:items-center space-y-4'>
                <div
                    // className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-x-4 border-2 border-gray-500"
                    className="flex items-center space-x-4"
                >
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                endContent={
                                    <div className='hidden lg:inline-flex'>
                                        <p>{" "}</p>
                                        <Image
                                            priority
                                            src={ChevronDown}
                                            alt='dropdowm'
                                            width={24}
                                            height={24}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                }
                                variant="bordered"
                                className='px-6 text-dark-barkground font-medium'
                            >
                                Statut
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="new">En attente</DropdownItem>
                            {/* <DropdownItem key="copy">Rejeté</DropdownItem> */}
                            <DropdownItem key="edit">Approuvé</DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger">
                                Rejeté
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <DatePicker
                        // title="Date Picker"
                        className="lg:max-w-40"
                        variant="bordered"
                    />

                    <Input
                        placeholder="Rechercher"
                        startContent={
                            <>
                                <p>{" "}</p>
                                <Image
                                    priority
                                    src={SearchButton}
                                    alt='search'
                                    width={24}
                                    height={24}
                                    style={{ objectFit: 'contain' }}
                                />
                            </>
                        }
                        variant="bordered"
                        className='lg:max-w-60'
                    />
                </div>

                <Button
                    variant="solid"
                    className="bg-primary rounded-xl px-10 py-2 text-background font-semibold"
                >
                    Filtrer
                </Button>
            </div>

            <div className='flex-1 w-full mt-8 px-8'>
                <ExpenseTable />
            </div>
        </div>
    );
};