

// Dependency
import React from 'react'
// import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'


// Store
import { addPO_Thunk, poActions } from '../../store/po/po-slice'

// Styles

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
// import Form from '../Form/Form'
import FormikControl from '../Formik/FormikControl'
import FormikForm from '../Formik/FormikForm'
import { getIDseries, isObjEmpty } from '../../helpers/reusable'
import { addTxnHandler } from '../../lib/apollo_client/transactionApollo'
import { getOf, renderComponentWithProps } from '../../helpers/specific'

function Transaction_Form({ open: isModalOpen, handleClose: modalCloser, oldTxnData = {} }) {

    // const dispatch = useDispatch()
    const isNewSubmission = isObjEmpty(oldTxnData);


    const formData = {
        title: 'Transaction',
        fields: getTransactionFieldConfig(isNewSubmission)
    }

    const initialValues = {
        ...getOf(formData.fields, 'initialValue'),
        // tid: '',
        // qty: 0,
        // date: '',
        // initiator: '',
        ...oldTxnData
    }

    const validationSchema = Yup.object({
        ...getOf(formData.fields, 'validation')
        // tid: Yup.string().required('Required'),
        // partIDs: Yup/* .string() */.required('Required'),

        // qty: Yup.number().required('Required'),
        // date: Yup.string().required('Required'),
        // initiator: Yup.string().required('Required'),
    })

    const onSubmit = (values, { resetForm }) => {

        const response = !values.partIDs.includes('-[') && prompt('No separator (-) before brackets. Press "Cancel" to stop?')
        if (response === null) return


        values.partIDs = getIDseries(values.partIDs)
        values.date = Date.now();
        console.log(`values: `, values)
        addTxnHandler(values)
        resetForm()
        modalCloser()
    };

    const currentFormID = `submitForm-transaction`;

    return <>
        <Modal
            title={`${isNewSubmission ? 'Add' : 'Update'} Transaction Details`}
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
        </Modal>


    </>;
}

export default Transaction_Form;



function getTransactionFieldConfig() {
    return ({
        // tid: Yup.string().required('Required'),
        // partIDs: Yup/* .string() */.required('Required'),

        // qty: Yup.number().required('Required'),
        // date: Yup.string().required('Required'),
        // initiator: Yup.string().required('Required'),
        id: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                control: 'select',
                name: 'txnType',
                label: 'Transaction Type',
                options: [
                    { key: 'Select One...', value: '' },
                    { key: 'Deposit', value: 'deposit' },
                    { key: 'Withdrawal', value: 'withdrawal' },
                ]
            },
        },
        txnType: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                control: 'select',
                name: 'txnType',
                label: 'Transaction Type',
                options: [
                    { key: 'Select One...', value: '' },
                    { key: 'Deposit', value: 'deposit' },
                    { key: 'Withdrawal', value: 'withdrawal' },
                ]
            }
        },
        productNomenclature: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                control: 'select',
                name: 'productNomenclature',
                label: 'Product Name',
                options: [
                    { key: 'Select One...', value: '' },
                    { key: 'Sliding Bearing', value: 's' },
                    { key: 'Ball Lead Screw', value: 'Ball Lead Screw' },
                ]
            },
        },
        productId: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                control: 'select',
                name: 'productId',
                label: 'Product ID',
                options: [
                    { key: 'Select One...', value: '' },
                    { key: 'NRS BF 220x2 1502', value: 'NRS BF 220x2 1502' },
                    { key: 'NRS BF 220x4 1502', value: 'NRS BF 220x4 1502' },
                ]
            },
        },
        partIDs: {
            initialValue: '',
            validation: Yup.mixed().required('Required'),
            config: {
                control: 'input',
                type: 'text',
                name: 'partIDs',
                // disabled:!isNewSubmission,
                label: 'Part IDs',
            },
        },
        intent: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                control: 'input',
                type: 'text',
                name: 'intent',
                label: 'Motive/Intent of Transaction',
                placeholder: 'E.g Rectification of sample'
            },
        },
        party: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                control: 'input',
                type: 'text',
                name: 'party',
                label: 'Deposited/Withdrawn by',
                placeholder: 'E.g User 102331'
            },
        },
        remarks: {
            initialValue: '',
            validation: Yup.string(),
            config: {
                control: 'textarea',
                type: 'text',
                name: 'remarks',
                label: 'Remarks/Details',
                placeholder: 'Auto generated'
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