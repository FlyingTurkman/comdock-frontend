import { dynamicIconHandler, germanDate } from '@/helpers/helpScripts';
import style from '@/layout/ContentLists.module.sass';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const HRList = ({content}) => {
    return(
        <div>
            { content && content.map((item) => {
                
                return (
                    <div className={`${style.listItem} rounded-lg`} id={`hr${item.id}`}>
                        <Link href={'/hr/'+item.id} key={item.id}>
                            <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                <div className={style.faIcon}>
                                <FontAwesomeIcon icon={dynamicIconHandler(item.attributes.pub_icon)} />
                                </div>
                            </div>
                        </Link>
                        <div className={`${style.listContent} flex-auto`}>
                            <p className={`${style.meta}`}>
                                <span>{germanDate(item.attributes.pub_date)}</span>
                                {item.attributes.company ? (
                                <>
                                    <span> | über </span>
                                    <Link href={'/companies/'+item.attributes.company.data.attributes.hr_number} className='font-semibold'>{item.attributes.company.data.attributes.company_name}</Link>
                                </>
                                ) : ''}
                                
                            </p>
                            <Link href={'/hr/'+item.id} key={item.id}>
                                <p className={`${style.summary}`}>{item.attributes.pub_title}: {item.attributes.pub_summary}</p>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default HRList;