import { SUBSCRIPTION_PLAN_TYPES } from '@/utils/enum/page';
import Modal from '../../modal';
import styles from "./recipients.module.scss";
import UsePlans from './usePlan';
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState, convertFromRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
const Editor = dynamic<EditorProps>(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
);

export default function CreatePlanPopup(props: any) {
    const { handleClose, Open, editData, Reload, plansList } = props;
    const { formik, loading } = UsePlans({ plansList: plansList, handleClose: handleClose, editData: editData, Reload: Reload })


    const [editorState, setEditorState] = useState("");

    const onEditorStateChange = async (value) => {
        setEditorState(value);
        const response = await draftToHtml(convertToRaw(value?.getCurrentContent()));
        formik.setFieldValue("details", response)
    };

    useEffect(() => {
        if (editData) {
            const blocksFromHtml = htmlToDraft(editData?.details);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState)
            formik.setFieldValue("active", editData?.active)
            formik.setFieldValue("name", editData?.name)
            formik.setFieldValue("baseRetailPrice", editData?.baseRetailPrice)
            formik.setFieldValue("retailPricePerTenUnit", editData?.retailPricePerTenUnit)
            formik.setFieldValue("baseLaunchPrice", editData?.baseLaunchPrice)
            formik.setFieldValue("launchPricePerTenUnit", editData?.launchPricePerTenUnit)
            formik.setFieldValue("type", editData?.type)
            formik.setFieldValue("details", editData?.details)
        }
    }, [editData]);

    return (
        <Modal onClose={handleClose} visible={Open} btn={true}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h2 className={styles.heading}>{editData ? "Editar plano" : "Criar plano"}</h2>
                    <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>

                        <div className={styles.inputWrapper}>
                            <label className={styles.title}>Nome do plano</label>
                            <input  {...formik.getFieldProps("name")} type="text" placeholder="Insira o nome do plano" />
                            {formik.touched.name && formik.errors.name ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.name as string}
                                </div>
                            ) : null}
                        </div>

                        <div className={styles.inputWrapper}>
                            <label className={styles.title}>Preço de varejo Por 40 unidades</label>
                            <input type="number" {...formik.getFieldProps("baseRetailPrice")} placeholder="Preço base de varejo" />
                            {formik.touched.baseRetailPrice && formik.errors.baseRetailPrice ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.baseRetailPrice as any}
                                </div>
                            ) : null}
                        </div>
                        <div className={styles.inputWrapper}>
                            <label className={styles.title}>Preço de varejo Por 10 unidades</label>
                            <input type="number"   placeholder="Insira o preço com desconto" 
                            {...formik.getFieldProps("retailPricePerTenUnit")}
                            // value={formik.values.retailPricePerTenUnit}
                            // onChange={(e) => {
                            //         const numericValue = e.target.value.replace(/[^0-9]/g, '');
                            //         formik.setFieldValue("retailPricePerTenUnit", numericValue);
                            //     }}
                            />
                            {formik.touched.retailPricePerTenUnit && formik.errors.retailPricePerTenUnit ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.retailPricePerTenUnit as any}
                                </div>
                            ) : null}
                        </div>
                        <div className={styles.inputWrapper}>
                            <label className={styles.title}>Preço de lançamento Por 40 unidades</label>
                            <input
                                type="number"
                                placeholder="Preço de lançamento"
                                {...formik.getFieldProps("baseLaunchPrice")}
                                // value={formik.values.baseLaunchPrice}
                                // onChange={(e) => {
                                //     const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                //     formik.setFieldValue("baseLaunchPrice", numericValue);
                                // }}
                            />
                            {formik.touched.baseLaunchPrice && formik.errors.baseLaunchPrice ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.baseLaunchPrice}
                                </div>
                            ) : null}
                        </div>
                        <div className={styles.inputWrapper}>
                            <label className={styles.title}>Preço de lançamento Por 10 unidades</label>
                            <input
                                type="number" 
                                placeholder="Preço de lançamento"
                                {...formik.getFieldProps("launchPricePerTenUnit")}
                                // value={formik.values.launchPricePerTenUnit}
                                // onChange={(e) => {
                                //     const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                //     formik.setFieldValue("launchPricePerTenUnit", numericValue);
                                // }}
                            />
                            {formik.touched.launchPricePerTenUnit && formik.errors.launchPricePerTenUnit ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.launchPricePerTenUnit}
                                </div>
                            ) : null}
                        </div>

                        <div className={styles.inputWrapper}>
                            <label className={styles.title}>Tipo de plano</label>
                            <select {...formik.getFieldProps("type")}>
                                <option value="" disabled>Selecione o plano</option>
                                <option value={SUBSCRIPTION_PLAN_TYPES.MONTHLY}>Mensal</option>
                                <option value={SUBSCRIPTION_PLAN_TYPES.YEARLY}>Anual</option>

                            </select>
                            {formik.touched.type && formik.errors.type ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.type}
                                </div>
                            ) : null}
                        </div>


                        <div className={styles.inputWrapper}>
                            <label className={styles.title}>Descrição</label>
                            <div className="h-[100px] lg:h-[150px] 3xl:h-[200px] overflow-y-scroll border rounded-md mt-1">
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={onEditorStateChange}
                                />
                            </div>
                            {/* <input type="text" {...formik.getFieldProps("details")} placeholder="Enter description" /> */}
                            {formik.touched.details && formik.errors.details ? (
                                <div className={styles.errorStyle}>
                                    {formik.errors.details}
                                </div>
                            ) : null}
                        </div>

                        <button type="submit" disabled={loading}> {loading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="22"
                                visible={true} /> : editData ? "Atualizar" : "Adicionar"}</button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
