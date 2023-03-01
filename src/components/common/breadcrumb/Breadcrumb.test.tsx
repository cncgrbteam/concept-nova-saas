import React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import { Breadcrumbs } from "@components";
import { Breadcrumb } from "@utils";

describe("Breadcrumb", () => {
	const breadcrumbs: Breadcrumb[] = [
		{
			breadcrumb: "Lease",
			href: "/lease",
		},
		{
			breadcrumb: "Corporate Finance Lease",
			href: "/lease/corporate-finance-lease",
		},
		{
			breadcrumb: "Equipment Finance Lease (Heavy Generator Sets)",
			href: "/lease/equipment-finance-lease",
		},
	];

	const setup = () => {
		const utils = render(<Breadcrumbs />);
		const customUtils = render(<Breadcrumbs defaultBreadcrumb={breadcrumbs} />);

		const breadcrum = utils.getByRole("navigation", {
			name: /breadcrumbs/i,
		});
		const customBreadcrumb = customUtils.getByRole("navigation", {
			name: /breadcrumbs/i,
		});
		const homeLink = utils.getByRole("link", {
			name: /home/i,
		});

		const pageList = within(customBreadcrumb).getByRole("list");
		const corporateFinanceLink = customUtils.getByRole("link", {
			name: /corporate finance lease/i,
		});

		return {
			breadcrum,
			customBreadcrumb,
			homeLink,
			customUtils,
			pageList,
			corporateFinanceLink,
			...utils,
		};
	};

	it("renders without crashing", () => {
		const { breadcrum } = setup();
		expect(breadcrum).toBeInTheDocument();
	});
	it("should show home link", () => {
		const { homeLink } = setup();
		expect(homeLink).toBeInTheDocument();
	});
	it("should allow custom breadcrumb", () => {
		const { customBreadcrumb } = setup();
		expect(customBreadcrumb).toBeInTheDocument();
	});
	it("should list pages in custom prop", () => {
		const { corporateFinanceLink, pageList } = setup();

		expect(pageList).toBeInTheDocument();
		expect(corporateFinanceLink).toBeInTheDocument();
	});
});
