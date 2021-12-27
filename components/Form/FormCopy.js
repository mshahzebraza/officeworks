import React, { useState } from 'react'
import styles from './Form.module.scss'
import { guid, defaultPairMaker, multiFormDataTranslator } from '../../helpers/specific';


import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../Formik/FormikControl'

// Input
/* 
{
      field: curKey.field,
      value: curKey.defaultValue ? curKey.defaultValue : '',
      // defaultValue: '',
      level: 0,
      isFixed: !!curKey.isFixed,
      req: !!curKey.req,
      options: curKey.dataList,
    }
 */

/* 

<FormikControl
  control='input'
  type='text'
  label='Parent Assembly Id'
  name='type'
/>
<FormikControl
  control='input'
  type='text'
  label='Parent Assembly Id'
  name='type'
/>

 */


export default function xForm(props) {


  let initialState = [
    {
      // field: curKey.field,
      field: 'firstName',
      // value: curKey.defaultValue ? curKey.defaultValue : '',
      value: 'Shahzeb',
      // level: 0,
      level: 0,
      // isFixed: !!curKey.isFixed,
      isFixed: true,
      // req: !!curKey.req,
      req: true,

      options: ['Honey, Jimmy'],

    },

  ];

  const xxx = {
    // field: curKey.field,
    field: 'firstName',
    // value: curKey.defaultValue ? curKey.defaultValue : '',
    value: 'Shahzeb',
    // level: 0,
    level: 0,
    // isFixed: !!curKey.isFixed,
    isFixed: true,
    // req: !!curKey.req,
    req: true,

    options: ['Honey, Jimmy'],

  }


  // Override the default state if fields is given as props
  // if (props.fields) {
  //   initialState = defaultPairMaker(props.fields)
  // }
  const [inputPairsData, setInputPairsData] = useState(initialState);


  const handleFieldAdd = (e) => {
    e.preventDefault();
    const tempInputPairsData = [...inputPairsData];
    tempInputPairsData.push({ field: ``, value: `` })
    setInputPairsData(tempInputPairsData)
  }

  const handlerPairDelete = (pairIndex, e) => {
    e.preventDefault();
    const tempInputPairsData = [...inputPairsData];
    tempInputPairsData.splice(pairIndex, 1)
    setInputPairsData(tempInputPairsData)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const result = multiFormDataTranslator(inputPairsData);
    console.log(result);
    // props.submit(result)

  }

  // Changes the values in the 'labelInput' & 'valueInput' and saves it in the state as well.
  const handlePairChange = (inputLabel, pairIndex, evt) => {
    const tempInputPairsData = [...inputPairsData];
    inputLabel === 'field'
      ? tempInputPairsData[pairIndex].field = evt.target.value
      : tempInputPairsData[pairIndex].value = evt.target.value;
    setInputPairsData(tempInputPairsData)
  }


  function onSubmit(values) {
    console.log(values);
  }

  const initialValues = {
    parentAssemblyId: '',
    type: '',
    nomenclature: '',
    id: '',
    qty: '',
    remarks: ''
  }


  const validationSchema = Yup.object({
    parentAssemblyId: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    nomenclature: Yup.string().required('Required'),
    id: Yup.string().required('Required'),
    qty: Yup.number().required('Required'),
    remarks: Yup.string().required('Required')
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form>
            <div
              className={styles.formGroup}
            >
              <FormikControl
                name='parentAssemblyId' // to match the useFormik keys
                value={xxx.field}
                disabled

                // label='Field Input'
                // inputStyles={[styles.formField]}

                control='input'
                type='text'
              />
              <FormikControl
                // inputStyles={[styles.formValue]}
                // label='Value Input'

                // className={styles.formValue}
                // disabled={pair.isFixed}
                // list={`optionList-${pair.field}`}
                // type="text"
                // placeholder={`value-${pairIndex + 1}`}
                // value={pair.value}
                // required={pair.req}
                // onChange={e => handlePairChange('value', pairIndex, e)}

                value={xxx.value} // dependant on pairValue
                required // dependant on pairReq
                // disabled

                control='input'
                type='text'
                name='type'
              />

            </div>




            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>

    </>

  )
}



function DataList({ id, options }) {
  return (<datalist id={id}>
    {options.map((option, optionIndex) => {
      return <option key={`option-${optionIndex}`} value={option}> {option} </option>;
    })}
  </datalist>);
}


/* 
<form

className={styles.form}
onSubmit={handleSubmit} >
{
  inputPairsData.map((pair, pairIndex) => {
    return <div
      key={`pair-${pairIndex + 1}`}
      className={styles.formGroup}
    >

      <input
        className={styles.formField}
        type="text"
        placeholder={`field-${pairIndex + 1}`}
        value={pair.field}
        disabled={pair.req && true}

        onChange={e => handlePairChange('field', pairIndex, e)} />

      <input
        className={styles.formValue}
        disabled={pair.isFixed}
        list={`optionList-${pair.field}`}
        type="text"
        placeholder={`value-${pairIndex + 1}`}
        value={pair.value}
        required={pair.req}
        onChange={e => handlePairChange('value', pairIndex, e)}
      />
      {
        pair.options &&
        <DataList id={`optionList-${pair.field}`} options={pair.options} />
      }

      {
        !pair.req && <button
          type='button'
          className={`${styles.formButton} ${styles.formButton_delete}`}
          onClick={e => handlerPairDelete(pairIndex, e)}
        >
          Delete
        </button>
      }

    </div>
  })
}


<div className={`${styles.formControls}`}>

  <button
    type='submit'
    className={`${styles.formButton} ${styles.formButton_submit}`}
  >
    Submit Data
  </button>


  <button
    type='button'
    className={`${styles.formButton} ${styles.formButton_addPair}`}
    onClick={handleFieldAdd}
  >
    Add Field
  </button>

</div>

</form>

 */