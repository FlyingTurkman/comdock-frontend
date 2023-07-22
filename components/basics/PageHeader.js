import BreadcrumbRenderer from "./BreadcrumbRenderer"


export default function PageHeader({children, title, noBreadcrumb}) {
    return(
        <header className="pageHeader">
            {noBreadcrumb ? '' : (

            <BreadcrumbRenderer current={title} />
            )}
            <div className="wrapper">
                {children}
            </div>
        </header>
    )
}