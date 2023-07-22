import { dynamicIconHandler, germanDate } from '@/helpers/helpScripts';
import style from '@/layout/ContentLists.module.sass';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



import Link from "next/link";

const HRList = ({content}) => {
    return(
        <div>
            { content && content.data.map((item) => {
                
                return (
                    <Link href={'/hr/'+item.id} key={item.id}>
                        <div className={`${style.listItem} rounded-lg`} id={`hr${item.id}`}>
                            <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                <div className="w-5">
                                <FontAwesomeIcon icon={dynamicIconHandler(item.attributes.pub_icon)} />
                                </div>
                            </div>
                            <div className={`${style.listContent} flex-auto`}>
                                <p className={`${style.meta}`}>{germanDate(item.attributes.pub_date)}</p>
                                <p className={`${style.summary}`}>{item.attributes.pub_title}: {item.attributes.pub_summary}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default HRList;