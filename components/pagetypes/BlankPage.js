import PageHeader from "../specific/PageHeader";

export default function BlankPage({title, children, noBreadcrumb}) {
    return (
        <>
            <PageHeader noBreadcrumb={noBreadcrumb}>
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