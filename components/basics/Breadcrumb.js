import { Children, Fragment } from "react";
import style from "@/layout/Breadcrumbs.module.sass"


const Breadcrumb = ({ children }) => {
  const childrenArray = Children.toArray(children);

  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <span className={style.breadcrumbSeperator}>/</span>
        </Fragment>
      );
    }
    return child
  });

  return (
    <nav>
      <ol className={style.breadcrumb}>
        {childrenWtihSeperator}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
