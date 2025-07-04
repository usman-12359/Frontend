"use client"
import React, { useEffect, useMemo, useState } from 'react'
import styles from "./condominuim-detail.module.scss"
import classNames from 'classnames'
import Units from '../subscriber/details/units/page'
import Condominium from '../subscriber/details/condominium/page'
import { IoIosArrowBack } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSearch } from 'react-icons/io5'
import CondominuimUnits from './condominuim-units/page'
import AddUnitsPopup from '../common/popups/subscriber/add-unit/page'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import useAPIClient from '@/utils/api-client'
import EditCondominuimPopup from '../common/popups/subscriber/edit-condominuim/page'
import { HashLoaderCom } from '../common/loader/component-loader'
import DeleteCondominuimModal from '../common/popups/admin/delete'
import { saveCondomninuim, saveSingleRecipient, saveUserId } from '@/store/reducers/userReducer'
import ImportFilePopup from '../common/popups/view-parcels/import-file/page'
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { Routes } from '@/routes'

export default function CondominuimDetails() {
    const dispatch = useDispatch()
    const router = useRouter()
    const HTTP_CLIENT = useAPIClient()
    const [active, setActive] = useState<string>("Condominium-Details")
    const { back } = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    // For Reload
    const [reload, setReload] = useState<boolean>(false)

    // For loading
    const [loading, setLoading] = useState<boolean>(false)

    // For Edit Condominuim
    const [isCondominuim, setIsCondominuim] = useState<boolean>(false)
    const [editData, setIsEditData] = useState<any>(null)

    // For Delete
    const [isDelete, setIsDelete] = useState<boolean>(false)


    const handleDeteleModal = (item: any) => {
        setIsEditData(item)
        setIsDelete(true)
    }


    // For Condominuim Data
    const [condominuimDetail, setCondominuimDetail] = useState<object | any>(null)
    // console.log("🚀 ~ CondominuimDetails ~ condominuimDetail:", condominuimDetail?.condominium?._id)

    // For Single Condominuim Units
    const [unitList, setUnitList] = useState<any>([])
    // console.log("🚀 ~ CondominuimDetails ~ unitList:", unitList)



    // For Redux State
    const { admin } = useSelector((state: RootState) => state.user)
    // console.log("🚀 ~ SubscriberDetail ~ user:", user?._id)

    // for import
    const [importFile, setImportFile] = useState<boolean>(false)


    const handleEditCondominuim = (item: any) => {
        setIsEditData(item)
        setIsCondominuim(true)
    }

    useEffect(() => {
        handleFetchCondominuim()
    }, [reload])

    const handleFetchCondominuim = async () => {
        try {
            setLoading(true)
            const managerId = admin?._id
            const { data, success }: any = await HTTP_CLIENT.get({ url: `/manager/${managerId}` })
            if (success === true) {
                dispatch(saveUserId(data?._id))
                handleFetchUnits(data?.condominium?.condominiumID)
                setCondominuimDetail(data)

            }

        } catch (error) {
            setLoading(false)
            setCondominuimDetail(null)
        }
    }

    const handleFetchUnits = async (paramID: string) => {
        try {
            const { data, success }: any = await HTTP_CLIENT.get({ url: `/unit/${paramID}` })
            if (success === true) {
                setUnitList(data?.reverse())
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setUnitList([])

        }
    }

    // For Pagination
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handlePageClick = (event) => {
        setPage(event.selected);
    };


    // For Search
    const [searchQuery, setSearchQuery] = useState(null)
    const dataToDisplay = useMemo(() => {
        // debugger
        const begin = page * limit;
        const end = begin + limit;

        if (searchQuery?.length > 0) {
            return unitList?.filter(
                (user) =>
                    user?.condominiumID?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase()) ||
                    user?.address?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                    user?.unitId?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase()) ||
                    user?.numberOfRecipients?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase())
            )?.slice(begin, end);
        } else {
            return unitList?.slice(begin, end);
        }
    }, [page, limit, unitList, searchQuery]);
    // console.log("🚀 ~ dataToDisplay ~ dataToDisplay:", dataToDisplay)


    const handleNavigateRecipient = (item: any) => {
        dispatch(saveSingleRecipient(item))
        dispatch(saveCondomninuim(condominuimDetail))
        router.push(Routes.VIEW_RECIPIENTS)
    }

    const [approveLoading, setApproveLoading] = useState<boolean>(false)
    const handleApproveAccount = async () => {
        try {
            setApproveLoading(true)
            const { data, success }: any = await HTTP_CLIENT.post({ url: `/manager/status/${condominuimDetail?.condominium?._id}/1` })
            if (success === true) {
                toast.success('Status da conta atualizado com sucesso')
                setApproveLoading(false)
                setReload(!reload)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setApproveLoading(false)

        }
    }

    return (
        <>
            <div className={classNames(["custom-class", styles.wrapper])}>
                <div className={styles.container}>
                    <div className={styles.header} onClick={back}><IoIosArrowBack /> Condomínio</div>
                    <div className={styles.tabs}>
                        <div className={styles.tabsWrapper}>
                            <button className={active === "Condominium-Details" ? styles.active : styles.inActive} onClick={() => setActive("Condominium-Details")}>Informações do condomínio</button>
                            <button className={active === "Units" ? styles.active : styles.inActive} onClick={() => setActive("Units")}>Unidades</button>
                            {/* {active === "Units" && <div className={styles.addUnit} onClick={() => setIsOpen(true)}>Add Unit</div>} */}
                        </div>
                        {active === "Condominium-Details" &&
                            <div className={styles.editIcon}>
                                {condominuimDetail?.status === false &&
                                    <button onClick={handleApproveAccount} className={styles.approveBtn}>{
                                        approveLoading ?
                                            <RotatingLines
                                                strokeColor="white"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="22"
                                                visible={true}
                                            />
                                            : "Aprovar conta"
                                    }
                                    </button>}
                                <img src="/assets/delete.svg" alt='asset' onClick={() => handleDeteleModal(condominuimDetail)} />
                                <img src="/assets/edit-icon.svg" alt='edit-icon' onClick={() => handleEditCondominuim(condominuimDetail)} />
                            </div>
                        }
                        {active === "Units" &&
                            <div className={styles.searchAndAdd}>
                                <div className={styles.searchWithIcon}>
                                    <IoSearch color='#707070' />
                                    <input type="search" placeholder='Procurar' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                </div>
                                <div className={styles.btnWrapper}>
                                    <div className={styles.import} onClick={() => setImportFile(true)} >Importar</div>
                                    <div className={styles.add} onClick={() => setIsOpen(true)}>Adicionar unidade</div>

                                </div>
                            </div>
                        }
                    </div>
                    <div className={styles.screenWrapper}>
                        {loading ? <HashLoaderCom /> : active === "Units"
                            ? <CondominuimUnits handleNavigateRecipient={handleNavigateRecipient} Reload={() => setReload(!reload)} unitList={unitList} dataToDisplay={dataToDisplay} page={page} handlePageClick={handlePageClick} limit={limit} />
                            : active === "Condominium-Details" ? <Condominium condominuim={condominuimDetail} Reload={() => setReload(!reload)} /> : ""
                        }
                    </div>
                </div>
            </div>
            {importFile && <ImportFilePopup isUnit={true} Open={importFile} handleClose={() => setImportFile(false)} Reload={() => setReload(!reload)} />}
            {isDelete && <DeleteCondominuimModal editData={editData} Reload={() => setReload(!reload)} Open={isDelete} handleClose={() => setIsDelete(false)} />}
            {isCondominuim && <EditCondominuimPopup editData={editData} Reload={() => setReload(!reload)} Open={isCondominuim} handleClose={() => setIsCondominuim(false)} />}
            {isOpen && <AddUnitsPopup Reload={() => setReload(!reload)} Open={isOpen} handleClose={() => setIsOpen(false)} />}
        </>
    )
}
