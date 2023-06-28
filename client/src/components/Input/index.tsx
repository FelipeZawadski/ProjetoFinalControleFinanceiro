import { ChangeEvent } from 'react';

interface IInputProps {
    name: string;
    className: string;
    type: string;
    placeholder: string;
    hasError: boolean;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input(
    { name,
        className,
        type,
        placeholder,
        value,
        hasError,
        onChange
        }: IInputProps
) {
    let inputClassName = className;
    if (hasError) {
        inputClassName += hasError ? " is-invalid" : " is-valid";
    }
    
    return (
        <div>
            <input
                type={type}
                className={inputClassName}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                name={name}
            />
            {hasError && <div className="invalid-feedback"></div>}
        </div>
    )
}