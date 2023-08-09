import PageHeader from "../basics/PageHeader";

export default function BlankPage({title, children, noBreadcrumb}) {
    return (
        <>
            <PageHeader noBreadcrumb={noBreadcrumb} title={title}>
                <div className="h1">
                    {title}
                </div>
            </PageHeader>
            <article className="wrapper">
                {children}
            </article>
        </>
    )
}