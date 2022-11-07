// Dependency & Helpers
import React from 'react'
import * as Yup from 'yup'
import { isObjEmpty } from '../../../../helpers/reusable'
import { Formik } from 'formik'
import { cloneAndPluck } from '../../../../helpers/refactored/cloneAndPluck'

// UI Components
import Modal from '../../../components/UI/Modal'

// Major Components
import FormikControl from '../../../components/Formik/FormikControl'
import FormikForm from '../../../components/Formik/FormikForm'
import { getOf, getComponentArrayWithProps } from '../../../../helpers/specific'
import Grid from '@mui/material/Grid'
import { getPOfieldConfig } from './getPOfieldConfig'
import { getMWOfieldConfig } from './getMWOfieldConfig'
import { appendCloseOptionToStatusField } from './appendCloseOptionToStatusField'

export default function ProcForm({
    open: isModalOpen,
    handleClose: modalCloser,
    data: activeSourceData = {},
    sourceType = 'mwo'
}) {
    if (!isModalOpen) return null;
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
            handleClose={modalCloser}
            submitProps={{
                form: currentFormID, // links the "form-element" with the "submit-button" in the Modal-Actions
            }}
        // contentProps={{ styles: { height: 700 } }}
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

