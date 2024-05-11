import { useState } from 'react';

const FilterBar: React.FC = () => {
    const [status, setStatus] = useState<string>('All');
    const [date, setDate] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');

    const handleStatusChange = (value: string) => {
        setStatus(value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleFilterClick = () => {
        // Implement filter functionality here
    };

    return (
        <div className="flex justify-between items-center mb-8">
            <div className="flex">
                {/* Status Dropdown */}
                <div className="mr-4">
                    <label className="mr-2">Status:</label>
                    <select
                        className="border rounded-md px-2 py-1"
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Disapproved">Disapproved</option>
                        <option value="Approved">Approved</option>
                    </select>
                </div>
                {/* Date Picker */}
                <div className="mr-4">
                    <label className="mr-2">Date:</label>
                    <input
                        type="date"
                        className="border rounded-md px-2 py-1"
                        value={date}
                        onChange={handleDateChange}
                    />
                </div>
                {/* Search Input */}
                <div>
                    <label className="mr-2">Search:</label>
                    <input
                        type="text"
                        className="border rounded-md px-2 py-1"
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            {/* Filter Button */}
            <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={handleFilterClick}
            >
                Filter
            </button>
        </div>
    );
};

export default FilterBar;