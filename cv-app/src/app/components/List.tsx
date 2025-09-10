import React from 'react';
import ListItem from './ListItem';

interface Experience {
    role: string;
    year: string;
    description: string;
    stack: string[];
}

interface ListProps {
    items: Experience[];
}

const List: React.FC<ListProps> = ({ items }) => {
    return (
        <ul aria-label='list'>
            {items.map((item, index) => (
                <ListItem 
                    key={index} 
                    title={item.role} 
                    year={item.year} 
                    experience={item.description} 
                    stack={item.stack} 
                />
            ))}
        </ul>
    );
};

export default List;