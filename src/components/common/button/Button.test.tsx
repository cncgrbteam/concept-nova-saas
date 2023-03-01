import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@components";

describe("Button component", () => {
	it("renders without crashing and displays button text", () => {
		render(<Button>Submit </Button>);

		const button = screen.getByRole("button", {
			name: /submit/i,
		});

		expect(button).toBeInTheDocument();
	});

	it("is not disabled when disabled is false", () => {
		render(<Button disabled={false}>Submit</Button>);

		const button = screen.getByRole("button", {
			name: /submit/i,
		});

		expect(button).not.toBeDisabled();
	});

	it("is disabled when disabled prop is present", () => {
		render(<Button disabled>Submit</Button>);

		const button = screen.getByRole("button", {
			name: /submit/i,
		});

		expect(button).toBeDisabled();
	});

	it("calls onClick function when button is clicked", () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick}>Submit </Button>);

		const button = screen.getByRole("button", {
			name: /submit/i,
		});

		fireEvent.click(button);
		expect(handleClick.mock.calls.length).toEqual(1);
	});
});
