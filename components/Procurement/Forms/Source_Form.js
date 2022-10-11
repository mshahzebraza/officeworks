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
import { getOf, getComponentArrayWithProps } from '../../../helpers/specific'
import Grid from '@mui/material/Grid'

export default function Source_Form({
    open: isModalOpen,
    handleClose: modalCloser,
    data: activeSourceData = {},
    sourceType = 'mwo'
}) {
    const isNewSubmission = isObjEmpty(activeSourceData); // data is empty -> new Submission 

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
        ...getOf(formData.fields, 'initialValue'),
        ...initialValuesReplacement
    }

    const validationSchema = Yup.object({
        ...getOf(formData.fields, 'validation'),
    })

    const submitFormHandler = (values, formHelpers) => {
        const { resetForm } = formHelpers
        console.log('submit values: ', values)
        isNewSubmission ? formData.submitHandlers.add(values) : formData.submitHandlers.update(values);
        resetForm()
        modalCloser();
    }
    const currentFormID = `submitForm-source-${sourceType}`;
    /* -------- Render Function -------- */
    return (
        <Modal
            title={`${isNewSubmission ? 'Add' : 'Update'} ${formData.title}`}
            open={isModalOpen}
            handleClose={modalCloser}
            submitProps={{
                form: currentFormID, // to link the form with the submit-button in the Modal-Actions
            }}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitFormHandler}
            >
                <FormikForm id={currentFormID}  >
                    <Grid container spacing={2}>
                        {
                            getComponentArrayWithProps(
                                FormikControl,
                                getOf(formData.fields, "config")
                            )
                        }
                    </Grid>
                </FormikForm>
            </Formik>
        </Modal>

    )
}
// Allow the Dropdown to have the "Closed" option only if submission-mode is "Update"
/**
 * 
 * @param {boolean} isNewSubmission checks the form is ["edit" OR "new"]
 * @param {Object} formData An Object containing the configs(initialValues,validationSchema,props) for each of the fields
 */
function appendCloseOptionToStatusField(isNewSubmission, formData) {
    !isNewSubmission && formData.fields.status.config.options.push({ key: 'Closed', value: 'Closed' })
}

function getPOfieldConfig(isNewSubmission) {
    return {
        title: `Purchase Details`,
        fields: {
            /* fieldName: [initialValue, YUP-validation, controlProps] */
            refType: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
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
                }
            },
            refId: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'text',
                    type: 'text',
                    name: 'refId',
                    disabled: !isNewSubmission,
                    label: 'Data Reference ID'
                }
            },
            category: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
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
                }
            },
            fulfillmentSource: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'select',
                    name: 'fulfillmentSource',
                    label: 'Source of Fulfillment',
                    options: [
                        { label: 'Select One', value: '' },
                        { label: 'Local Purchase', value: 'Local' },
                        { label: 'Foreign Purchase', value: 'Foreign' },
                    ]
                }
            },
            currency: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'select',
                    name: 'currency',
                    label: 'Currency of Payment',
                    options: [
                        { label: 'Select One', value: '' },
                        { label: 'RMB', value: 'RMB' },
                        { label: 'USD', value: 'USD' },
                        { label: 'PKR', value: 'PKR' },
                    ]
                }
            },
            totalCost: {
                initialValue: 0,
                validation: Yup.number().required('Required'),
                config: {
                    control: 'text',
                    type: 'number',
                    name: 'totalCost',
                    label: 'Total Cost',
                    inputProps: {
                        min: 0
                    }
                },
            },
            status: {
                initialValue: '',
                validation: Yup.number().required('Required'),
                config: {
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
                }
            },
            initiatorId: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'text',
                    name: 'initiatorId',
                    label: 'Initiator Employee ID',
                },
            },
            supplier: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'select',
                    name: 'supplier',
                    label: 'Supplier',
                    options: [
                        { label: 'Select One...', value: '' },
                        { label: 'Wuhan', value: 'Wuhan' },
                        { label: 'Chengdu', value: 'Chengdu' },
                        { label: 'E-Tech', value: 'E-Tech' },
                    ]
                }
            },
            items: {
                initialValue: [
                    { id: '', qty: 0, unitPrice: 0, remarks: '' }
                ],
                validation: Yup.array()
                    .of(
                        Yup.object().shape({
                            id: Yup
                                .string()
                                .typeError('Please Enter a valid Code')
                                .required("Item ID is required")
                            ,
                            qty: Yup
                                .number()
                                .integer()
                                .typeError('Please Enter a valid Number')
                                .required("Item Qty is required")
                            ,
                            unitPrice: Yup
                                .number()
                                .integer()
                                .min(0, 'Price cannot be a negative number')
                                .typeError('Please Enter a valid Number')
                                .required("Unit Price is required")
                            ,
                            remarks: Yup.string()
                        })
                    ),
                config: {
                    control: 'nestedFieldArray',
                    legend: 'List of nested fields',
                    name: 'items',
                    label: 'Provide the list of purchase items',
                    showHelper: true,
                    gridSpan: 12,
                    removeText: 'Remove Item',
                    removeIcon: null,
                    addIcon: null,
                    fieldConfigArr: [
                        // id {string}
                        {
                            control: 'text',
                            type: 'text',
                            label: 'Item ID',
                            name: 'id',
                            gridSpan: 5,
                            default: '', //! default value to for the nested field
                            showHelper: false,
                            customHelperText: 'Enter the Item ID',
                        },
                        // qty {number}
                        {
                            control: 'text',
                            type: 'number',
                            label: 'Item Qty',
                            name: 'qty',
                            gridSpan: 3,
                            default: 0, //! default value to for the nested field
                            showHelper: false,
                            customHelperText: 'Enter the Item Qty',
                        },
                        // unitPrice {number}
                        {
                            control: 'text',
                            type: 'number',
                            gridSpan: 2,
                            label: 'Unit Price',
                            name: 'unitPrice',
                            default: 0, //! default value to for the nested field
                            showHelper: false,
                            customHelperText: 'Enter the Unit Price',
                        },
                        // remarks {string}
                        {
                            control: 'text',
                            type: 'text',
                            multiline: true,
                            gridSpan: 10,
                            label: 'Item Purchase Remarks',
                            name: 'remarks',
                            default: '', //! default value to for the nested field
                            showHelper: false,
                            customHelperText: 'Enter the detail Item Purchase',
                        },
                    ],
                }
            },
            remarks: {
                initialValue: '',
                validation: Yup.string(),
                config: {
                    control: 'text',
                    gridSpan: 12,
                    multiline: true,
                    minRows: 4,
                    name: 'remarks',
                    label: 'Remarks/Description'
                }
            },
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
            mwoId: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'text',
                    type: 'text',
                    name: 'mwoId',
                    label: 'MWO ID',
                    disabled: !isNewSubmission
                }
            },
            status: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'select',
                    name: 'status',
                    label: 'Status',
                    options: [
                        { label: 'Select One ...', value: '' },
                        { label: 'Not Started', value: 'Not Started' },
                        { label: 'Active', value: 'Active' },
                        { label: 'Delivered', value: 'Delivered' },
                    ]
                }
            },
            title: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'text',
                    type: 'text',
                    name: 'title',
                    label: 'Title / Description'
                }
            },
            remarks: {
                initialValue: '',
                validation: Yup.string(),
                config: {
                    control: 'text',
                    gridSpan: 12,
                    multiline: true,
                    minRows: 4,
                    name: 'remarks',
                    label: 'Remarks/Description'
                }
            },
        },
        submitHandlers: {
            add: addMWOHandler,
            update: updateMWOHandler
        }
    }
}


