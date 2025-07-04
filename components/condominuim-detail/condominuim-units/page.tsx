import React, { useState } from 'react'
import styles from "./condominuim.module.scss"
import { BsTrash2 } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import RecipientsPopup from '@/components/common/popups/view-recipients/page';
import AddUnitsPopup from '@/components/common/popups/subscriber/add-unit/page';
import NoData from '@/components/common/no-data/page';
import ReactPaginate from 'react-paginate';
import "./pagination.css"
import DeleteModal from '@/components/common/popups/subscriber/delete';
export default function CondominuimUnits(props: any) {
    const { unitList, dataToDisplay, page, handlePageClick, limit, Reload, handleNavigateRecipient } = props;
    // console.log("🚀 ~ CondominuimUnits ~ unitList:", unitList)
    const titles = ['Unit ID', 'Condominium ID:', 'Number of Recipients:', 'Action']

    const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
    const [editData, setIsEditData] = useState<any>(null)
    const { push, back } = useRouter()


    const handleIsEditOpen = (item: any) => {
        setIsEditData(item)
        setIsEditOpen(true)
    }

    // For Delete
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isDeleteId, setIsDeleteId] = useState<any | string>("")


    const handleDelete = (id: string) => {
        setIsDeleteId(id)
        setIsDelete(true)
    }

    return (
        <>
            <div className={styles.tableWrapper}>
                {dataToDisplay?.length === 0 ? <NoData /> :
                    <div className="py-4 rounded-2xl mt-5 w-full overflow-x-auto">
                        <table className="min-w-[1000px] w-full border-collapse">
                            <thead>
                                <tr className="bg-[#F5F5F5] rounded-2xl">
                                    {titles?.length && titles.map((header: string, key: number) => (
                                        <th key={key} className="py-6 px-6 3xl:px-8 text-left text-[#191720] text-[16px] leading-[19.36px] font-medium">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dataToDisplay?.length && dataToDisplay?.map((item: any, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50 rounded-2xl py-6 px-6 3xl:px-8">
                                        <td className="py-6 px-6 3xl:px-8 text-gray-700">{item?.unitId || ""}</td>
                                        <td className="py-6 px-6 3xl:px-8 text-gray-700">{item?.condominiumID || ""}</td>
                                        <td className="py-6 px-6 3xl:px-8 text-gray-700">{item?.numberOfRecipients || "0"}</td>
                                        <td className="py-6 px-0 3xl:px-8 flex gap-x-8">
                                            <button className="text-gray-500 hover:text-red-500" onClick={() => handleDelete(item)}>
                                                <img src="/assets/delete.svg" className='w-[18.88] h-[18.88px]' />
                                            </button>
                                            <button className="text-gray-500 hover:text-blue-500" onClick={() => handleIsEditOpen(item)}>
                                                <img src="/assets/edit-icon.svg" className='w-[18.88] h-[18.88px]' />
                                            </button>
                                            <button onClick={() => handleNavigateRecipient(item)} className="text-[14px] leading-[16px] font-normal w-[140px] h-[40px] rounded-md border border-primary text-primary bg-white flex justify-center items-center">
                                                View Recipients
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
                {unitList?.length === 0 ? (
                    null
                ) : (
                    <ReactPaginate
                        activeClassName={"item activee "}
                        breakClassName={"item break-me "}
                        breakLabel={"..."}
                        nextLabel="Next >"
                        forcePage={page}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        disabledClassName={"disabled-page"}
                        marginPagesDisplayed={2}
                        pageCount={Math.ceil(unitList?.length / limit)}
                        previousLabel="< Prev"
                        pageClassName={"item pagination-page "}
                        pageRangeDisplayed={2}
                    />
                )}
            </div>
            {isDelete && <DeleteModal Open={isDelete} Reload={Reload} handleClose={() => setIsDelete(false)} editData={isDeleteId} />}
            {isEditOpen && <AddUnitsPopup Reload={Reload} Open={isEditOpen} handleClose={() => setIsEditOpen(false)} editData={editData} />}
        </>
    )
}
