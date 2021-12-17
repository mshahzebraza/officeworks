import React, { useState } from 'react'
import styles from './Form.module.scss'
import { guid, defaultPairMaker, multiFormDataTranslator } from '../../helpers/specific';





export default function Form(props) {

  // SUBMIT Function fetches the following data from form-inputs and converts it into POitem object to store it in state.
  /* 
    {
      field, // decides the 'key-name' of POitem-object
      value, // decides the 'value' of POitem-object
      
      // REST OF THE KEYS BELOW ARE NOT IMPORTANT
      isFixed,
      req,
      options: [ ... ]
    }
  */


  let initialState = [
    // { field: 'New Field', value: '' },
  ];

  // Override the default state if fields is given as props
  if (props.fields) {
    initialState = defaultPairMaker(props.fields)
  }
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
    props.submit(result)

  }

  // Changes the values in the 'labelInput' & 'valueInput' and saves it in the state as well.
  const handlePairChange = (inputLabel, pairIndex, evt) => {
    const tempInputPairsData = [...inputPairsData];
    inputLabel === 'field'
      ? tempInputPairsData[pairIndex].field = evt.target.value
      : tempInputPairsData[pairIndex].value = evt.target.value;
    setInputPairsData(tempInputPairsData)
  }



  return (
    <form

      className={styles.form}
      onSubmit={handleSubmit} >
      {
        inputPairsData.map((pair, pairIndex) => {
          return <div
            key={`pair-${pairIndex + 1}`}
            className={styles.formGroup}
          >

            {/* LABEL-INPUT-BOX */}
            <input
              className={styles.formField}
              type="text"
              placeholder={`field-${pairIndex + 1}`}
              value={pair.field}
              disabled={pair.req && true}

              onChange={e => handlePairChange('field', pairIndex, e)} />

            {/* VALUE-INPUT-BOX */}
            <input
              className={styles.formValue}
              disabled={pair.isFixed}
              list={`optionList-${pair.field}`}
              type="text"
              placeholder={`value-${pairIndex + 1}`}
              value={pair.value}
              // value={pair.fixedValue ? pair.fixedValue : pair.value}
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
  )
}



function DataList({ id, options }) {
  return (<datalist id={id}>
    {options.map((option, optionIndex) => {
      return <option key={`option-${optionIndex}`} value={option}> {option} </option>;
    })}
  </datalist>);
}
