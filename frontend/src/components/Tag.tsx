interface TagProps {
	text: string;
	className: string;
}

export default function Tag({ text, className }: TagProps) {
	return (
		<div
			className={`p-1 rounded-xl font-semibold text-center cursor-default ${className}`}
		>
			<span>{text}</span>
		</div>
	);
}
