import Link from "next/link";
import { ButtonProps } from "./Button.type";

export const Button = (props: ButtonProps) => {
	const {
		children,
		onClick,
		type = "button",
		disabled = false,
		isLoading = false,
		href = "",
		className: extendedClassName,
		variant = "primary",
		...rest
	} = props;

	const variantClass = () => {
		if (variant === "primary") {
			return "text-white bg-primary-500 hover:bg-primary-500/80";
		} else if (variant === "danger") {
			return "text-white bg-red-500 hover:bg-red-500/80";
		} else {
			return "text-dark bg-white hover:bg-primary-100 border border-[#D1D1D1]";
		}
	};

	const className = ` ocus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded lg:rounded-md text-sm px-3 lg:px-5 py-1.5 lg:py-2.5 text-center flex items-center justify-center ${variantClass()} ${extendedClassName}`;

	return (
		<>
			{props.as === "link" ? (
				<Link href={href} className={className}>
					{children}
				</Link>
			) : (
				<button
					type={type}
					onClick={onClick}
					disabled={isLoading || disabled}
					className={className}
					{...rest}
				>
					{isLoading ? (
						<div className="flex items-center justify-center">
							<svg
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
								></path>
							</svg>{" "}
							Please wait...
						</div>
					) : (
						children
					)}
				</button>
			)}
		</>
	);
};
