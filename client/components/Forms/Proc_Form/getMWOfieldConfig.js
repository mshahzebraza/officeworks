import * as Yup from 'yup';
import { createMWO } from '../../../handlers/mwo/create';
import { updateMWO } from '../../../handlers/mwo/update';

export function getMWOfieldConfig(isNewSubmission) {
    return {
        title: `Work Order Details`,
        fields: {
            mwoType: {
                initialValue: '',
                validation: Yup.string().required('Required'),
                config: {
                    control: 'select',
                    name: 'mwoType',
                    label: 'MWO Type',
                    options: [
                        { label: 'Select One ...', value: '' },
                        { label: 'Mfg WO', value: 'mwo' },
                        { label: 'Rework WO', value: 'rwo' },
                        { label: 'Rework TSR', value: 'tsr' },
                        { label: 'Metrology', value: 'mmqc' },
                        { label: 'Hardness', value: 'mss' },
                        { label: 'Material', value: 'mss' },
                        { label: 'Surface Treatment', value: 'mss' },
                    ]
                }
            },
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
                        { label: 'Not Started', value: 0 },
                        { label: 'Active', value: 1 },
                        { label: 'Delivered', value: 2 },
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
            initiatorId: {
                initialValue: '',
                validation: Yup.number().required('Required'),
                config: {
                    control: 'text',
                    name: 'initiatorId',
                    label: 'Initiator Employee ID',
                },
            },
            items: {
                initialValue: [
                    { id: '', qty: 0, remarks: '' }
                ],
                validation: Yup.array()
                    .of(
                        Yup.object().shape({
                            id: Yup
                                .string()
                                .typeError('Please Enter a valid Code')
                                .required("Item ID is required"),

                            qty: Yup
                                .number()
                                .not([0], 'Quantity cannot be 0')
                                .min(0, 'Quantity must be positive')
                                .integer()
                                .typeError('Please Enter a valid Number')
                                .required("Item Qty is required"),

                            remarks: Yup.string()
                        })
                    ),
                config: {
                    control: 'nestedFieldArray',
                    legend: 'List of nested fields',
                    name: 'items',
                    label: 'Provide the list of Manufacture items',
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
                            gridSpan: 6,
                            default: '',
                            showHelper: false,
                            customHelperText: 'Enter the Item ID',
                        },
                        // qty {number}
                        {
                            control: 'text',
                            type: 'number',
                            label: 'Item Qty',
                            name: 'qty',
                            gridSpan: 4,
                            default: 0,
                            showHelper: false,
                            customHelperText: 'Enter the Item Qty',
                            inputProps: {
                                min: 0
                            }
                        },
                        // remarks {string}
                        {
                            control: 'text',
                            type: 'text',
                            multiline: true,
                            gridSpan: 10,
                            label: 'Item Purchase Remarks',
                            name: 'remarks',
                            default: '',
                            showHelper: false,
                            customHelperText: 'Enter the detail of Item Manufacturing',
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
            add: createMWO,
            update: updateMWO
        }
    };
}
