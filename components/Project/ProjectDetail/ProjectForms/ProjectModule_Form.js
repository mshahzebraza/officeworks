// Dependency
import React from 'react'
// import { useDispatch } from 'react-redux'

import { Formik } from 'formik'
import * as Yup from 'yup'

// Store & Styles
import { projectActions } from '../../../../store/project/project-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
import FormikControl from '../../../Formik/FormikControl'
import FormikForm from '../../../Formik/FormikForm'
import { isObjEmpty } from '../../../../helpers/reusable'
import { addProjModHandler, updateProjModHandler } from '../../../../lib/apollo_client/projectApollo'
import { getOf, renderComponentWithProps } from '../../../../helpers/specific'

export default function ProjectModule_Form({ open: isModalOpen, handleClose: modalCloser, projectState = [], oldModuleData = {}, assemblies = [] }) {
    const [projectCatName, projectId] = projectState

    const isNewSubmission = isObjEmpty(oldModuleData);

    const assemblyDropdownOptions = [
        { key: 'Select an option', value: '' },
        ...assemblyOptionsList
    ]

    const partTypeOptions = [
        { key: 'Select One ...', value: '' },
        { key: 'Standard', value: 'std' },
        { key: 'Standard - Special', value: 'specStd' },
        { key: 'Manufactured', value: 'mfg' },
    ]

    const formData = {
        title: 'Project Module',
        fields: getProjectModuleFieldConfig(isNewSubmission, assemblyDropdownOptions, partTypeOptions)
    }

    // Initial Values
    const initialValues = {
        ...getOf(formData.fields, 'initialValue'),
        ...oldModuleData
    }

    // Validation Schema
    const validationSchema = Yup.object({
        ...getOf(formData.fields, 'validation')
    })

    // Options (Radio,Checkboxes,Dropdown) 

    const assemblyOptionsList = assemblies.map(
        (assemblyObj) => {
            return { key: `${assemblyObj.nomenclature}`, value: `${assemblyObj.id}` }
        }
    )

    // On Submit
    const onSubmit = (values, { resetForm }) => {
        isNewSubmission
            ? addProjModHandler([projectCatName, projectId, values])
            : updateProjModHandler([projectCatName, projectId, values]);
        resetForm();
        modalCloser()
    }

    const currentFormID = `submitForm-projectModule`;


    return (
        <Modal
            title={`${isNewSubmission ? 'Add' : 'Update'} Project Module`}
            open={isModalOpen}
            handleClose={modalCloser}
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
        </Modal >
    )
}


function getProjectModuleFieldConfig(isNewSubmission, assemblyDropdownOptions, partTypeOptions) {
    return ({
        parentAssemblyId: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                label: 'Parent Assembly Id',
                name: 'parentAssemblyId',
                control: 'select',
                options: assemblyDropdownOptions
            },
        },
        type: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                label: 'Part Type',
                name: 'type',
                control: 'select',
                options: partTypeOptions,
            },
        },
        nomenclature: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                label: 'Nomenclature',
                name: 'nomenclature',
                control: 'input',
                type: 'text'
            },
        },
        id: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                label: 'Part ID',
                name: 'id',// needs prefixed project ID
                control: 'input',
                type: 'text',
                disabled: !isNewSubmission
            }
        },
        qty: {
            initialValue: '',
            validation: Yup.number().required('Required'),
            config: {
                control: 'input',
                type: 'number',
                label: 'Qty / Assembly',
                name: 'qty'
            },
        },
        remarks: {
            initialValue: '',
            validation: Yup.string(),
            config: {
                control: 'textarea',
                type: 'text',
                label: 'Part Description',
                placeholder: 'The Part has a very good surface finish',
                name: 'remarks'
            },
        },
    })
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
