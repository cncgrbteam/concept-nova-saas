import React from "react";

export type InputProps = {
	label?: string;
	type?: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: {
		message?: string;
	};
	disabled?: boolean;
	className?: string;
	arialLabel?: string;
	labelClassName?: string;
	leftIcon?: React.ReactNode;
	otherProps?: any;
	readOnly?: boolean;
	value?: string | number;
};
