// Dependency
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles

// Components
import Modal from '../../UI/Modal'
import FormikControl from '../../Formik/FormikControl'
import FormikForm from '../../Formik/FormikForm'
import { deepClone, isObjEmpty } from '../../../helpers/reusable'
import moduleApollo, { updateModuleSpecHandler } from '../../../lib/apollo_client/moduleApollo'
import { getOf, getComponentArrayWithProps, sourceSpecificKeys } from '../../../helpers/specific'


export default function ItemSpecs_Form({ open: isModalOpen, handleClose: modalCloser, data: activeModuleSpecs = {} }) {

    const moduleStateList = [...moduleApollo().list];

    // Clone the previously added data
    activeModuleSpecs = deepClone(activeModuleSpecs) // the deletion was moving up in the state to parent components
    const isNewSubmission = isObjEmpty(activeModuleSpecs);

    { //? Delete unnecessary keys
        delete activeModuleSpecs._id
        for (const key in activeModuleSpecs) {
            if (sourceSpecificKeys().includes(key)) delete activeModuleSpecs[key]
        }
    }

    const formData = {
        title: 'Item Specifications',
        fields: getItemSpecsFieldConfig(isNewSubmission, moduleStateList)
    }

    const { id, name, type, application, specs = {}, ...otherSpecs } = activeModuleSpecs;
    Object.entries(otherSpecs).length && console.error('Manual: No other fields must be present in the object', otherSpecs)

    // Keys of required fields from the data.
    const initialValuesReplacement = {
        id, name, type, application,
        specifications: Object.entries(specs)
    }
    // fetching the data according to the keys of the initialValuesReplacement
    const initialValues = {
        ...getOf(formData.fields, 'initialValue'),
        ...initialValuesReplacement
    }

    const validationSchema = Yup.object().shape({
        ...getOf(formData.fields, 'validation'),
    })

    const onSubmit = (values, { resetForm }) => {
        const { specifications, ...mainSpecFields } = values;
        // transforming the "specifications" fields array into an object
        const specificationsObject = Object.fromEntries(specifications)
        // append the remaining mainSpecFields to valuesObject
        const completeSpecs = { specs: specificationsObject, ...mainSpecFields }

        updateModuleSpecHandler([completeSpecs])
        resetForm();
        modalCloser()
    }

    const currentFormID = `submitForm-itemSpecs-${sourceType}`;

    return (
        <Modal
            title={`${isNewSubmission ? 'Add' : 'Update'} ${formData.title}`}
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
                        getComponentArrayWithProps(
                            FormikControl,
                            getOf(formData.fields, 'config')
                        )
                    }

                </FormikForm>
            </Formik>
        </Modal>
    )
}

function getItemSpecsFieldConfig(isNewSubmission, moduleStateList) {
    return {
        id: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                control: 'input',
                type: 'text',
                label: 'Item Id',
                name: 'id',
                disabled: !isNewSubmission
            },
        },
        name: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                control: 'input',
                type: 'text',
                label: 'Item Name',
                name: 'name',
                datalist: [
                    ...moduleStateList.map(module => {
                        return module.name
                    })
                ]
            }
        },
        type: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                control: 'select',
                label: 'Item Type',
                name: 'type',
                options: [
                    { key: 'Select One...', value: '' },
                    { key: 'Special Standard', value: 'Special' },
                    { key: 'Standard', value: 'Standard' },
                    { key: 'Manufactured', value: 'Manufactured' }, // either internally or externally
                ]
            }
        },
        application: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                control: 'select',
                name: 'application',
                label: 'Application / Use',
                options: [
                    { key: 'Select One ...', value: '' },
                    { key: 'Make most of the list dynamically load from projects - or even better, get this data from the project directory automatically and remove the field from here altogether', value: 'Dynamic' },
                    { key: '3K', value: 'PEMA-L3K-BD' },
                    { key: 'Lab Use', value: 'LU' },
                    { key: 'R&D', value: 'R&D' },
                    { key: 'Miscellaneous', value: 'MISC' },
                ]
            }
        },
        specifications: {
            initialValue: [],
            validation: Yup.array(),
            config: {
                control: 'fieldListPair',
                label: 'Add the Specifications in pairs',
                name: 'specifications',
                placeholders: ['Shelf Life', '10 years']
            }
        },
    }
}

