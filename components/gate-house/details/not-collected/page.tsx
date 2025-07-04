"use client"
import NoData from '@/components/common/no-data/page';
import moment from 'moment';
import { useMemo } from 'react';
import styles from "./not-collected.module.scss";
export default function NotCollected(props: any) {
  const { notCollected, handleIsOpen, handleDelete, findRole, handleOpenAttachment, searchQuery } = props;
  const tableTitles = ['Código da Encomenda', 'Destinatário', 'Data de registro', 'Status de notificação', 'Foto', 'Ação']


  const dataToDisplay = useMemo(() => {
    if (searchQuery?.length > 0) {
      return notCollected?.filter(
        (user) =>
          user?.fullName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          user?.contact?.toString()?.toLowerCase()?.includes(searchQuery?.toString()?.toLowerCase())
      );
    } else {
      return notCollected;
    }
  }, [notCollected, searchQuery]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {dataToDisplay?.length === 0 ? <NoData /> :
          <div className="p-4 rounded-2xl mt-5 w-full overflow-x-auto">
            <table className="min-w-[1000px] w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 rounded-2xl">
                  {tableTitles?.length && tableTitles.map((header: string, key: number) => (
                    <th key={key} className="p-3 text-left text-gray-600 font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataToDisplay?.length && dataToDisplay?.map((item: any, index: number) => (
                  <tr key={index} className="even:bg-gray-50 rounded-2xl">
                    <td className="p-3 text-gray-700">{item?.parcelId}</td>
                    <td className="p-3 text-gray-700">{item?.fullName}</td>
                    <td className="p-3 text-gray-700">{item?.registrationDate ? moment(item?.registrationDate)?.format("DD/MM/YYYY HH:MM") : ""}</td>
                    <td className="p-3 text-gray-700">{item?.notificationStatus === 'notified' ? 'Notificado' : item.notificationStatus === 'pending' ? 'Pendente' : item?.notificationStatus}</td>
                    {/* <td className="p-3 text-gray-700">{moment(item?.collectionDate)?.format("lll")}</td> */}
                    <td className="p-3">
                      <img src={item?.imageURL} onClick={() => handleOpenAttachment(item?.imageURL)} alt="" className="w-10 h-10 rounded-md cursor-pointer" />
                    </td>
                    <td className="p-3 flex space-x-2">
                      {findRole() &&
                        <button className="text-gray-500 hover:text-red-500" onClick={() => handleDelete(item)}>
                          <img src="/assets/delete.svg" className='w-[18.88] h-[18.88px]' />
                        </button>
                      }
                      <button className="text-gray-500 hover:text-blue-500" onClick={() => handleIsOpen(item, "not-collected")}>
                        <img src="/assets/edit-icon.svg" className='w-[18.88] h-[18.88px]' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  )
}
