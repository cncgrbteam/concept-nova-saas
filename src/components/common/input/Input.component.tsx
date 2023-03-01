import { InputProps } from "./input.type";

export const Input = ({
	error,
	arialLabel,
	label,
	labelClassName,
	type = "text",
	readOnly = false,
	placeholder,
	leftIcon,
	value,
	onChange,
	otherProps,
}: InputProps &
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
	return (
		<div className="py-3">
			{label && (
				<label
					htmlFor={label}
					className={`block text-xs font-medium text-primary-200 ${labelClassName}`}
				>
					{label}
				</label>
			)}

			<div className="relative mt-1 rounded-md shadow-sm">
				{leftIcon && (
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<span className="text-gray-500 sm:text-sm">{leftIcon}</span>
					</div>
				)}

				<input
					aria-invalid={error ? "true" : "false"}
					aria-label={arialLabel}
					type={type}
					readOnly={readOnly}
					placeholder={placeholder}
					value={value}
					onChange={onChange ? onChange : null}
					className={`mt-2 outline-0 placeholder-[#515151] text-gray-600 block w-full h-12  text-sm rounded p-2  border border-slate-300 ${
						leftIcon ? "pl-10" : "px-3"
					}`}
					{...otherProps}
				/>
			</div>
			<p className="capitalize text-red-500 text-xs pl-5">{error?.message}</p>
		</div>
	);
};
