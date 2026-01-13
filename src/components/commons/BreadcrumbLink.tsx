import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Crumb {
  label: string;
  href?: string; // nếu có href thì là link, không có thì là page hiện tại
}

interface BreadcrumbLinkComponentProps {
  items?: Crumb[];
}

const BreadcrumbLinkComponent = ({ items }: BreadcrumbLinkComponentProps) => {
  const safeItems = items ?? [];
  return (
    <Breadcrumb className="py-4">
      <BreadcrumbList>
        {safeItems.map((item, index) => {
          const isLast = index === safeItems.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href || "#"}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbLinkComponent;