"use client"
import React, { useEffect, useMemo, useState } from 'react'
import styles from "./subscriber-details.module.scss"
import Units from './units/page'
import AddUnitsPopup from '@/components/common/popups/subscriber/add-unit/page'
import Condominium from './condominium/page'
import EditCondominuimPopup from '@/components/common/popups/subscriber/edit-condominuim/page'
import useAPIClient from '@/utils/api-client'
import { HashLoaderCom } from '@/components/common/loader/component-loader'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import DeleteModal from '@/components/common/popups/subscriber/delete'
import { usePathname, useRouter } from 'next/navigation'
import { saveCondomninuim, saveIsProof, saveSingleRecipient } from '@/store/reducers/userReducer'
import { Role_Enums } from '@/utils/enum/page'
import moment from 'moment'
import ImportFilePopup from '@/components/common/popups/view-parcels/import-file/page'
import ViewRecipients from '@/components/view-recipients/page'
import GateHouseDetail from '@/components/gate-house/details/page'
import ProofofPaymentPopup from '@/components/common/popups/proof-of-payment/page'
import { Routes } from '@/routes'

export default function SubscriberDetail() {


    const dispatch = useDispatch()
    const router = useRouter()
    const HTTP_CLIENT = useAPIClient()
    const pathname = usePathname()
    // For Create
    const [active, setActive] = useState<string>("Units")
    const [isOpen, setIsOpen] = useState<boolean>(false)

    // For Edit
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
    const [editData, setIsEditData] = useState<any>(null)

    // For Delete
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isDeleteId, setIsDeleteId] = useState<any | string>("")

    // For Fetch Data
    const [loading, setIsLoading] = useState<boolean>(false)
    const [unitList, setUnitList] = useState<any>([])

    // For Condominuim Data
    const [condominuimDetail, setCondominuimDetail] = useState<object | any>(null)

    // For Edit Conodminuim
    const [isCondOpen, setIsConOpen] = useState<boolean>(false)
    const [isCondPayload, setIsCondPayload] = useState<any>(null)

    const handleEditCond = (item: any) => {
        setIsCondPayload(item)
        setIsConOpen(true)
    }

    // For Redux State
    const { user, condominuimID, role, isProof } = useSelector((state: RootState) => state.user)

    //Role
    const findRole = () => {
        if (role === Role_Enums.SUBSCRIBER && pathname === Routes.SUBSCRIBER) {
            return true
        }
        return false
    }

    // for import
    const [importFile, setImportFile] = useState<boolean>(false)


    // For Reload
    const [reload, setReload] = useState<boolean>(false)


    const handleOpenEdit = (item: any) => {
        const payload = {
            ...item,
            id: condominuimID,
        }
        setIsEditData(payload)
        setIsEditOpen(true)
    }

    const handleDelete = (id: string) => {
        setIsDeleteId(id)
        setIsDelete(true)
    }


    const handleFetchUnits = async () => {
        try {
            setIsLoading(true)
            let paramID: any;
            if (role === Role_Enums.SUBSCRIBER) {
                paramID = condominuimID
            } else if (role === Role_Enums.GATEHOUSE) {
                paramID = condominuimID
            }
            const { data, success }: any = await HTTP_CLIENT.get({ url: `/unit/${paramID}` })
            if (success === true) {
                setUnitList(data?.reverse())
            }
            setIsLoading(false)
        } catch (error) {
            setUnitList([])
            setIsLoading(false)
        }
    }


    const handleNavigateRecipient = (item: any) => {
        dispatch(saveSingleRecipient(item))
        dispatch(saveCondomninuim(condominuimDetail))
        router.push(Routes.VIEW_RECIPIENTS)
    }

    useEffect(() => {
        handleFetchUnits()
        if (role === Role_Enums.SUBSCRIBER && pathname === Routes.SUBSCRIBER) {
            handleFetchCondominuim()
        }
    }, [reload])

    

    const handleFetchCondominuim = async () => {
        try {
            const managerId = user?._id
            const { data, success }: any = await HTTP_CLIENT.get({ url: `/manager/${managerId}` })
            if (success === true) {
                setCondominuimDetail(data)
            }
        } catch (error) {
            setCondominuimDetail(null)
        }
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.tabs}>
                        <div className={styles.tabsWrapper}>
                            <button className={active === "Units" ? styles.active : styles.inActive} onClick={() => setActive("Units")}>Unidades</button>
                            <button className={active === "Recipients" ? styles.active : styles.inActive} onClick={() => setActive("Recipients")}>Destinatários</button>
                            <button className={active === "Parcels" ? styles.active : styles.inActive} onClick={() => setActive("Parcels")}>Encomendas</button>
                            {findRole() && <button className={active === "Condominium-Details" ? styles.active : styles.inActive} onClick={() => setActive("Condominium-Details")}>Informações do Condomínio</button>}
                        </div>
                        {active === "Condominium-Details" &&
                            <div className={styles.parentIcon}>
                                <div className={styles.lastUpdatedText}>Última atualização: <span className='text-[#707070]'>{moment(condominuimDetail?.condominium?.updatedAt).format("DD/MM/YYYY")}</span></div>
                                <div className={styles.editIcon} onClick={() => handleEditCond(condominuimDetail)}><img src="/assets/edit-dark.svg" alt='edit-icon' /></div>
                            </div>
                        }
                        {findRole() && active === "Units" &&
                            <div className='flex gap-x-2 justify-end w-full'>
                                <button className={styles.import} disabled={condominuimDetail?.condominium?.numberOfRegisteredUnits >= condominuimDetail?.condominium?.numberOfUnitsInCondominium}  onClick={() => setImportFile(true)} >Importar</button>
                                <button className={styles.add} disabled={condominuimDetail?.condominium?.numberOfRegisteredUnits >= condominuimDetail?.condominium?.numberOfUnitsInCondominium} onClick={() => setIsOpen(true)}>Adicionar unidade</button>
                            </div>
                        }
                    </div>
                    <div className={styles.screenWrapper}>
                        {loading ? <HashLoaderCom /> : active === "Units"
                            ? <Units condominuimDetail={condominuimDetail} setImportFile={setImportFile} findRole={findRole} handleOpenEdit={handleOpenEdit} handleNavigateRecipient={handleNavigateRecipient} handleDelete={handleDelete} unitList={unitList} handleOpenAdd={() => setIsOpen(true)} />
                            : active === "Condominium-Details" ? 
                            <Condominium activeTab={() => setActive("Condominium-Details")} Reload={() => setReload(!reload)} condominuim={condominuimDetail} />
                                : active === "Recipients" ? <ViewRecipients unitList={unitList} />
                                    : active === "Parcels" ? <GateHouseDetail condominuim={condominuimDetail} /> : ""
                        }
                    </div>
                </div>
            </div>
            {importFile && <ImportFilePopup isUnit={true} Open={importFile} handleClose={() => setImportFile(false)} Reload={() => setReload(!reload)} />}
            {isCondOpen && <EditCondominuimPopup activeTab={() => setActive("Condominium-Details")} editData={isCondPayload} Open={isCondOpen} handleClose={() => setIsConOpen(false)} Reload={() => setReload(!reload)} />}
            {isEditOpen && <AddUnitsPopup editData={editData} Reload={() => setReload(!reload)} Open={isEditOpen} handleClose={() => setIsEditOpen(false)} />}
            {isOpen && <AddUnitsPopup Reload={() => setReload(!reload)} Open={isOpen} handleClose={() => setIsOpen(false)} />}
            {isDelete && <DeleteModal Open={isDelete} Reload={() => setReload(!reload)} handleClose={() => setIsDelete(false)} editData={isDeleteId} />}
            {isProof && <ProofofPaymentPopup isPendingProof={true} Reload={() => setReload(!reload)} editData={user} Open={isProof} handleClose={() => dispatch(saveIsProof(false))} />}
       
        </>
    )
}
