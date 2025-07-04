"use client"
import { HashLoaderCom } from '@/components/common/loader/component-loader';
import AcceptRejectRequestModal from '@/components/common/popups/accept-reject-request';
import EditCondominuimPopup from '@/components/common/popups/subscriber/edit-condominuim/page';
import useAPIClient from '@/utils/api-client';
import { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import styles from "./condominuim.module.scss";
import ListsCondominuim from './lists/page';
import RequestCondominuim from './requests/page';


export default function AdminCondominuim() {

    const HTTP_CLIENT = useAPIClient()

    const [activeTab, setActiveTab] = useState<string>("CondominiumManagement")

    const [isRequest, setIsRequest] = useState<boolean>(false)
    const [editData, setEditData] = useState<any>(null)

    const [isCondominuim, setIsCondominuim] = useState<boolean>(false)
    const [condominuimList, setCondominuimList] = useState<any>([])
    const [condominuimRequest, setCondominuimRequest] = useState<any>([])

    const [isActive, setActive] = useState<boolean>(false)
    const [findIndx, setFindIndx] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    // For Reload
    const [reload, setReload] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const handleOpen = (item: number) => {
        setFindIndx(item)
        setActive(true)
    }
    const handleRequest = (item: any, status: string) => {
        const payload = {
            ...item,
            clicked: status
        }
        setEditData(payload)
        setIsRequest(true)
    }

    useEffect(() => {
        handleFetchCondominuim()
        handleFetchRequestCondominuim()
    }, [reload])

    useEffect(() => {
        switch (activeTab) {
            case "Requests":
                handleFetchRequestCondominuim()
                break
            case "CondominiumManagement":
                handleFetchCondominuim()
                break
        }
    }, [activeTab])

    const handleFetchCondominuim = async () => {
        try {
            setLoading(true)
            const { data, success }: any = await HTTP_CLIENT.get({ url: "/manager" })
            if (success === true) {
                setCondominuimList(data?.reverse() || [])
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setCondominuimList([])
        }
    }
    const handleFetchRequestCondominuim = async () => {
        try {
            const { data, success }: any = await HTTP_CLIENT.get({ url: "/manager/subscription-request/get" })
            if (success === true) {
                setCondominuimRequest(data?.subscriptionRequests?.reverse() || [])
            }
        } catch (error) {

            setCondominuimRequest([])
        }
    }
    // For Search
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.tabs}>
                        <div className={styles.tabsWrapper}>
                            <button className={activeTab === "CondominiumManagement" ? styles.active : styles.inActive} onClick={() => setActiveTab("CondominiumManagement")}>Administração de Condomínios</button>
                            <button className={activeTab === "Requests" ? styles.active : styles.inActive} onClick={() => setActiveTab("Requests")}>Solicitações</button>
                        </div>
                    </div>
                    <div className={styles.header}>
                        <div className={styles.heading}>{activeTab === "CondominiumManagement" ? "Administração de Condomínios" : "Solicitações"}</div>
                        <div className={styles.searchAndAdd}>
                            <div className={styles.searchWithIcon}>
                                <IoSearch color='#707070' />
                                <input type="search" placeholder='Procurar' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                            </div>
                            <div className={styles.add} onClick={() => setIsCondominuim(true)}>Criar Condomínio</div>
                        </div>
                    </div>
                    <div className={styles.screenWrapper}>
                        {loading ? <HashLoaderCom /> : activeTab === "CondominiumManagement" ?
                            <ListsCondominuim
                                searchQuery={searchQuery}
                                handleOpen={handleOpen}
                                findIndx={findIndx}
                                isActive={isActive}
                                setActive={setActive}
                                handleRequest={handleRequest}
                                condominuimList={condominuimList}
                            />
                            :
                            <RequestCondominuim
                                searchQuery={searchQuery}
                                handleOpen={handleOpen}
                                findIndx={findIndx}
                                isActive={isActive}
                                setActive={setActive}
                                handleRequest={handleRequest}
                                condominuimRequest={condominuimRequest}
                            />

                        }
                    </div>
                </div>
            </div>
            {isCondominuim && <EditCondominuimPopup Reload={() => setReload(!reload)} Open={isCondominuim} handleClose={() => setIsCondominuim(false)} />}
            {isRequest && <AcceptRejectRequestModal editData={editData} Reload={() => setReload(!reload)} Open={isRequest} handleClose={() => setIsRequest(false)} />}
        </>
    )
}
