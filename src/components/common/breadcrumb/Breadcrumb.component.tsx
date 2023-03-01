import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IBreadcrumb } from "@utils";

const convertBreadcrumb = (string: string, hypenated?: boolean) => {
  if (hypenated) {
    return string.replace(/oe/g, "ö").replace(/ae/g, "ä").replace(/ue/g, "ü");
  } else {
    return string
      .replace(/-/g, " ")
      .replace(/oe/g, "ö")
      .replace(/ae/g, "ä")
      .replace(/ue/g, "ü");
  }
};

export const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[] | null>(null);

  useEffect(() => {
    if (router && !breadcrumbs) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray: any = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router, breadcrumbs]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav
      aria-label="breadcrumbs"
      data-testid="breadcrumbs"
      className="py-5 px-wrapper md:px-wrapper-md"
    >
      <ol className="flex justify-start gap-4 flex-wrap text-sm text-[#838282]">
        <li>
          <Link href="/">Home</Link>
        </li>
        {breadcrumbs.map((breadcrumb: IBreadcrumb, i: number) => {
          return (
            <Fragment key={breadcrumb.href}>
              <li>
                <span>/</span>
              </li>
              <li>
                <Link
                  href={breadcrumb.href}
                  className={`capitalize ${
                    i === breadcrumbs.length - 1 ? "text-primary" : ""
                  }`}
                  onClick={(event) =>
                    i == breadcrumbs.length - 1 ? event.preventDefault() : null
                  }
                  aria-label={breadcrumb.breadcrumb}
                >
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
