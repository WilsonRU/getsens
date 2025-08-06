import type { ReactNode } from 'react';

interface ButtonProps {
	children: ReactNode;
	className?: string;
	ui: 'button' | 'text';
	action?: () => void;
	disabled?: boolean;
}

export default function Button({
	children,
	className,
	ui,
	action,
	disabled,
}: ButtonProps) {
	const uiStyles = {
		button:
			'px-4 py-2 font-bold rounded-md focus:outline-none flex items-center justify-center text-neutral-100 focus:ring focus:ring-gray-300 focus:ring-opacity-50 gap-2 cursor-pointer',
		text: 'text-center font-bold cursor-pointer hover:text-zinc-900',
	};

	return (
		<button
			type="button"
			className={`${uiStyles[ui] || ''} ${className}`}
			disabled={disabled}
			onClick={action}
		>
			{children}
		</button>
	);
}
