// Dependency & Helpers
import React from 'react'
import * as Yup from 'yup'
import { cloneAndPluck, isObjEmpty } from '../../../helpers/reusable'
import { Formik } from 'formik'

// Store
import { addPOHandler, updatePOHandler } from '../../../lib/apollo_client/poApollo'
import { addMWOHandler, updateMWOHandler } from '../../../lib/apollo_client/mwoApollo'

// Styles

// UI Components
import Modal from '../../UI/Modal'

// Major Components
import FormikControl from '../../Formik/FormikControl'
import FormikForm from '../../Formik/FormikForm'
import { getObjectWithValuesAt, renderComponentWithProps } from '../../../helpers/specific'
import Grid from '@mui/material/Grid'

export default function Source_Form({ closer: modalCloser, data: activeSourceData = {}, sourceType = 'mwo', open }) {

    const isNewSubmission = isObjEmpty(activeSourceData);

    const formData = (sourceType === 'po')
        ? getPOfieldConfig(isNewSubmission)
        : getMWOfieldConfig(isNewSubmission)
    appendCloseOptionToStatusField(isNewSubmission, formData)

    // if submission-mode: "UPDATE", replace the initial values with already present data 
    const initialValuesReplacement = cloneAndPluck(
        activeSourceData,
        // TODO: Isn't it better to remove the keys we don't need rather than pluck all the needed keys
        Object.keys(formData.fields)
    )

    /* -------- Formik Dependencies -------- */
    const initialValues = {
        ...getObjectWithValuesAt(0, formData.fields),
        ...initialValuesReplacement
    }
    const validationSchema = Yup.object({
        ...getObjectWithValuesAt(1, formData.fields),
    })
    const onSubmit = (values, { resetForm }) => {
        console.log('values: ', values)
        isNewSubmission ? formData.submitHandlers.add(values) : formData.submitHandlers.update(values);
        resetForm()
        modalCloser();
    }

    /* -------- Render Function -------- */
    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isValid, dirty, isSubmitting }) => {
                // 1. Make the form multistage
                // 2. Make the Don't go to send stage before confirming the status of refId entered.
                return (
                    <Modal
                        title={`${isNewSubmission ? 'Add' : 'Update'} ${formData.title}`}
                        closer={modalCloser}
                        handleClose={modalCloser}
                        open={open}
                        submitProps={{
                            disabled: !isValid || !dirty || isSubmitting,
                            text: getSubmitBtnText(isValid, dirty, isNewSubmission)
                        }}
                    >
                        <FormikForm>
                            <Grid container spacing={2}>
                                {/* Render Form Inputs */}
                                {
                                    renderComponentWithProps(
                                        FormikControl,
                                        getObjectWithValuesAt(2, formData.fields)
                                    )
                                }
                            </Grid>
                        </FormikForm>
                    </Modal>

                )
            }
            }

        </Formik>
    )
}
// Allow the Dropdown to have the "Closed" option only if submission-mode is "Update"
/**
 * 
 * @param {boolean} isNewSubmission checks the form is ["edit" OR "new"]
 * @param {Object} formData An Object containing the configs(initialValues,validationSchema,props) for each of the fields
 */
