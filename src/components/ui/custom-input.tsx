import React from "react";
import { Input } from "../../components/ui/input";
import { Edit2 } from "lucide-react";

type CustomInputProps = {
    label?: string;
    labelIcon?: React.ReactNode; 
    value?: string | number;
    defaultValue?: string | number;
    placeholder?: string;
    type?: string;
    id?: string;
    name?: string;
    icon?: React.ReactNode; 
    leftElement?: React.ReactNode;
    digits?: "fa" | "en";
    dir?: "rtl" | "ltr";
    readOnly?: boolean;
    className?: string;
    wrapperClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    placeholderClassName?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    register?: any;
    showEditIcon?: boolean;
    error?: string | undefined
};

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    labelIcon,
    value,
    defaultValue,
    placeholder,
    type = "text",
    id,
    name,
    icon,
    leftElement,
    digits,
    dir,
    readOnly = false,
    className = "",
    wrapperClassName = "",
    labelClassName = "font-VazirMedium text-sm text-gray-900",
    inputClassName = "font-VazirMedium text-sm h-12 pr-12 pl-10 text-right",
    placeholderClassName = "placeholder:text-neutral-04 placeholder:text-xs placeholder:font-VazirMedium",
    onChange,
    register,
    showEditIcon = false,
    error,
}) => {
    const toFaDigits = (input = "") =>
        String(input).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

    const displayValue =
        value !== undefined && digits === "fa" ? toFaDigits(value) : value;

    const {
        onChange: registerOnChange,
        onBlur: registerOnBlur,
        name: registerName,
        ref: registerRef,
    } = register || {};

    return (
        <div className={`flex flex-col gap-2 ${wrapperClassName} ${className}`}>
            {label && (
                <label
                    className={`${labelIcon ? "flex items-center gap-2" : ""} ${labelClassName}`}
                    htmlFor={id}
                >
                    {labelIcon}
                    <span>{label}</span>
                </label>
            )}

            <div className="relative flex items-center">
                {icon && (
                    <div className="absolute right-3 text-secondary-color-blue z-10">
                        {icon}
                    </div>
                )}

                <Input
                    id={id}
                    name={name ?? registerName}
                    type={type}
                    value={displayValue !== undefined ? displayValue : undefined}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    dir={dir}
                    ref={registerRef}
                    onBlur={registerOnBlur}
                    onChange={(e) => {
                        registerOnChange?.(e);
                        onChange?.(e);
                    }}
                    className={`${inputClassName} ${placeholderClassName}`}
                />

                {leftElement && (
                    <div className="absolute left-3 text-gray-400 z-10">
                        {leftElement}
                    </div>
                )}

                {showEditIcon && !leftElement && (
                    <Edit2
                        size={16}
                        className="absolute left-3 text-gray-400 cursor-pointer z-10"
                    />
                )}
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default CustomInput;

