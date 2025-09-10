import React from 'react';

interface HeaderProps {
    text: string;
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ text, variant, className }) => {
    const HeadingTag = variant as React.ElementType;

    return <HeadingTag className={className}>{text}</HeadingTag>; // Applied className
};

export default Header;