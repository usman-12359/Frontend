import NoData from '@/components/common/no-data/page'
import { Routes } from '@/routes'
import { saveAdmin, saveIsCondominuim } from '@/store/reducers/userReducer'
import { truncateText } from '@/utils/custom-functions'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'
import styles from "./lists.module.scss"
export default function ListsCondominuim(props: any) {
    const {searchQuery, handleOpen, findIndx, isActive, setActive, handleRequest, condominuimList } = props
    const dispatch = useDispatch()
    const router = useRouter()


     // For Pagination
        const [limit, setLimit] = useState(15);
        const [page, setPage] = useState(0);
    
        const handlePageClick = (event) => {
            setPage(event.selected);
        };


    const dataToDisplay = useMemo(() => {
        const begin = page * limit;
        const end = begin + limit;

        if (searchQuery?.length > 0) {
            return condominuimList?.filter(
                (user) =>
                    user?.condominiumID?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase()) ||
                    user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                    user?.planName?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase())
            )?.slice(begin, end);
        } else {
            return condominuimList?.slice(begin, end);
        }
    }, [page, limit, condominuimList, searchQuery]);

    const handleNavigateRecipient = (item: any) => {
        dispatch(saveIsCondominuim(item?.condominiumID))
        dispatch(saveAdmin(item))
        router.push(Routes.CONDOMINIO)
    }

    return (
        <>
            <div className={styles.cardWrapper} style={{ justifyContent: `${dataToDisplay?.length < 16 ? "flex-start" : "justify-between"}` }}>
                {dataToDisplay?.length === 0 ? <NoData /> : dataToDisplay?.map((item, key: number) => (
                    <div className={styles.card} key={key}>
                        <div className={styles.menuWithIcon}>
                            <div className={styles.withIcon}>
                                <div className={styles.icon}>
                                    <img src="/assets/condominuim.svg" alt='' />
                                </div>
                                <div className={styles.name}>
                                    <label>ID do condomínio</label>
                                    <span>{item?.condominiumID || ""}</span>
                                </div>
                            </div>
                            {/* <div className={styles.editIcon}>
                                <BsThreeDotsVertical size={16} className='cursor-pointer text-[#707070]' onClick={() => handleOpen(key)} />
                                {isActive && findIndx === key &&
                                    <OutsideClickHandler onOutsideClick={() => setActive(false)}>
                                        <div className={styles.editPopup}>
                                            <span onClick={() => handleRequest(item, "Accept")}>Accept</span>
                                            <p onClick={() => handleRequest(item, "Reject")}>Reject</p>
                                        </div>
                                    </OutsideClickHandler>
                                }
                            </div> */}
                        </div>
                        <div className={styles.address}>
                            <div className={styles.left}>E-mail:</div>
                            <div className={styles.right}>{truncateText(item?.email || "", 5)}</div>
                        </div>
                        <div className={styles.planName}>
                            <div className={styles.left}>Nome do plano:</div>
                            <div className={styles.right}>{item?.planName || ""}</div>
                        </div>
                        <div className={styles.planName}>
                            <div className={styles.left}>Status:</div>
                            {item?.status && <div className={styles.rightLabel}>{item?.status || ""}</div>}
                        </div>
                        <button className={styles.view} onClick={() => handleNavigateRecipient(item)}>
                            Selecione
                        </button>
                    </div>
                ))}
            </div>
            {condominuimList?.length === 0 ? (
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
                    pageCount={Math.ceil(condominuimList?.length / limit)}
                    previousLabel="< Ant"
                    pageClassName={"item pagination-page "}
                    pageRangeDisplayed={2}
                />
            )}
        </>
    )
}
