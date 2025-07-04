"use client"
import React, { useEffect, useMemo, useState } from 'react'
import styles from "./view-recipients.module.scss"
import classNames from 'classnames'
import { IoSearch } from 'react-icons/io5'
import { IoChevronBackOutline } from "react-icons/io5";
import { BsTrash2 } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import RecipientsPopup from '../common/popups/view-recipients/page';
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import useAPIClient from '@/utils/api-client'
import { HashLoaderCom } from '../common/loader/component-loader'
import NoData from '../common/no-data/page'
import DeleteRecipientModal from '../common/popups/delete-recipient'
import { Role_Enums } from '@/utils/enum/page'
import ReactPaginate from 'react-paginate'
import "./pagination.css"
import ImportFilePopup from '../common/popups/view-parcels/import-file/page'
import { Routes } from '@/routes'

export default function ViewRecipients(props: any) {
    const { unitList } = props

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
    const [editData, setIsEditData] = useState<any>(null)
    const { push, back } = useRouter()
    const HTTP_CLIENT = useAPIClient()
    const pathname = usePathname()

    // Fetch Recipient Id
    const { singleRecipient, condominuimID, role, user } = useSelector((state: RootState) => state.user)
    // console.log("🚀 ~ ViewRecipients ~ role:", role)
    // console.log("🚀 ~ ViewRecipients ~ user:", user)
    // console.log("🚀 ~ ViewRecipients ~ singleRecipient:", singleRecipient)

    // For Reload
    const [reload, setIsReload] = useState<boolean>(false)

    // for import
    // const [importFile, setImportFile] = useState<boolean>(false)

    // For Initial
    const [loading, setLoading] = useState<boolean>(false)
    const [recipientList, setRecipientList] = useState<any>([])

    const handleIsEditOpen = (item: any) => {
        setIsEditData(item)
        setIsEditOpen(true)
    }

    // For Delete
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isDeleteData, setIsDeleteData] = useState<any>("")

    const handleIsDeleteOpen = (item: any) => {
        setIsDeleteData(item)
        setIsDelete(true)
    }

    // Pagination States
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    // Handle Page Click
    const handlePageClick = (event) => {
        setPage(event.selected)
    };


    //Role
    const findRole = () => {
        if (role === Role_Enums.SUBSCRIBER || role === Role_Enums.ADMIN) {
            return true
        }
        return false
    }

    const isGateHouse = () => {
        if (role === Role_Enums.GATEHOUSE) {
            return false
        }
        return true;
    }

    // For Search
    const [searchQuery, setSearchQuery] = useState(null)
    const dataToDisplay = useMemo(() => {
        const begin = page * limit;
        const end = begin + limit;

        if (searchQuery?.length > 0) {
            return recipientList?.filter(
                (user) =>
                    user?.recipientID?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase()) ||
                    user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                    user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                    user?.whatsapp?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase()) ||
                    user?.condominiumID?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase())
            )?.slice(begin, end);
        } else {
            return recipientList?.slice(begin, end);
        }
    }, [page, limit, recipientList, searchQuery]);
    // console.log("🚀 ~ dataToDisplay ~ dataToDisplay:", dataToDisplay)




    const fetchRecipientsWithSubscriber = async () => {
        try {
            setLoading(true)
            const { data, success }: any = await HTTP_CLIENT.get({ url: encodeURI(`/recipient/${condominuimID}/{unitID}`) })
            if (success === true) {
                setRecipientList(data?.reverse())
            }
            setLoading(false)
        } catch (error) {
            setRecipientList([])
            setLoading(false)

        }
    }

    const fetchRecipients = async () => {
        try {
            setLoading(true)
            const { data, success }: any = await HTTP_CLIENT.get({ url: `/recipient/${condominuimID}/${singleRecipient?.unitId}` })
            if (success === true) {
                setRecipientList(data?.reverse())
            }
            setLoading(false)
        } catch (error) {
            setRecipientList([])
            setLoading(false)

        }
    }
    const handleBack = () => {
        if (pathname !== Routes.SUBSCRIBER) {
            back()
        }
    }

    // const isImportDisplay = () => {
    //     if (pathname !== Routes.SUBSCRIBER) {
    //         return true
    //     }
    //     return false
    // }

    const headingContent = () => {
        if (pathname === "/assinante") {
            return `Destinatário: ${user?.condominium?.condominiumName}`
        } else {
            return `Destinatário: ${user?.condominium?.condominiumName}`
            // return `Unidade: ${singleRecipient?.address}`
        }
    }


    useEffect(() => {
        if (role === Role_Enums.SUBSCRIBER && pathname === Routes.SUBSCRIBER || role === Role_Enums.GATEHOUSE && pathname === Routes.GATEHOUSE) {
            fetchRecipientsWithSubscriber()
        } else {
            fetchRecipients()
        }
    }, [reload])
    return (
        <>
            <div className={pathname === Routes.SUBSCRIBER || pathname === Routes.GATEHOUSE ? styles.wrapper : classNames(["custom-class", styles.wrapper])}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div>
                            <div className={styles.heading} onClick={handleBack}>{pathname !== Routes.GATEHOUSE && pathname !== Routes.SUBSCRIBER && <IoChevronBackOutline />} {pathname === Routes.SUBSCRIBER ? "Destinatários" : findRole() ? "Destinatários da Unidade" : "Detalhes do destinatário"}</div>
                            <div className={styles.subheading}>{headingContent()}</div>
                        </div>
                        <div className={styles.searchAndAdd}>
                            <div className={styles.btnWrapperForMobile}>
                                {/* {isImportDisplay() && <div className={styles.import} onClick={() => setImportFile(true)} >Import</div>}/ */}
                                {isGateHouse() && <div className={styles.add} onClick={() => setIsOpen(true)}>Adicionar Destinatário</div>}
                            </div>
                            <div className={styles.searchWithIcon}>
                                <IoSearch color='#707070' />
                                <input type="search" placeholder='Procurar' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <div className={styles.btnWrapper}>
                                {/* {isImportDisplay() && <div className={styles.import} onClick={() => setImportFile(true)} >Import</div>} */}
                                {isGateHouse() && <div className={styles.add} onClick={() => setIsOpen(true)} >Adicionar Destinatário</div>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.tableWrapper}>
                        {loading ? <HashLoaderCom /> : dataToDisplay?.length === 0 ? <NoData /> :
                            <div className="py-4 rounded-2xl mt-5 w-full overflow-x-auto">
                                <table className="min-w-[1000px] w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[#F5F5F5] rounded-2xl">
                                            <th className="py-6 px-4 whitespace-nowrap text-left text-[#191720] text-[16px] leading-[19.36px] font-medium">
                                                Unidade
                                            </th>

                                            {/* <th className="py-6 px-4 whitespace-nowrap text-left text-[#191720] text-[16px] leading-[19.36px] font-medium">
                                                Unit ID
                                            </th> */}

                                            <th className="py-6 px-4 whitespace-nowrap text-left text-[#191720] text-[16px] leading-[19.36px] font-medium">
                                                Destinatário
                                            </th>
                                            {isGateHouse() &&
                                                <th className="py-6 px-4 whitespace-nowrap text-left text-[#191720] text-[16px] leading-[19.36px] font-medium">
                                                    E-mail
                                                </th>
                                            }
                                            {isGateHouse() &&
                                                <th className="py-6 px-4 whitespace-nowrap text-left text-[#191720] text-[16px] leading-[19.36px] font-medium">
                                                    Celular
                                                </th>
                                            }
                                            <th className="py-6 px-4 whitespace-nowrap text-left text-[#191720] text-[16px] leading-[19.36px] font-medium">
                                                Tipo de notificação
                                            </th>
                                            {isGateHouse() &&
                                                <th className="py-6 px-4 whitespace-nowrap text-left text-[#191720] text-[16px] leading-[19.36px] font-medium">
                                                    Ação
                                                </th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataToDisplay?.length && dataToDisplay.map((item: any, index: number) => (
                                            <tr key={index} className="hover:bg-gray-50 rounded-2xl py-6 px-6 3xl:px-8 whitespace-nowrap">
                                                <td className="py-6 px-4 3xl:px-8 text-gray-700">{item?.unit?.length > 0 ? item?.unit[0]?.address : ""}</td>
                                                {/* <td className="py-6 px-4 3xl:px-8 text-gray-700">{item?.unitID}</td> */}
                                                <td className="py-6 px-4 3xl:px-8 text-gray-700">{item?.name}</td>

                                                {isGateHouse() && <td className="py-6 px-4 3xl:px-8 text-gray-700">{item?.email}</td>}
                                                {isGateHouse() && <td className="py-6 px-4 3xl:px-8 text-gray-700">{item?.whatsapp}</td>}
                                                <td className="py-6 px-4 3xl:px-8 text-gray-700 capitalize">{item?.notificationType === 'both' ? 'Ambas' : item?.notificationType?.toLowerCase() === "no notification" ? "Nenhuma" : item?.notificationType}</td>

                                                {isGateHouse() &&
                                                    <td className="py-6 px-4 3xl:px-8 flex gap-x-5">
                                                        <button className="text-gray-500 hover:text-red-500" onClick={() => handleIsDeleteOpen(item)}>
                                                            <img src="/assets/delete.svg" className='w-[18.88] h-[18.88px]' />
                                                        </button>
                                                        <button className="text-gray-500 hover:text-blue-500" onClick={() => handleIsEditOpen(item)}>
                                                            <img src="/assets/edit-icon.svg" className='w-[18.88] h-[18.88px]' />
                                                        </button>
                                                        <button onClick={() => push(Routes.PARCEL_DETAIL)} className="w-[123px] h-[40px] text-[14px] leading-[16.94px] rounded-md border border-primary text-primary bg-white flex justify-center items-center">
                                                            Ver Pacotes
                                                        </button>
                                                    </td>
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
                {recipientList?.length === 0 ? (
                    null
                ) : (
                    <ReactPaginate
                        activeClassName={"item activee "}
                        breakClassName={"item break-me "}
                        breakLabel={"..."}
                        nextLabel="Prox >"
                        forcePage={page}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        disabledClassName={"disabled-page"}
                        marginPagesDisplayed={2}
                        pageCount={Math.ceil(recipientList?.length / limit)}
                        previousLabel="< Ant"
                        pageClassName={"item pagination-page "}
                        pageRangeDisplayed={2}
                    />
                )}
            </div>
            {/* {importFile && <ImportFilePopup condominuimID={condominuimID} UnitId={singleRecipient?.unitId} Open={importFile} handleClose={() => setImportFile(false)} Reload={() => setIsReload(!reload)} />} */}
            {isDelete && <DeleteRecipientModal editData={isDeleteData} Reload={() => setIsReload(!reload)} Open={isDelete} handleClose={() => setIsDelete(false)} />}
            {isOpen && <RecipientsPopup unitId={dataToDisplay?.length > 0 && dataToDisplay[0]?.unitID} unitList={unitList} Reload={() => setIsReload(!reload)} singleRecipient={singleRecipient} Open={isOpen} handleClose={() => setIsOpen(false)} />}
            {isEditOpen && <RecipientsPopup unitId={dataToDisplay?.length > 0 && dataToDisplay[0]?.unitID} unitList={unitList} Reload={() => setIsReload(!reload)} singleRecipient={singleRecipient} Open={isEditOpen} handleClose={() => setIsEditOpen(false)} editData={editData} />}

        </>
    )
}
