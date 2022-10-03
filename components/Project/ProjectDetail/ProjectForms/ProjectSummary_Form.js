// Dependency
import React from 'react'
// import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles
import { projectActions } from '../../../../store/project/project-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
// import Form from '../../../Form/Form'
import FormikForm from '../../../Formik/FormikForm'
import FormikControl from '../../../Formik/FormikControl'
import { isObjEmpty } from '../../../../helpers/reusable'
import { addProjectSummaryHandler, updateProjectSummaryHandler } from '../../../../lib/apollo_client/projectApollo'
import { getOf, renderComponentWithProps } from '../../../../helpers/specific'


// showUpdateModal, setShowUpdateModal, dispatch, data
export default function ProjectSummary_Form({ open: isModalOpen, handleClose: modalCloser, activeSummaryData: oldSummaryData = {} }) {

    // const dispatch = useDispatch();

    const isNewSubmission = isObjEmpty(oldSummaryData);

    const formData = {
        title: 'Project Summary',
        fields: getProjectSummaryFieldConfig(isNewSubmission)
    }

    // Initial Values
    const initialValues = {
        ...getOf(formData.fields, 'initialValue'),
        ...oldSummaryData
    }

    // Validation Schema
    const validationSchema = Yup.object({
        ...getOf(formData.fields, 'validation'),
    })

    const onSubmit = (values, { resetForm }) => {
        isNewSubmission
            ? addProjectSummaryHandler(values)
            : updateProjectSummaryHandler(values);
        resetForm();
        modalCloser()
    }
    const currentFormID = `submitForm-projectSummary`;

    return (

        <Modal
            title={`${isNewSubmission ? 'Add' : 'Update'} Project Summary`}
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
                <FormikForm id={currentFormID} >
                    {
                        renderComponentWithProps(FormikControl, getOf(formData.fields, 'config'))
                    }
                </FormikForm>
            </Formik>
        </Modal>
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


function getProjectSummaryFieldConfig(isNewSubmission) {

    return {
        type: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                label: 'Type',
                name: 'type',
                control: 'select',
                options: [
                    { key: 'Select an option', value: '' },
                    { key: 'EM-Linear', value: 'EM-Linear' },
                    { key: 'EM-Rotary', value: 'EM-Rotary' }
                ]
            }
        },
        nomenclature: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                label: 'Nomenclature',
                name: 'nomenclature',
                control: 'input',
                type: 'text',
                disabled: !isNewSubmission

            }
        },
        application: {
            initialValue: [],
            validation: Yup.array().nullable(), //.min('Select at least one 
            config: {
                label: 'Application',
                name: 'application',
                control: 'checkbox',
                options: [
                    { key: 'R&D', value: 'R&D' },
                    { key: 'BWS', value: 'BWS' },
                    { key: 'HWS', value: 'HWS' }
                ]
            }
        },
        status: {
            initialValue: '',
            validation: Yup.string()/* .required('Required') */,
            config: {
                label: 'status',
                name: 'status',
                control: 'select',
                options: [
                    { key: 'Select One ...', value: '' },
                    { key: 'R&D', value: 'R&D' },
                    { key: 'Production', value: 'Production' },
                    { key: 'Closed', value: 'Closed' }
                ]
            }
        },
        stock: {
            initialValue: '',
            validation: Yup.number()/* .required('Required') */,
            config: {
                label: 'stock',
                name: 'stock',
                control: 'input',
                type: 'number'
            }
        },
        target: {
            initialValue: '',
            validation: Yup.number()/* .required('Required') */,
            config: {
                label: 'target',
                name: 'target',
                control: 'input',
                type: 'number'
            }
        },
    }
}