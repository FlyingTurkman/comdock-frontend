import Layout from "@/components/basics/Layout";
import DetailPage from "@/components/pagetypes/DetailPage";
import Link from "next/link";
import style from '@/layout/ContentLists.module.sass';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { dynamicIconHandler, fetcher, germanDate } from "@/helpers/helpScripts";
import { useEffect } from "react";
import { ConnectionFailFullSite } from "@/components/errors/ConnectionFailFullSite";
import Alert from "@/components/basics/Alert";


const PersonDetail = ({item}) => {
    useEffect(() => {
        if (!item) {
            setTimeout(() => {
            window.location.reload();
            }, 120000);
        }
    }, [item]);
    
    if (!item) {
        return(<ConnectionFailFullSite />)
    }

    const hr_items = item.attributes.personNetwork && item.attributes.personNetwork
        .reduce((uniqueItems, hr_item) => {
            if (hr_item.hr_public.data !== null) {
                if (!uniqueItems.find(item => item.hr_public.data.id === hr_item.hr_public.data.id)) {
                    uniqueItems.push(hr_item);
                }
                return uniqueItems;
            } else {return uniqueItems}
        }, [])
    console.log(hr_items)

    return (
        <Layout siteTitle={item.attributes.first_name+' '+item.attributes.sir_name+', '+item.attributes.city}>
            <DetailPage title={item.attributes.first_name+' '+item.attributes.sir_name+', '+item.attributes.city} contentType='person'>
                {item.attributes.personNetwork.length > 0 ? (
                    <section id="network" className="detailSection">
                        <h4 className="sectionLabel">Positionen</h4>
                        <div className="personNetwork">
                            {item.attributes.personNetwork
                                .sort((a, b) => new Date(b.since) - new Date(a.since))
                                .map((person) => {
                                return (
                                    <div className={`${style.listItem} ${person.upto ? (style.deleted) : ''} rounded-lg`}>
                                        <div className={`${style.listIcon} flex-none rounded-l-lg`}>
                                            <div className={style.faIcon}>
                                                <FontAwesomeIcon icon={faBuilding} />
                                            </div>
                                        </div>
                                        <div className={`${style.listContent} flex-auto`}>
                                            <Link href={'/company/'+person.company.data.attributes.hr_number} key={person.id}>
                                                <p className={`${style.summary}`}>{person.company.data.attributes.company_name}</p>
                                                <p className={`${style.meta}`}>
                                                    {person.connection_type} {person.upto ? ('(bis '+germanDate(person.upto)+')') : ''}
                                                </p>
                                            </Link>
                                        </div>
                                        {person.hr_public.data?.id && (
                                            <div className={`${style.hrLink} flex-none`}>
                                                <Link href={'/hr/' + person.hr_public.data.id}>
                                                    <div className='w-5'>
                                                        <FontAwesomeIcon icon={faInfoCircle} />
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ) : ''}
                {hr_items.length !== 0 ? (
                    <section id="publics" className="detailSection">
                        <h4 className="sectionLabel">Publikationen</h4>
                        <div>
                        {
                        
                        hr_items.map((hr_item) => {
                                return (
                                    <Link href={'/hr/'+hr_item.hr_public.data.id} key={hr_item.hr_public.data.id}>
                                        <div className={`${style.listItem} rounded-lg`}>
                                            <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                                <div className="w-5">
                                                <FontAwesomeIcon icon={dynamicIconHandler(hr_item.hr_public.data.attributes.pub_icon)} />
                                                </div>
                                            </div>
                                            <div className={`${style.listContent} flex-auto`}>
                                                <p className={`${style.meta}`}>{germanDate(hr_item.hr_public.data.attributes.pub_date)}</p>
                                                <p className={`${style.summary}`}>{hr_item.hr_public.data.attributes.pub_title}: {hr_item.hr_public.data.attributes.pub_summary}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                ) : ''}
                {item.attributes.personNetwork.length == 0 && hr_items.length == 0 ? (
                    <Alert theme="info">
                        Zu dieser Person gibt es keine weiteren Daten.
                    </Alert>
                ) : '' }
            </DetailPage>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const {id} = params;
    try{
        const contentResponse = await fetcher(
            `persons/${id}`,
            'populate[personNetwork][populate][company][fields][0]=hr_number,company_name&populate[personNetwork][populate][hr_public][fields][0]=pub_date,pub_title,pub_summary,pub_icon'
        )
        return {
            props: {
                item: contentResponse.data,
            },
        };
    } catch (error) {
        return {
            props: {item: null},
        };
    }
}


export default PersonDetail;