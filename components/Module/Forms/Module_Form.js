// Dependency
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles
import moduleApollo, { addModuleHandler, updateModuleHandler } from '../../../lib/apollo_client/moduleApollo'

// Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'
import FormikForm from '../../Formik/FormikForm'
import FormikControl from '../../Formik/FormikControl'
import FormikSubmit from '../../Formik/FormikSubmit'
import { isObjEmpty, cloneAndPluck } from '../../../helpers/reusable'
import { getObjectWithValuesAt, renderComponentWithProps } from '../../../helpers/specific'


export default function Module_Form({ open: isModalOpen, handleClose: modalCloser, data: activeModuleData = {} }) {

    const moduleState = moduleApollo();
    const moduleStateList = [...moduleState.list]
    const isNewSubmission = isObjEmpty(activeModuleData); // is item a non-empty object

    const formData = {
        title: 'Module',
        fields: {
            id: ['', Yup.string().required('Required'), {
                control: 'input',
                type: 'text',
                label: 'Module ID',
                name: 'id',
                disabled: !isNewSubmission
            }],
            name: ['', Yup.string().required('Required'), {
                control: 'input',
                type: 'text',
                label: 'Module Name',
                name: 'name',
                disabled: !isNewSubmission,
                // ? Dropdown is given to keep the same category of modules exactly match w.r.t spelling and case and to avoid scenarios like 'gLAS', 'Glass', 'glass' etc.
                datalist: moduleStateList.reduce((prev, { name: moduleName }) => {
                    if (!prev.includes(moduleName)) prev.push(moduleName)
                    return prev
                }, [])
            }],
            type: ['', Yup.string().required('Required'), {
                control: 'select',
                options: [
                    { key: 'Select One...', value: '' },
                    { key: 'Special Standard', value: 'Special' },
                    { key: 'Manufactured', value: 'Manufactured' }, // either internally or externally
                    { key: 'Standard', value: 'Standard' },
                ],
                label: 'Module Type',
                name: 'type',
            }],
            "inv.total": [0, Yup.number().required('Required'), {
                control: 'input',
                type: 'number',
                label: 'Total Inventory',
                name: 'inv.total'
            }],
            // ! Must not be greater than totalInventory
            "inv.qualified": [0, Yup.number().required('Required'), {
                control: 'input',
                type: 'number',
                label: 'Qualified Inventory',
                name: 'inv.qualified'
            }],
            application: [[], Yup.array()/* .nullable() */, {
                control: 'checkbox',
                options: [
                    { key: 'R&D', value: 'R&D' },
                    { key: 'R1', value: 'Regular 1' }, // either internally or externally
                    { key: 'R2', value: 'Regular 2' }
                ],
                label: 'Application',
                name: 'application'
            }],
            specs: [[], Yup.array(), {
                control: 'fieldListPair',
                label: 'Add the Specifications in pairs',
                name: 'specs',
                placeholders: ['Shelf Life', '10 years']
            }],
        },
        submitHandlers: {
            add: addModuleHandler,
            update: updateModuleHandler,
        }
    }


    function getPrevWithNewValues(prevObject = activeModuleData,
        reqKeys = [
            'id',
            'name',
            'inv',
            'application',
            'type',
            'specs',
        ]) {

        // fetch the req. keys from previous Data (activeModuleData)
        // must be empty object in case of empty previous data (empty/undefined keys are not returned)

        const dataFromPrevious = cloneAndPluck(
            prevObject,
            reqKeys
        )
        // convert the specs-object to specs-array to match the format initial values of the form fields
        const { specs: specsObj } = dataFromPrevious
        if (specsObj) {
            dataFromPrevious.specs = Object.entries(specsObj)
        }

        return {
            ...getObjectWithValuesAt(0, formData.fields), // get the default values from the formData object's fields
            ...dataFromPrevious
            // specs: Object.entries(initialValuesReplacement.specs || {})
        }
    }


    // const { specs: specsArr, ...restInitialValues } = getPrevWithNewValues()

    // const initialValues = { ...restInitialValues, specs: Object.fromEntries(specsArr) }
    // console.log('newValidation', getObjectWithValuesAt(1, formData.fields));

    const initialValues = getPrevWithNewValues();

    const validationSchema = Yup.object().shape({
        ...getObjectWithValuesAt(1, formData.fields, (val) => { Yup.object().shape(val) }),
    })



    const onSubmit = (values, { resetForm }) => {
        // ? The values contain the fields that are explicitly fetched. Hence we have no way of passing in the flexible fields...
        isNewSubmission
            ? formData.submitHandlers.add(values)
            : formData.submitHandlers.update(values);
        resetForm();
        modalCloser()
    }
    const currentFormID = `submitForm-module`;

    return (
        <Modal
            title={`${isNewSubmission ? 'Add' : 'Update'} ${formData.title}`}
            handleClose={modalCloser}
            open={isModalOpen}
            submitProps={{
                form: currentFormID
            }}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <FormikForm id={currentFormID}>
                    {
                        renderComponentWithProps(
                            FormikControl,
                            getObjectWithValuesAt(2, formData.fields),
                            ['inv']
                        )
                    }

                </FormikForm>
            </Formik>
        </Modal >
    )
}

function getSubmitBtnText(isValid, dirty, isNewSubmission) {
    return isValid
        ? (
            dirty
                ? `Submit ${isNewSubmission ? '(Add)' : '(Update)'}`
                : 'No edits made'
        )
        : ('Incomplete/Invalid Data')
}