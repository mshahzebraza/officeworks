import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styles from '../formik.module.scss'

function CheckboxGroup(props) {
    const { label, name, options, ...rest } = props
    return (
        <div className={styles.formControl}>

            <label className={styles.formKey} htmlFor={name} > {label} </label>

            <Field name={name} >
                {(renderProps) => {
                    const { field, form, meta } = renderProps
                    return <div className={`${styles.formField} ${styles.formFieldGroup}`} >
                        {
                            options.map(option => {
                                return (
                                    <div key={option.key} className={styles.formFieldGroupItem} >
                                        <input
                                            type='checkbox'
                                            id={option.value}
                                            {...rest} // do not move it below 'value' and 'checked' prop otherwise it will override it
                                            {...field}
                                            className={styles.formFieldGroupItemLabel}
                                            value={option.value}
                                            checked={field.value.includes(option.value)}
                                        />
                                        <label htmlFor={option.value} className={styles.formFieldGroupItemInput} >{option.key}</label>
                                    </div>
                                )
                            })
                        }
                    </div>

                }}
            </Field>

            <ErrorMessage name={name} component='div' className={styles.formError} />

        </div>
    )
}

export default CheckboxGroup;


