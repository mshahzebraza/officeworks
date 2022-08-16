import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styles from '../formik.module.scss'

function RadioButtons(props) { // ! Old Functionality
    const { label, name, options, ...rest } = props
    return (
        <div className={styles.formControl}>

            <label className={styles.formKey} > {label} </label>

            <Field name={name} >
                {({ field }) => {

                    return <div className={`${styles.formField} ${styles.formFieldGroup}`} >
                        {
                            options.map(option => {
                                return (
                                    <div key={option.key} className={styles.formFieldGroupItem} >
                                        <input
                                            type='radio'
                                            id={option.value}
                                            {...field}
                                            {...rest} // do not move it below 'value' and 'checked' prop otherwise it will override it
                                            className={styles.formFieldGroupItemLabel}
                                            value={option.value}
                                            checked={field.value === option.value}
                                        />
                                        <label htmlFor={option.value} className={styles.formFieldGroupItemInput} >{option.key}</label>
                                    </div>
                                )
                            })
                        }
                    </div>

                }}
            </Field>

            <ErrorMessage component='div' name={name} className={styles.formError} />

        </div>
    )
}

export default RadioButtons
