import React, { useState } from 'react'
import styles from './Multiform.module.scss'
import { guid, defaultPairMaker, multiFormDataTranslator } from '../../public/helpers';
import { useDispatch } from 'react-redux'
import { poActions } from '../../store/po/po-slice'

export default function MultiForm(props) {

  // The default state to give the user predefined input boxes
  let initialState = [
    // { field: 'New Field', value: '', level: 0, req: true },
    // { field: 'New Field', value: '', level: 0 },
  ];

  // Override the default state if fields is given as props
  if (props.fields) {
    initialState = defaultPairMaker(props.fields)
  }
  const [inputPairs, setInputPairs] = useState(initialState);


  const handleFieldAdd = (e, level = 0) => {
    // Check the level of addition i.e. 1,2,3 etc.
    e.preventDefault();
    const tempInputPairs = [...inputPairs];
    if (level > 0) {
      tempInputPairs.push({ field: ``, value: ``, level: level })
    } else {
      tempInputPairs.unshift({ field: ``, value: ``, level: level })

    }
    setInputPairs(tempInputPairs)

  }
  const handlerPairDelete = (pairIndex, e) => {
    e.preventDefault();
    const tempInputPairs = [...inputPairs];
    tempInputPairs.splice(pairIndex, 1)
    setInputPairs(tempInputPairs)
  }


  // fetches the data from form-inputs and converts it into POitem object to store it in state.
  /* 
    {
      field, // decides the 'key-name' of POitem-object
      value, // decides the 'value' of POitem-object
      level, // decides the nesting of the pair in the item-object
      
      // REST OF THE KEYS BELOW ARE NOT IMPORTANT
      isFixed,
      req,
      options: [ ... ]
    }
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`beforeConversion`, inputPairs);
    const result = multiFormDataTranslator(inputPairs, props.subLevels);
    console.log('result', result);
    props.submit(result)

  }

  // Changes the values in the 'labelInput' & 'valueInput' and saves it in the state as well.
  const handlePairChange = (inputLabel, pairIndex, evt) => {
    const tempInputPairs = [...inputPairs];
    inputLabel === 'field'
      ? tempInputPairs[pairIndex].field = evt.target.value
      : tempInputPairs[pairIndex].value = evt.target.value;
    setInputPairs(tempInputPairs)
  }


  /* 
  For each field, following data is passed
    {
      field, // decides the 'value' of the labelInput
      value, // decides the 'value' of the valueInput
      level, // used in placeholder to let the user know the hierarchal level of the label-input pair
      req, // used to decide if the labelInput is disabled && if the delete (for input-label pair) button is shown
      options: [ ... ], // used to display the datalist for a given input box
      fixed // decides if the valueInput will remain disabled. (useful for update-functions) 
    }
     */
  return (
    <form onSubmit={handleSubmit} >
      {
        inputPairs.map((pair, pairIndex) => {
          return <div
            key={`pair-${pairIndex + 1}`}
            className={styles.formGroup}
          >

            {/* LABEL-INPUT-BOX */}
            <input
              type="text"
              // depends on 'level'
              placeholder={`${pair.level}/field-${pairIndex + 1}`}
              // depends on 'isFixed'
              value={pair.field}
              disabled={pair.req && true}

              onChange={e => handlePairChange('field', pairIndex, e)} />

            {/* VALUE-INPUT-BOX */}
            <input
              disabled={!!pair.fixedValue}
              list={`optionList-${pair.field}`}
              type="text"
              placeholder={`${pair.level}/value-${pairIndex + 1}`}
              value={pair.fixedValue ? pair.fixedValue : pair.value}
              required={pair.req}
              onChange={e => handlePairChange('value', pairIndex, e)}
            />
            {
              pair.options &&
              <datalist id={`optionList-${pair.field}`} >
                {
                  pair.options.map((option, optionIndex) => {
                    return <option key={`option-${optionIndex}`} value={option}> {option} </option>
                  })
                }
              </datalist>
            }


            {!pair.req && <button onClick={e => handlerPairDelete(pairIndex, e)} > Delete pair</button>}

          </div>
        })
      }

      <button type='submit' >Submit Data</button>
      {props.subLevels && props.subLevels.map((subLevel, id) => {
        return <button key={id} onClick={e => handleFieldAdd(e, id + 1)} >Add {subLevel}</button>
      })}
      <button onClick={handleFieldAdd}>Add Field</button>
    </form>
  )
}
