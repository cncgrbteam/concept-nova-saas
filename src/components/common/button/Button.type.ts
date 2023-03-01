import { ButtonVariant } from "@utils";

export type ButtonProps = {
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	variant?: ButtonVariant;
	disabled?: boolean;
	isLoading?: boolean;
	children?: React.ReactNode;
	as?: "button" | "link";
	href?: string;
	className?: string;
};
