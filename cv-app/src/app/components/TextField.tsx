import React from 'react';

interface TextFieldProps {
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: 'default' | 'outlined' | 'filled';
}

const TextField: React.FC<TextFieldProps> = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    variant = 'default',
}) => {
    const baseStyles = 'p-2 border rounded';
    const variantStyles = {
        default: 'border-gray-300',
        outlined: 'border-2 border-gray-500',
        filled: 'bg-gray-200',
    };

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${baseStyles} ${variantStyles[variant]} p-3 focus:ring-2 focus:ring-blue-500 outline-none`}
        />
    );
};

export default TextField;