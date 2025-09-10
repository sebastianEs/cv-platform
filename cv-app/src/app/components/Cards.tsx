import React from 'react';

interface CardProps {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <section className="border border-gray-600 rounded-lg p-4 shadow-md m-4">
            {children}
        </section>
    );
};

export default Card;