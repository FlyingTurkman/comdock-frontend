import style from '@/layout/CDLegal.module.sass';
import { faBuilding, faFile, faSection } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';


export default function TaskList({user, allTasks}) {
    // Filter Tasks
    
    var userTasks = allTasks.data.filter(function(item) {
        return item.attributes.cdl_tasks.filter(function(task) {
          return task.signer.data.attributes.username == user;
        }).length > 0;
    })
    .map(function (item) {
        return {
            id: item.id,
            attributes: {
                // Include other desired attributes here
                docType: item.attributes.docType,
                companyDocs: item.attributes.companyDocs,
                hr_id: item.attributes.hr_id,
                document: item.attributes.document,
                cdl_tasks: item.attributes.cdl_tasks.filter(function (task) {
                return task.signer.data.attributes.username === user;
                })
            }
        };
    });

    var tasksNew = userTasks.filter(function(item) {
        return item.attributes.cdl_tasks.some(function(task) {
          return task.signed_date == null;
        });
      });

    var tasksDone = userTasks.filter(function(item) {
        return item.attributes.cdl_tasks.some(function(task) {
          return task.signed_date !== null;
        });
      });


    
    // Modal Logic
    let [isOpen, setIsOpen] = useState(false)

    /* 
        TODO: Bitte eine Funktion erstellen, die beim onclick des ersten ModalClose ausgeführt wird.
        Die Funktion muss dann den User zur Eingabe des Passwortes auffordern, 
        das Passwort abgleichen und die Änderung an den Daten vornehmen, danach einen Alert-Modal anzeigen mit bedankendem Text
    */

    function closeModal() {
        setIsOpen(false)
    }    

    function openModal() {
        setIsOpen(true)
        
    }
    return(
        <>
            <h1 className="text-primary">Ihre Aufgaben</h1>
            {tasksNew.map((item) => (
                <>
                    {item.attributes.cdl_tasks.map((task) => (
                        <>
                            <div className={`${style.taskItem} rounded-lg`}>
                                <Link href="#" onClick={openModal} > 
                                    <p className={`${style.summary}`}>
                                        {task.task}
                                    </p>
                                    <p className={`${style.meta}`}>{item.attributes.docType} &bull; {item.attributes.companyDocs.data.attributes.company_name}</p>
                                </Link>
                            </div>
                            <Transition appear show={isOpen} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                                    </Transition.Child>
                                    <div className="fixed inset-0 overflow-y-auto">
                                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                    <Dialog.Title as="h4" className="text-primary">
                                                        {item.attributes.docType} | {item.attributes.companyDocs.data.attributes.company_name}
                                                    </Dialog.Title>
                                                    <div className="mt-2 py-3 grid grid-cols-3 gap-4 border-b">
                                                        <Link href={process.env.NEXT_PUBLIC_STRAPI_URL+item.attributes.document.data.attributes.url} target="_blank">
                                                            <button className="flex items-center font-medium text-sm text-primary hover:bg-sky-200/70 rounded-md px-2 py-1">
                                                                <FontAwesomeIcon icon={faFile} className="w-3" />
                                                                <span className="ml-3">Dokument öffnen</span>
                                                            </button>
                                                        </Link>
                                                        {item.attributes.companyDocs ? (
                                                            <Link href={'/companies/'+item.attributes.companyDocs.data.attributes.hr_number} target="_blank">
                                                                <button className="flex items-center font-medium text-sm text-primary hover:bg-sky-200/70 rounded-md px-2 py-1">
                                                                    <FontAwesomeIcon icon={faBuilding} className="w-3" />
                                                                    <span className="ml-3">{item.attributes.companyDocs.data.attributes.company_name}</span>
                                                                </button>
                                                            </Link>
                                                        ) : ''}
                                                        {item.attributes.hr_id ? (
                                                            <Link href={'/hr/'+item.attributes.hr_id.data.id} target="_blank">
                                                                <button className="flex items-center font-medium text-sm text-primary hover:bg-sky-200/70 rounded-md px-2 py-1">
                                                                    <FontAwesomeIcon icon={faSection} className="w-3" />
                                                                    <span className="ml-3">HR Eintragung anzeigen</span>
                                                                </button>
                                                            </Link>
                                                        ) : ''}
                                                    </div>

                                                    <div className='py-2'>
                                                        <p className='text-gray-500'>
                                                            {
                                                                task.task =="Digitale Beglaubigung mit Dokument" || task.task =="Digitale Beglaubigung ohne Dokument" ?
                                                                    "Wir bitten Sie, dieses Dokument digital zu beglaubigen." :
                                                                task.task =="Digitale Unterschrift mit Dokument" || task.task =="Digitale Unterschrift ohne Dokument" ?
                                                                    "Wir bitten Sie, dieses Dokument digital zu unterschreiben."
                                                                : "Wir bitten Sie, folgende Aufgabe zu erledigen: "+task.task
                                                            }
                                                        </p>
                                                    </div>

                                                    <form>
                                                        {task.task == "Digitale Beglaubigung mit Dokument" || task.task =="Digitale Unterschrift mit Dokument" ? (
                                                            
                                                            <div className="col-span-full">
                                                                {/* FIXME: Es gibt noch keine Ansicht für ein ausgewähltes Dokument */}
                                                                <label htmlFor="cert-doc" className="block text-sm font-medium leading-6 text-gray-900">
                                                                    Zertifikat hinzufügen
                                                                </label>
                                                                <div className="file-input-wrapper mt-2 flex justify-center px-6 py-10">
                                                                    <div className="text-center">
                                                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                                            <label htmlFor="file-upload" className="file-input-label">
                                                                                <span>Vom Computer auswählen</span>
                                                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                                            </label>
                                                                        </div>
                                                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, SVG, PDF, XLS</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className="block text-sm font-medium leading-6 text-gray-900">Für diese Aufgabe ist kein Zertifikat notwendig.</p>
                                                        )}
                                                        <div className="pt-5">
                                                            <label htmlFor="confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Geben Sie Ihr Passwort ein, um diese Aufgabe abzuschließen
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                type="password"
                                                                name="confirmation"
                                                                id="confirmation"
                                                                className="form-control"
                                                                required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                                            <button type="button" className="btn-nobtn" onClick={closeModal}>
                                                                Abbrechen
                                                            </button>
                                                            <button type="submit" className="btn btn-primary">
                                                                Aufgabe abschließen
                                                                {/* FIXME: Mit dem Submit umgehen, einen Danke Alert onSite anzeigen */}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>
                        </>
                    ))}
                </>
            ))}
            <h1 className='text-primary'>Erledigte Aufgaben</h1>
            {/* tasksDone */}
        </>
    )
}