import React from 'react';

interface ButtonProps {
    onClick: () => void;
    color?: string;
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    title: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, color = 'blue', size = 'medium', disabled = false, title }) => {
    const sizeClasses = {
        small: 'py-1 px-2 text-sm',
        medium: 'py-2 px-4 text-md',
        large: 'py-3 px-6 text-lg',
    };

    return (
        <button
            onClick={onClick}
            className={`bg-${color}-600 text-white rounded shadow-${color}-700 hover:bg-${color}-700 ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
            aria-label={`button-${title}`}
        >
            {title}
        </button>
    );
};

export default Button;