import Link from "next/link";
import style from "@/layout/Breadcrumbs.module.sass"

const BreadcrumbItem = ({ children, href, ...props }) => {
  return (
    <li {...props}>
      <Link href={href} passHref className={style.breadcrumbItem}>
        {children}
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
