"use client"
import React, { useMemo, useState } from 'react'
import styles from "./units.module.scss"
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import OutsideClickHandler from "react-outside-click-handler";
import AddUnitsPopup from '@/components/common/popups/subscriber/add-unit/page';
import { useRouter } from 'next/navigation';
import { truncateText } from '@/utils/custom-functions';
import NoData from '@/components/common/no-data/page';
import classNames from 'classnames';
import "./pagination.css"
import ReactPaginate from "react-paginate";


export default function Units(props: any) {
    const { handleOpenAdd, unitList, handleDelete, handleOpenEdit, handleNavigateRecipient, findRole, setImportFile, condominuimDetail } = props;
    // console.log("🚀 ~ Units ~ unitList:", unitList)
    const { push } = useRouter()
    const [isActive, setActive] = useState<boolean>(false)
    const [findIndx, setFindIndx] = useState<number | null>(null)

    const handleOpen = (item: number) => {
        setFindIndx(item)
        setActive(true)
    }

    // For Pagination
    const [limit, setLimit] = useState(15);
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
                    user?.unitId?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase()) ||
                    user?.address?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                    user?.numberOfRecipients?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase())
            )?.slice(begin, end);
        } else {
            return unitList?.slice(begin, end);
        }
    }, [page, limit, unitList, searchQuery]);
    // console.log("🚀 ~ dataToDisplay ~ dataToDisplay:", dataToDisplay)





    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.heading}>Unidades</div>
                        <div className={styles.searchAndAdd}>
                            <div className={styles.searchWithIcon}>
                                <IoSearch color='#707070' />
                                <input type="search" placeholder='Procurar' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            {findRole() &&
                                <>
                                    <button className={styles.import} disabled={condominuimDetail?.condominium?.numberOfRegisteredUnits >= condominuimDetail?.condominium?.numberOfUnitsInCondominium} onClick={() => setImportFile(true)} >Importar</button>
                                    <button className={styles.add} disabled={condominuimDetail?.condominium?.numberOfRegisteredUnits >= condominuimDetail?.condominium?.numberOfUnitsInCondominium} onClick={handleOpenAdd}>Adicionar Unidade</button>
                                </>
                            }
                        </div>
                    </div>
                    <div className={styles.cardWrapper} style={{ justifyContent: `${dataToDisplay?.length < 16 ? "flex-start" : "justify-between"}` }}>
                        {dataToDisplay?.length === 0 ? <NoData /> : dataToDisplay?.map((item: any, key: number) => (
                            <div className={styles.card} key={key}>
                                <div className={styles.menuWithIcon}>
                                    <div className={styles.withIcon}>
                                        <div className={styles.icon}>
                                            <img src="/assets/home.svg" alt='' />
                                        </div>
                                        <div className={styles.name}>
                                            <label>Código da Unidade</label>
                                            <span>{item?.unitId}</span>
                                        </div>
                                    </div>
                                    {findRole() &&
                                        <div className={styles.editIcon}>
                                            <BsThreeDotsVertical size={16} className='cursor-pointer text-[#707070]' onClick={() => handleOpen(key)} />
                                            {isActive && findIndx === key &&
                                                <OutsideClickHandler onOutsideClick={() => setActive(false)}>
                                                    <div className={styles.editPopup}>
                                                        <span onClick={() => handleOpenEdit(item)}>Editar</span>
                                                        <p onClick={() => handleDelete(item)}>Excluir</p>
                                                    </div>
                                                </OutsideClickHandler>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className={styles.address}>
                                    <div className={styles.left}>Complemento:</div>
                                    <div className={styles.right}>{truncateText(item?.address, 5)}</div>
                                </div>
                                <div className={styles.numofUnits}>
                                    <div className={styles.left}>Número de destinatários:</div>
                                    <div className={styles.right}>{item?.numberOfRecipients}</div>
                                </div>
                                <button className={styles.view} onClick={() => handleNavigateRecipient(item)}>
                                Ver destinatários
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {unitList?.length === 0 ? (
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
                        pageCount={Math.ceil(unitList?.length / limit)}
                        previousLabel="< Ant"
                        pageClassName={"item pagination-page "}
                        pageRangeDisplayed={2}
                    />
                )}
            </div>
            {/* <AddUnitsPopup Open={isOpen} handleClose={() => setIsOpen(false)} editData={editData} /> */}
        </>
    )
}
