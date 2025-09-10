import React from 'react';

interface ListItemProps {
    title: string;
    year: string;
    experience: string;
    stack: string[];
}

const ListItem: React.FC<ListItemProps> = ({ title, year, experience, stack }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-500">{year}</p>
            <p className="mt-2">{experience}</p>
            <div className="mt-2">
                <span className="font-semibold">Stack:</span>
                <ul className="list-disc list-inside">
                    {stack.map((item, index) => (
                        <li key={index} className="text-gray-700">{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ListItem;