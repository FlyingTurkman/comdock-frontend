import style from '@/layout/Alert.module.sass'
import { faCircleCheck, faCircleExclamation, faCircleInfo, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Alert({children, title = '', theme='info'}) {
    return (
        <div className={`${style.alert} ${style} flex`}>
            <div className={`${style.alertIcon} ${style[theme]} aspect-square relative`}>
                {
                    theme == 'info' ? (
                        <FontAwesomeIcon icon={faCircleInfo} className='w-6' />
                    ) : 
                    theme == 'success' ? (
                        <FontAwesomeIcon icon={faCircleCheck} className='w-6' />
                    ) : 
                    theme == 'warning' ? (
                        <FontAwesomeIcon icon={faCircleExclamation} className='w-6' />
                    ) : 
                    theme == 'error' ? (
                        <FontAwesomeIcon icon={faCircleXmark} className='w-6' />
                    ) : 
                    (<FontAwesomeIcon icon={faCircleInfo} className='w-6' />)
                }
            </div>
            <div className={style.alertMessage}>
                <h3 className={`${style.alertTitle} text-roboto`}>{title}</h3>
                <div>{children}</div>
            </div>
        </div>
    )
}