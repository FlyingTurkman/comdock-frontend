import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PageHeader from "../basics/PageHeader"
import { faBuilding, faUser } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Now } from "@/helpers/helpScripts"


export default function DetailPage({title, children, contentType}) {

    const [activeLink, setActiveLink] = useState();
    
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.detailSection');
            let currentActiveLink = '';
        
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                const scrollPosition = window.scrollY;
        
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentActiveLink = section.id;
                }
            });
        
            if (currentActiveLink !== activeLink) {
                setActiveLink(currentActiveLink);
            }
        };
      
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeLink]);

    return (
        <>
            <PageHeader title={title}>
                <div className="h1 flex">
                    { contentType && (
                    <div className="flex-none w-8 mr-6">
                        {contentType == 'company' ? (<FontAwesomeIcon icon={faBuilding} />) : ''}
                        {contentType == 'person' ? (<FontAwesomeIcon icon={faUser} />) : ''}
                    </div>
                    )}
                    <span>{title}</span>
                </div>
            </PageHeader>
            <div className="w-full relative">
                <aside className="tableOfContent lg:block hidden">
                    <div className="sectionsList">
                        <ul>
                            {React.Children.toArray(children).map(child => {
                                if (child.type == 'section' && child.props.className === 'detailSection') {
                                    return (
                                        <li key={child.props.id}>
                                            <Link href={`#${child.props.id}`} className={`toc-item rounded-r ${activeLink === child.props.id ? 'active' : ''}`}>
                                                {Array.isArray(child.props.children) ? child.props.children[0].props.children : child.props.children.props.children}
                                            </Link>
                                        </li>
                                    );
                                };
                            })}
                        </ul>
                        <p className="toc-text">Abruf vom <Now /></p>
                    </div>
                </aside>
                <article className="wrapper">
                    {children}
                </article>
            </div>
        </>
    )
}