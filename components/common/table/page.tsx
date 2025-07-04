import React from "react";
import { BiEdit } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import NoData from "../no-data/page";


const StyledTable = (props: any) => {
    const { titles, data, handleIsOpen } = props

    if (!titles?.length) {
        return null
    }
    return (
        <div className="p-4 rounded-2xl mt-5 w-full overflow-x-auto">
            <table className="min-w-[1000px] w-full border-collapse">
                <thead>
                    <tr className="bg-gray-50 rounded-2xl">
                        {titles?.length && titles.map((header: string, key: number) => (
                            <th key={key} className="p-3 text-left text-gray-600 font-medium">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.length && data.map((item: any, index: number) => (
                        <tr key={index} className="even:bg-gray-50 rounded-2xl">
                            <td className="p-3 text-gray-700">{item.id}</td>
                            {item?.recipient && <td className="p-3 text-gray-700">{item.recipient}</td> }
                            <td className="p-3 text-gray-700">{item.registrationDate}</td>
                            <td className="p-3 text-gray-700">{item.status}</td>
                            {item?.collectedDate && <td className="p-3 text-gray-700">{item.collectedDate}</td> }
                            <td className="p-3">
                                <img src={item.picture} alt="Item" className="w-10 h-10 rounded-md" />
                            </td>
                            <td className="p-3 flex space-x-2">
                                <button className="text-gray-500 hover:text-red-500">
                                    <BsTrash2 size={18} />
                                </button>
                                <button className="text-gray-500 hover:text-blue-500" onClick={()=>handleIsOpen(item)}>
                                    <BiEdit size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StyledTable;
