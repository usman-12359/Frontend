"use client"
import Modal from '@/components/common/modal';
import { RotatingLines } from 'react-loader-spinner';
import styles from "./upload.module.scss";
import UseImportFile from './useImportFile';
import { IoMdPhotos } from 'react-icons/io';
export default function ImportFilePopup(props: any) {
    const { handleClose, Open, Reload, UnitId, isUnit, condominuimID } = props;
    const { loading, handleUploadPhoto, } = UseImportFile({ condominuimID: condominuimID, isUnit: isUnit, UnitId: UnitId, Reload: Reload, handleClose: handleClose, })
    // console.log("🚀 ~ UploadPhoto ~ payload:", payload)
    return (
        <Modal onClose={handleClose} visible={Open} btn={true}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <label className={styles.selectPhoto} htmlFor='uploadPhoto'>
                        {loading ? <RotatingLines
                            strokeColor="#F36B31"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="22"
                            visible={true}
                        /> :
                            <div className='flex flex-col items-center gap-y-2'>
                                <IoMdPhotos size={30} />
                                Selecione o arquivo
                            </div>
                        }
                        <input disabled={loading} type="file"
                            accept=".csv" id="uploadPhoto" onChange={(event) => handleUploadPhoto(event)} />
                    </label>
                </div>
            </div>
        </Modal>
    )
}
