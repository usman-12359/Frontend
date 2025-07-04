"use client"
import { HashLoaderCom } from '@/components/common/loader/component-loader'
import EditModalForGateHouse from '@/components/common/popups/gate-house/edit/page'
import DeleteParcelModal from '@/components/common/popups/view-parcels/delete'
import TakePhoto from '@/components/common/popups/view-parcels/take-photo/page'
import UploadPhoto from '@/components/common/popups/view-parcels/upload-photo/page'
import { RootState } from '@/store/store'
import useAPIClient from '@/utils/api-client'
import { Role_Enums } from '@/utils/enum/page'
import moment from 'moment'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoChevronBackOutline, IoSearch } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import ImageViewer from 'react-simple-image-viewer'
import Collected from './collected/page'
import styles from "./details.module.scss"
import NotCollected from './not-collected/page'
import UnAssigned from './un-assigned/page'
import { Routes } from '@/routes'
export default function GateHouseDetail(props: any) {
    const { condominuim } = props

    const [active, setActive] = useState<string>("collected")
    const { back } = useRouter()
    const pathname = usePathname()
    const HTTP_CLIENT = useAPIClient()
    const [collected, setCollected] = useState<any>([])
    const [notCollected, setNotCollected] = useState<any>([])
    const [unAssigned, setUnAssigned] = useState<any>([])

    const { condominuimID } = useSelector((state: RootState) => state.user)


    // for reload
    const [reload, setReload] = useState<boolean>(false)

    // For upload photo
    const [isUpload, setIsUpload] = useState<boolean>(false)


    // For Camera Popup
    const [isTakePopup, setIsTakePopup] = useState<boolean>(false)

    // Fetch Recipient Id
    const { singleRecipient, role, condomninuimDetail, } = useSelector((state: RootState) => state.user)
   
    // For Parcel View
    const [isAttachmentOpen, setIsAttachmentOpen] = useState<boolean>(false)
    const [attachmentURL, setAttachmentURL] = useState<string>('')

    const handleOpenAttachment = (item: string) => {
        setAttachmentURL(item)
        setIsAttachmentOpen(true)
    }

    const [loading, setLoading] = useState<boolean>(false)

    const findRole = () => {
        if (role === Role_Enums.SUBSCRIBER || role === Role_Enums.ADMIN) {
            return true
        }
        return false
    }

    const handleFetchParcelSubscriber = async () => {
        try {
            setLoading(true)
            const { data, success }: any = await HTTP_CLIENT.get({ url: encodeURI(`/parcel/parcel/${condominuimID}/{unitID}`) })
            if (success === true) {
                setCollected(data?.[0]?.collected?.reverse())
                setNotCollected(data?.[0]?.notCollected?.reverse())
                setUnAssigned(data?.[0]?.unassigned?.reverse())
            }
            setLoading(false)
        } catch (error) {
            setCollected([])
            setNotCollected([])
            setUnAssigned([])
            setLoading(false)

        }
    }
    const handleFetchParcel = async () => {
        try {
            setLoading(true)
            const { data, success }: any = await HTTP_CLIENT.get({ url: encodeURI(`/parcel/parcel/${condominuimID}/${singleRecipient?.unitId}`) })
            if (success === true) {
                setCollected(data?.[0]?.collected?.reverse())
                setNotCollected(data?.[0]?.notCollected?.reverse())
                setUnAssigned(data?.[0]?.unassigned?.reverse())
            }
            setLoading(false)
        } catch (error) {
            setCollected([])
            setNotCollected([])
            setUnAssigned([])
            setLoading(false)

        }
    }

    const handleBack = () => {
        if (pathname === Routes.GATEHOUSE) {
            return
        }
        back()
    }


    useEffect(() => {
        if (role === Role_Enums.SUBSCRIBER && pathname === Routes.SUBSCRIBER || role === Role_Enums.GATEHOUSE && pathname === Routes.GATEHOUSE) {
            handleFetchParcelSubscriber()
        } else {
            handleFetchParcel()
        }
    }, [reload])


    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [editData, setEditData] = useState<any>(null)
    const [collectDisplay, setCollectDisplay] = useState<boolean>(false)

    const handleIsOpen = (item: any, status: string) => {
        if (status === "not-collected") {
            setCollectDisplay(true)
        } else {
            setCollectDisplay(false)
        }
        setEditData(item)
        setIsOpen(true)
    }

    const [isDletePopup, setIsDeletePopup] = useState<boolean>(false)

    const handleDelete = (item: any) => {
        setEditData(item)
        setIsDeletePopup(true)
    }

    function validateDate(targetDateString) {

        if (!targetDateString) return
        const targetDate = moment(targetDateString);
        const currentDate = moment();
        return currentDate.isSameOrBefore(targetDate);
    }


    const handleBackFor = () => {
        if (pathname !== Routes.SUBSCRIBER) {
            handleBack()
        }
    }



    // For Search
    const [searchQuery, setSearchQuery] = useState(null)

    const isDisplayUploadParcal = () => {
        if (condomninuimDetail?.planStatus !== 'cancelled' && validateDate(condominuim?.planExpirationDate || condomninuimDetail?.planExpirationDate)) {
            return true
        } else if (pathname === Routes.GATEHOUSE) {
            return true
        }
        return false
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.headingFor} onClick={handleBackFor}>
                        {pathname === Routes.GATEHOUSE || pathname === Routes.SUBSCRIBER ? null :
                            <IoChevronBackOutline />} Encomendas</div>
                    <div className={styles.header}>
                        <div className={styles.heading} onClick={handleBackFor}>
                            {pathname === Routes.GATEHOUSE || pathname === Routes.SUBSCRIBER ? null :
                                <IoChevronBackOutline />} Encomendas</div>
                        <div className='flex items-start lg:items-center gap-x-5 flex-col-reverse lg:flex-row flex-wrap gap-y-5'>
                            <div className={styles.searchWithIcon}>
                                <IoSearch color='#707070' />
                                <input type="search" placeholder='Procurar' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            {isDisplayUploadParcal() &&
                                <div className={styles.btnWrapper}>
                                    <button className={styles.takePhoto} onClick={() => setIsTakePopup(true)}>Tirar Foto</button>
                                    <button className={styles.uploadPhoto} onClick={() => setIsUpload(true)}>Enviar foto</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={styles.tabs}>
                        <button className={active === "collected" ? styles.active : styles.inActive} onClick={() => setActive("collected")}>Retiradas</button>
                        <button className={active === "not-collected" ? styles.active : styles.inActive} onClick={() => setActive("not-collected")}>Não retiradas</button>
                        <button className={active === "un-assigned" ? styles.active : styles.inActive} onClick={() => setActive("un-assigned")}>Não notificadas</button>
                    </div>
                    <div className={styles.screenWrapper}>
                        {loading ? <HashLoaderCom /> :
                            active === "collected"
                                ? <Collected handleOpenAttachment={handleOpenAttachment} searchQuery={searchQuery} collected={collected} />
                                : active === "not-collected"
                                    ? <NotCollected searchQuery={searchQuery} handleOpenAttachment={handleOpenAttachment} findRole={findRole} handleDelete={handleDelete} handleIsOpen={handleIsOpen} notCollected={notCollected} />
                                    : active === "un-assigned"
                                        ? <UnAssigned searchQuery={searchQuery} handleOpenAttachment={handleOpenAttachment} findRole={findRole} handleDelete={handleDelete} handleIsOpen={handleIsOpen} unAssigned={unAssigned} />
                                        : ""
                        }
                    </div>

                </div>
            </div>
            {isAttachmentOpen &&

                <ImageViewer
                    src={[attachmentURL]}
                    currentIndex={0}
                    onClose={() => setIsAttachmentOpen(false)}
                    disableScroll={false}
                    backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)"
                    }}
                    closeOnClickOutside={true}
                />
            }
            {/* {isAttachmentOpen && <ParcelAttachmentsModal Data={attachmentURL} Open={isAttachmentOpen} handleClose={() => setIsAttachmentOpen(false)} />} */}
            {isDletePopup && <DeleteParcelModal tab={() => setActive(active)} Reload={() => setReload(!reload)} editData={editData} Open={isDletePopup} handleClose={() => setIsDeletePopup(false)} />}
            {isOpen && <EditModalForGateHouse collectDisplay={collectDisplay} active={active} tab={() => setActive(active)} Reload={() => setReload(!reload)} editData={editData} Open={isOpen} handleClose={() => setIsOpen(false)} />}
            {isTakePopup && <TakePhoto setActive={setActive} Reload={() => setReload(!reload)} singleRecipient={singleRecipient} Open={isTakePopup} handleClose={() => setIsTakePopup(false)} />}
            {isUpload && <UploadPhoto setActive={setActive} Reload={() => setReload(!reload)} singleRecipient={singleRecipient} Open={isUpload} handleClose={() => setIsUpload(false)} />}

        </>
    )
}
