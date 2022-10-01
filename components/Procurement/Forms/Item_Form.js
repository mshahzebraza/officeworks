// Dependency
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles
import moduleApollo, { addMWOmoduleHandler, addPOmoduleHandler, updateMWOmoduleHandler, updatePOmoduleHandler } from '../../../lib/apollo_client/moduleApollo'

// Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'
import FormikForm from '../../Formik/FormikForm'
import FormikControl from '../../Formik/FormikControl'
import FormikSubmit from '../../Formik/FormikSubmit'
import { isObjEmpty, cloneAndPluck, request } from '../../../helpers/reusable'
import { getOf, renderComponentWithProps } from '../../../helpers/specific'
import { Grid } from '@mui/material'


export default function Item_Form({ open, closer: modalCloser, activeSourceId, data: activeItemData = {}, sourceType = 'po' }) {

    const moduleState = moduleApollo();
    const moduleStateList = [...moduleState.list]
    const isNewSubmission = isObjEmpty(activeItemData); // is item a non-empty object

    const formData = (sourceType === 'po')
        ? getPOitemFieldConfig(moduleStateList, isNewSubmission)
        : getMWOitemFieldConfig(moduleStateList, isNewSubmission)

    // TODO: Here the other specs like application etc. must be concatenated with the values
    // TODO : OR fine tune the handler function
    const initialValuesReplacement = cloneAndPluck(
        activeItemData, // empty
        Object.keys(formData.fields)
    )

    const initialValues = {
        ...getOf(formData.fields, 'initialValue'),
        ...initialValuesReplacement
    }

    const validationSchema = Yup.object({
        ...getOf(formData.fields, 'validation'),
    })

    const onSubmit = (values, { resetForm }) => {
        // ? The values contain the fields that are explicitly fetched. Hence we have no way of passing in the flexible fields...
        isNewSubmission
            ? formData.submitHandlers.add([activeSourceId, values])
            : formData.submitHandlers.update([activeSourceId, values]);
        resetForm();
        modalCloser()
    }

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {

                (formik) => {
                    const { dirty, isValid, isSubmitting } = formik

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
                            <FormikForm
                            // multiStage
                            >
                                <Grid container spacing={2}>
                                    {
                                        renderComponentWithProps(FormikControl,
                                            getOf(formData.fields, 'options'),
                                        )
                                    }
                                </Grid>

                            </FormikForm>
                        </Modal>
                    )

                }}
        </Formik>
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
function getMWOitemFieldConfig(moduleStateList, isNewSubmission) {
    return {
        title: 'MWO Item',
        fields: {
            id: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                options: {
                    control: 'combobox',
                    gridSize: 12,
                    options: /* getModuleOptions(moduleStateList) */ moduleStateList,
                    groupBy: 'type',
                    focalValue: 'id',
                    getOptionDisplay: (option) => `${option.id} | ${option.name}`,
                    label: 'Item ID',
                    name: 'id',
                    disabled: !isNewSubmission,
                }
            },
            qty: {
                initialValue: '',
                validation: Yup.number().required('Required'),
                options: {
                    control: 'input',
                    type: 'number',
                    label: 'Order Quantity',
                    name: 'qty'
                }
            },
            remarks: {
                initialValue: '',
                validation: Yup.string(),
                options: {
                    control: 'input',
                    gridSize: 12,
                    type: 'text',
                    label: 'Remarks / Description',
                    name: 'remarks'
                }
            },
        },
        submitHandlers: {
            add: addMWOmoduleHandler,
            update: updateMWOmoduleHandler,
        }
    }
}

function getPOitemFieldConfig(moduleStateList, isNewSubmission) {
    return {
        title: 'PO Item',
        fields: {
            id: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                options: {
                    control: 'combobox',
                    gridSize: 12,
                    options: /* getModuleOptions(moduleStateList) */ moduleStateList,
                    groupBy: 'type',
                    focalValue: 'id',
                    getOptionDisplay: (option) => `${option.id} | ${option.name}`,
                    label: 'Item ID',
                    name: 'id',
                    disabled: !isNewSubmission,
                }
            },
            qty: {
                initialValue: '',
                validation: Yup.number().required('Required'),
                options: {
                    control: 'input',
                    type: 'number',
                    label: 'Purchase Quantity',
                    name: 'qty'
                }
            },
            unitPrice: {
                initialValue: '',
                validation: Yup.number().required('Required'),
                options: {
                    control: 'input',
                    type: 'number',
                    label: 'Unit Price',
                    name: 'unitPrice'
                }
            },
            remarks: {
                initialValue: '',
                validation: Yup.string(),
                options: {
                    gridSize: 12,
                    control: 'textarea',
                    label: 'Remarks / Description',
                    name: 'remarks'
                }
            },
        },
        submitHandlers: {
            add: addPOmoduleHandler,
            update: updatePOmoduleHandler,
        }
    }
}

function getModuleOptions(moduleStateList) {
    return moduleStateList.map(
        (module) => {
            const { name, id } = module;
            console.log(module)
            return { name, id };
        })
}

