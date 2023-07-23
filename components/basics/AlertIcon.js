import { faCircleCheck, faCircleExclamation, faCircleInfo, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from '@/layout/Alert.module.sass'



export default function AlertIcon({theme = 'info', weightClass = 'w-8'}) {
    return (
        <div className={`rounded-lg p-5 ${style[theme]} relative w-fit`}>
            {
                theme == 'info' ? (
                    <div>
                        <FontAwesomeIcon icon={faCircleInfo} className={weightClass} />
                    </div>
                ) : 
                theme == 'success' ? (
                    <FontAwesomeIcon icon={faCircleCheck} className={weightClass} />
                ) : 
                theme == 'warning' ? (
                    <FontAwesomeIcon icon={faCircleExclamation} className={weightClass} />
                ) : 
                theme == 'error' ? (
                    <FontAwesomeIcon icon={faCircleXmark} className={weightClass} />
                ) : 
                (<FontAwesomeIcon icon={faCircleInfo} className={weightClass}/>)
            }
        </div>
    )
}