import React from 'react';

interface ListItemProps {
    title: string;
    year: string;
    experience: string;
    stack: string[];
}

const ListItem: React.FC<ListItemProps> = ({ title, year, experience, stack }) => {
    return (
        <li className="p-2 border rounded-lg shadow-md flex flex-col max-h-24">
            <p className="font-semibold">
                {title} – <span className="text-gray-400">{year}</span>
            </p>
            <p className="text-sm text-gray-300 truncate">{experience}</p>
            <p className="text-xs text-gray-400 truncate">{stack}</p>
        </li>
    );
};

export default ListItem;