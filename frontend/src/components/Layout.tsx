import type { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
	className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
	return (
		<div
			className={`flex flex-col justify-center items-center min-h-screen ${className}`}
		>
			{children}
		</div>
	);
}
