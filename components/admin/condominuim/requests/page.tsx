import React, { useMemo, useState } from 'react'
import styles from "./requests.module.scss"
import NoData from '@/components/common/no-data/page'
import { BsThreeDotsVertical } from 'react-icons/bs'
import OutsideClickHandler from 'react-outside-click-handler'
import { FirstLetterCapital, truncateText } from '@/utils/custom-functions'
import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'
import { saveAdmin, saveIsCondominuim } from '@/store/reducers/userReducer'
import { useRouter } from 'next/navigation'
import ImageViewer from 'react-simple-image-viewer'
export default function RequestCondominuim(props: any) {
    const { searchQuery, handleOpen, findIndx, isActive, setActive, handleRequest, condominuimRequest } = props
    const dispatch = useDispatch()
    const router = useRouter()


    // For Pagination
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(0);

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    // For Parcel View
    const [isAttachmentOpen, setIsAttachmentOpen] = useState<boolean>(false)
    const [attachmentURL, setAttachmentURL] = useState<string>('')


    const dataToDisplay = useMemo(() => {
        const begin = page * limit;
        const end = begin + limit;

        if (searchQuery?.length > 0) {
            return condominuimRequest?.filter(
                (user) =>
                    user?.condominiumID?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase()) ||
                    user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                    user?.planName?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase())
            )?.slice(begin, end);
        } else {
            return condominuimRequest?.slice(begin, end);
        }
    }, [page, limit, condominuimRequest, searchQuery]);

    const handleNavigateRecipient = (item: any) => {
        if (!item?.proofOfPayment) return null;
        setAttachmentURL(item?.proofOfPayment)
        setIsAttachmentOpen(true)
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
                            <div className={styles.editIcon}>
                                <BsThreeDotsVertical size={16} className='cursor-pointer text-[#707070]' onClick={() => handleOpen(key)} />
                                {isActive && findIndx === key &&
                                    <OutsideClickHandler onOutsideClick={() => setActive(false)}>
                                        <div className={styles.editPopup}>
                                            <span onClick={() => handleRequest(item, "Accept")}>Aceitar</span>
                                            <p onClick={() => handleRequest(item, "Reject")}>Rejeitar</p>
                                        </div>
                                    </OutsideClickHandler>
                                }
                            </div>
                        </div>
                        <div className={styles.planName}>
                            <div className={styles.left}>Nome do plano:</div>
                            <div className={styles.right}>{item?.planName || ""}</div>
                        </div>
                        <div className={styles.address}>
                            <div className={styles.left}>E-mail:</div>
                            <div className={styles.right}>{truncateText(item?.email || "", 5)}</div>
                        </div>
                        <div className={styles.planName}>
                            <div className={styles.left}>Status:</div>
                            <div className={styles.rightLabel}>{FirstLetterCapital(item?.type) || ""}</div>
                        </div>
                        <button className={styles.view} onClick={() => handleNavigateRecipient(item)}>
                            {item?.proofOfPayment === null ? "N/A" : "Ver prova"}
                        </button>
                    </div>
                ))}
            </div>
            {condominuimRequest?.length === 0 ? (
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
                    pageCount={Math.ceil(condominuimRequest?.length / limit)}
                    previousLabel="< Ant"
                    pageClassName={"item pagination-page "}
                    pageRangeDisplayed={2}
                />
            )}
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
        </>
    )
}
