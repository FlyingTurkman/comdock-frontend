import Breadcrumb from "@/components/basics/Breadcrumb";
import BreadcrumbItem from "@/components/basics/BreadcrumbItem";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


function BreadcrumbRenderer({current, backend}) {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      
      let label;
      
      if (path == 'companies') {label = "Firmen"}
      else if (path == 'persons') {label = "Personen"}
      else if (current) {label = current}
      
      else {label = path.charAt(0).toUpperCase() + path.slice(1);}


      return {
        href,
        label,
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return (
      <Breadcrumb>
        {backend ? (
          <BreadcrumbItem href="/legal">COMDOCK Legal</BreadcrumbItem>
        ) : (
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
        )}
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb) => (
            <BreadcrumbItem key={breadcrumb.href} href={breadcrumb.href}>
              {breadcrumb.label}
            </BreadcrumbItem>
          ))}
      </Breadcrumb>
  );
}

export default BreadcrumbRenderer;