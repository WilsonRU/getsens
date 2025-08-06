import type { ChangeEvent } from 'react';

interface InputProp {
	className?: string;
	type: 'text' | 'email' | 'password';
	label: string;
	value: string | number;
	name: string;
	placeholder: string;
	error?: string;
	disabled?: boolean;
	required?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
	className,
	type,
	label,
	value,
	name,
	placeholder,
	error,
	disabled,
	required,
	onChange,
}: InputProp) {
	return (
		<div className="flex flex-col gap-2">
			{label && (
				<span className="pl-1 pb-1 text-black font-bold text-sm">
					{label} {required === true && <span className="text-red-600">*</span>}
				</span>
			)}
			<input
				className={`block placeholder-gray-600/55 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:border-default-200 focus:border-default-200 focus:outline-none focus:ring focus:ring-default-200 focus:ring-opacity-40 ${className}`}
				type={type}
				id={label}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
			/>
			{error && (
				<p className="pl-2 mt-2 text-red-800 text-bold text-xs">{error}</p>
			)}
		</div>
	);
}
