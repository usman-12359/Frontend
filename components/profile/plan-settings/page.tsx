"use client"
import { HashLoaderCom } from '@/components/common/loader/component-loader';
import NoData from '@/components/common/no-data/page';
import CreatePlanPopup from '@/components/common/popups/create-plan/page';
import DeletePlanModal from '@/components/common/popups/delete-plan';
import useAPIClient from '@/utils/api-client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { CgMoreVertical } from 'react-icons/cg';
import styles from "./plan.module.scss"
import { formatBRLCurrency } from '@/utils/custom-functions';
import OutsideClickHandler from "react-outside-click-handler";
import { SUBSCRIPTION_PLAN_TYPES } from '@/utils/enum/page';


export default function PlansSettings(props: any) {
    const { setIsOpen, isOpen, setReload, reload, loading, plansList } = props
    const [menuOpen, setMenuOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null)
    const [Indx, setIndx] = useState<number | any>()

    
    const handleOpenMenu = (index: number) => {
        setIndx(index)
        setMenuOpen(true)
    }
    const handleEditOpenState = (item: any,) => {
        setEditData(item)
        setEditOpen(true)
        setMenuOpen(false)
    }
    const handleDeleteOpenState = (item: any,) => {
        setEditData(item)
        setDeleteOpen(true)
        setMenuOpen(false)
    }


  

    return (
        <>
            {loading ? <HashLoaderCom /> : plansList?.length === 0 ? <NoData /> :
                plansList?.map((item: any, key: number) => (
                    <div className="w-full mt-[20px] min-h-[298px] pb-6" key={key}>
                        <div className="w-full bg-[#FFF9F6] rounded-[10px] p-[26px] box-border">
                            {/* Left Section */}
                            <div className="w-full flex justify-between items-end">
                                <div className="bg-primary text-[16px] leading-[27px] text-white rounded-md px-2 box-border min-w-[113px] h-[35px] flex justify-center  items-center font-medium">
                                    {item?.name}
                                </div>
                                <div className="relative mt-4 md:mt-0">
                                    <button
                                        onClick={() => handleOpenMenu(key)}
                                        className="p-2 rounded-full hover:bg-gray-200"
                                    >
                                        <CgMoreVertical size={20} />
                                    </button>
                                    {Indx === key && menuOpen && (
                                        <OutsideClickHandler onOutsideClick={() => setMenuOpen(false)}>
                                            <div className=" max-w-[150px] px-4 absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 font-normal z-10">
                                                <button className="block py-2 w-full  text-[12px] leading-[21.78px] text-left border-b" onClick={() => handleEditOpenState(item)} >Editar</button>
                                                <button className="block py-2 w-full text-[12px] leading-[21.78px] text-left text-[#EB001B]" onClick={() => handleDeleteOpenState(item)} >Excluir</button>
                                            </div>
                                        </OutsideClickHandler>
                                    )}
                                </div>
                            </div>
                            <ul className={styles.listedItems} dangerouslySetInnerHTML={{ __html: item?.details }}>
                            </ul>
                            <div className="w-full flex items-center flex-wrap gap-x-2 justify-between">
                                <div className="mt-3 text-[12px] leading-[14.52px] text-[#707070] order-2 md:order-1">
                                    {/* <span className="text-primary font-medium">Starting Date:</span> 12-12-2024 */}
                                    {/* <span className="ml-4 text-primary font-medium">Ending Date:</span> 12-12-2024 */}
                                </div>
                                <div className="text-right mt-4 order-1 md:order-2">
                                    <div className="text-xl font-semibold text-gray-900">Preço de varejo :<span className='font-normal'> <small>Por 40 unidades:</small> {formatBRLCurrency(item?.baseRetailPrice)}</span></div>
                                    <div className="text-xl font-semibold text-gray-900">Preço de varejo :<span className='font-normal'> <small>Por 10 unidades:</small> {formatBRLCurrency(item?.retailPricePerTenUnit)}</span></div>
                                    <div className="text-xl font-semibold text-gray-900">Preço de lançamento :<span className='font-normal'> <small>Por 40 unidades:</small> {formatBRLCurrency(item?.baseLaunchPrice)}</span></div>
                                    <div className="text-xl font-semibold text-gray-900">Preço de lançamento :<span className='font-normal'> <small>Por 10 unidades:</small> {formatBRLCurrency(item?.launchPricePerTenUnit)}</span></div>
                                    {/* <span className="text-gray-500 text-sm">/Month</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            {/* <div className="w-full mt-[20px] min-h-[298px] pb-6">
                <div className="w-full bg-[#FFF9F6] rounded-[10px] p-[26px] box-border">
                  
                    <div className="w-full flex justify-between items-end">
                        <div className="bg-primary text-[16px] leading-[27px] text-white rounded-md w-[113px] h-[35px] flex justify-center  items-center font-medium">
                            Premium Plan
                        </div>
                        <div className="relative mt-4 md:mt-0">
                          
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="p-2 rounded-full hover:bg-gray-200"
                            >
                                <CgMoreVertical size={20} />
                            </button>

                           
                            {menuOpen && (
                                <div className=" max-w-[150px] px-4 absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 font-normal z-10">
                                    <button className="block py-2 w-full  text-[12px] leading-[21.78px] text-left border-b">Edit</button>
                                    <button className="block py-2 w-full text-[12px] leading-[21.78px] text-left text-[#EB001B]">Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <ul className="mt-4 text-[#707070] space-y-1 text-sm">
                        <li>• All Premium features.</li>
                        <li>• Unlimited AI-generated blog setup.</li>
                        <li>• Future Update: Full VR Showroom.</li>
                        <li>• Natural SEO boost for enhanced organic visibility.</li>
                        <li>• Advanced analytics and reporting.</li>
                        <li>• Client profiling for competitor analysis and sales optimization.</li>
                        <li>• Advanced Email Marketing - Cold email - Automatic Sequences & Much more.</li>
                    </ul>
                    <div className="w-full flex items-center flex-wrap gap-x-2 justify-between">
                        <div className="mt-3 text-[12px] leading-[14.52px] text-[#707070] order-2 md:order-1">
                           
                        </div>
                        <div className="text-right mt-4 order-1 md:order-2">
                            <span className="text-2xl font-semibold text-gray-900">$399</span>
                            <span className="text-gray-500 text-sm">/Month</span>
                        </div>
                    </div>
                </div>



            </div>
            <div className="w-full mt-[20px] min-h-[298px] pb-6">
                <div className="w-full bg-[#FFF9F6] rounded-[10px] p-[26px] box-border">
                   
                    <div className="w-full flex justify-between items-end">
                        <div className="bg-primary text-[16px] leading-[27px] text-white rounded-md w-[113px] h-[35px] flex justify-center  items-center font-medium">
                            Ultimate Plan
                        </div>
                        <div className="relative mt-4 md:mt-0">
                          
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="p-2 rounded-full hover:bg-gray-200"
                            >
                                <CgMoreVertical size={20} />
                            </button>

                         
                            {menuOpen && (
                                <div className=" max-w-[150px] px-4 absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 font-normal z-10">
                                    <button className="block py-2 w-full  text-[12px] leading-[21.78px] text-left border-b">Edit</button>
                                    <button className="block py-2 w-full text-[12px] leading-[21.78px] text-left text-[#EB001B]">Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <ul className="mt-4 text-[#707070] space-y-1 text-sm">
                        <li>• All Premium features.</li>
                        <li>• Unlimited AI-generated blog setup.</li>
                        <li>• Future Update: Full VR Showroom.</li>
                        <li>• Natural SEO boost for enhanced organic visibility.</li>
                        <li>• Advanced analytics and reporting.</li>
                        <li>• Client profiling for competitor analysis and sales optimization.</li>
                        <li>• Advanced Email Marketing - Cold email - Automatic Sequences & Much more.</li>
                    </ul>
                    <div className="w-full flex items-center flex-wrap gap-x-2 justify-between">
                        <div className="mt-3 text-[12px] leading-[14.52px] text-[#707070] order-2 md:order-1">
              
                        </div>
                        <div className="text-right mt-4 order-1 md:order-2">
                            <span className="text-2xl font-semibold text-gray-900">$499</span>
                            <span className="text-gray-500 text-sm">/Month</span>
                        </div>
                    </div>
                </div>



            </div> */}
            {isOpen && <CreatePlanPopup plansList={plansList} Reload={() => setReload(!reload)} Open={isOpen} handleClose={() => setIsOpen(false)} />}
            {editOpen && <CreatePlanPopup plansList={plansList} editData={editData} Reload={() => setReload(!reload)} Open={editOpen} handleClose={() => setEditOpen(false)} />}
            {deleteOpen && <DeletePlanModal editData={editData} Reload={() => setReload(!reload)} Open={deleteOpen} handleClose={() => setDeleteOpen(false)} />}

        </>
    )
}
