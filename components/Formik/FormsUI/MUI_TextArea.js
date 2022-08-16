import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styles from '../formik.module.scss'
import TextField from '@mui/material/TextField'

function MUI_TextArea(props) {
     const { label, name, ...rest } = props

     return (

          <div /* className={styles.formControl} */>

               <Field
                    name={name}
               >
                    {
                         ({ field, form, meta }) => {
                              return (
                                   <TextField
                                        id={name}
                                        label={name.toUpperCase()}
                                        name={name}
                                        size="small"
                                        multiline
                                        aria-multiline
                                        fullWidth
                                        error={!!meta.touched && !!meta.error}
                                        helperText={!!meta.touched && meta.error}
                                        // inputProps={rest}
                                        {...rest} // type attribute
                                        {...field}
                                   />

                              )
                         }
                    }
               </Field>


          </div>
     )
}

export default MUI_TextArea
