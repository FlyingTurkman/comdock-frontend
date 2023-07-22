import { useFetchUser } from "@/helpers/auth";
import BreadcrumbRenderer from "../specific/BreadcrumbRenderer";
import Router from "next/router";

export default function BackendPage () {
    // Authentication
    const { user, loading} = useFetchUser();
    if (!user && !loading) {
        Router.push('/legal/login');
    }
    return (
        <>
        <div className="bg-primary text-zinc-100 rounded-b-lg py-3">                
            <BreadcrumbRenderer backend current='Ihre Aufgaben' />
            <div className="backend-wrapper pt-5 pb-3">
                <div className="h1">Ihre Aufgaben</div>
            </div>
        </div>
        <div className="wrapper">
            Bla
        </div>
        </>
    )
}