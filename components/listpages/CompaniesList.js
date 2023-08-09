import style from '@/layout/ContentLists.module.sass';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Alert from '../basics/Alert';

const CompaniesList = ({content}) => {
    return (
        <div>
            { content.data.length > 0 && content.data.map((item) => {
                return (
                    <Link href={'/companies/'+item.attributes.hr_number} key={item.attributes.hr_number}>
                        <div className={`${style.listItem} rounded-lg`}>
                            <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                <div className='w-5'>
                                    <FontAwesomeIcon icon={faBuilding} />
                                </div>
                            </div>
                            <div className={`${style.listContent} flex-auto`}>
                                <p className={`${style.summary} flex items-center`}>
                                    {item.attributes.company_name} 
                                    {item.attributes.main_branch.data?.attributes?.city ? (', '+item.attributes.main_branch.data?.attributes?.city) : ''}
                                    {item.attributes.status ? (
                                        <span className={`badge ${style.StatusBadge}`}>{item.attributes.status}</span>
                                    ) : ''}
                                </p>
                                <p className={`${style.meta}`}>{item.attributes.hr_court ? (item.attributes.hr_court+' | ') : ''}
                                {item.attributes.hr_dept} {item.attributes.hr_number}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
            {content.data.length == 0 ? (
                <Alert theme='info'>
                    <p>Es gibt keine Einträge, die in dieser Ansicht gezeigt werden könnten.</p>
                </Alert>
            ) : ''}
        </div>
    );
}
export default CompaniesList;