function appendCloseOptionToStatusField(isNewSubmission, formData) {
    !isNewSubmission && formData.fields.status[2].options.push({ key: 'Closed', value: 'Closed' })
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

function getPOfieldConfig(isNewSubmission) {
    return {
        title: `Purchase Details`,
        fields: {
            /* fieldName: [initialValue, YUP-validation, controlProps] */
            refType: ['', Yup.string().required('Required'), {
                control: 'select',
                name: 'refType',
                label: 'Data Reference',
                options: [
                    { label: 'Select One...', value: '' },
                    { label: 'CST', value: 'CST' },
                    { label: 'Bill', value: 'Bill' },
                    { label: 'PO', value: 'PO' },
                    { label: 'Requisition', value: 'REQ' },
                ]
            }],
            refId: ['', Yup.string().required('Required'), {
                control: 'input',
                type: 'text',
                name: 'refId',
                disabled: !isNewSubmission,
                label: 'Data Reference ID'
            }],
            category: ['', Yup.string().required('Required'), {
                control: 'select',
                name: 'category',
                label: 'PO Category',
                options: [
                    { label: 'Select One ...', value: '' },
                    { label: 'Limited Tender', value: 'Limited Tender' },
                    { label: 'Single Quotation', value: 'Single Quotation' },
                    { label: 'Repeat Order', value: 'Repeat Order' },
                    { label: 'Spot Purchase', value: 'Spot Purchase' },
                    { label: 'Imprest', value: 'Imprest' },
                ]
            }],
            fulfillmentSource: ['', Yup.string().required('Required'), {
                control: 'select',
                name: 'fulfillmentSource',
                label: 'Source of Fulfillment',
                options: [
                    { label: 'Select One', value: '' },
                    { label: 'Local Purchase', value: 'Local' },
                    { label: 'Foreign Purchase', value: 'Foreign' },
                ]
            }],
            currency: ['', Yup.string().required('Required'), {
                control: 'select',
                name: 'currency',
                label: 'Currency of Payment',
                options: [
                    { label: 'Select One', value: '' },
                    { label: 'RMB', value: 'RMB' },
                    { label: 'USD', value: 'USD' },
                    { label: 'PKR', value: 'PKR' },
                ]
            }],
            totalCost: [0, Yup.number().required('Required'), {
                control: 'input',
                type: 'number',
                name: 'totalCost',
                label: 'Total Cost',
            }],
            status: ['', Yup.number().required('Required'), {
                control: 'select',
                name: 'status',
                label: 'Current Status',
                options: [
                    { label: 'Select One ...', value: null },
                    { label: 'Rejected', value: 0 },
                    { label: 'Draft', value: 1 },
                    { label: 'Initiated', value: 2 },
                    { label: 'ERP Approved', value: 3 },
                    { label: 'Supplier Evaluated', value: 4 },
                    { label: 'Concurrence Approved', value: 5 },
                    { label: 'PO Approved', value: 6 },
                    { label: 'LC Opened', value: 7 },
                    { label: 'Delivery Confirmed', value: 8 },
                    { label: 'Closed', value: 9 },
                ],
            }],
            supplier: ['', Yup.string().required('Required'), {
                control: 'select',
                name: 'supplier',
                label: 'Supplier',
                options: [
                    { label: 'Select One...', value: '' },
                    { label: 'Wuhan', value: 'Wuhan' },
                    { label: 'Chengdu', value: 'Chengdu' },
                    { label: 'E-Tech', value: 'E-Tech' },
                ]
            }],
            remarks: ['', Yup.string(), {
                control: 'textarea',
                gridSize: 12,
                name: 'remarks',
                label: 'Remarks/Description'
            }],
        },
        submitHandlers: {
            add: addPOHandler,
            update: updatePOHandler
        }
    }
}
function getMWOfieldConfig(isNewSubmission) {
    return {
        title: `Work Order Details`,
        fields: {
            /* fieldName: [initialValue, YUP-validation, controlProps] */
            mwoId: ['', Yup.string().required('Required'), {
                control: 'input',
                type: 'text',
                name: 'mwoId',
                label: 'MWO ID',
                disabled: !isNewSubmission
            }],
            status: ['', Yup.string().required('Required'), {
                control: 'select',
                name: 'status',
                label: 'Status',
                options: [
                    { label: 'Select One ...', value: '' },
                    { label: 'Not Started', value: 'Not Started' },
                    { label: 'Active', value: 'Active' },
                    { label: 'Delivered', value: 'Delivered' },
                ]
            }],
            title: ['', Yup.string().required('Required'), {
                control: 'input',
                type: 'text',
                name: 'title',
                label: 'Title / Description'
            }],
            remarks: ['', Yup.string(), {
                control: 'textarea',
                gridSize: 12,
                name: 'remarks',
                label: 'Remarks/Description'
            }],
        },
        submitHandlers: {
            add: addMWOHandler,
            update: updateMWOHandler
        }
    }
}


