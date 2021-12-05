import React, { useState } from 'react'
import styles from './Multiform.module.scss'
import { defaultPairMaker, multiFormDataTranslator } from '../../public/helpers';
import { useDispatch } from 'react-redux'
import { poActions } from '../../store/po/po-slice'

export default function MultiForm(props) {

  // check if the compulsory fields array include any strings
  // If YES, then add predefined pairs with labels equal to the strings

  // console.log(props.subLevels);

  let initialState = [
    { field: 'New Field', value: '', level: 0, req: true },
    { field: 'New Field', value: '', level: 0 },
  ];

  if (props.defaultFields) {
    initialState = defaultPairMaker(props.defaultFields)
    console.log(initialState);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = multiFormDataTranslator(inputPairs, props.subLevels);
    props.submitter(result)

  }

  const handlePairChange = (inputLabel, pairIndex, evt) => {
    const tempInputPairs = [...inputPairs];
    inputLabel === 'field' ? tempInputPairs[pairIndex].field = evt.target.value : tempInputPairs[pairIndex].value = evt.target.value;
    setInputPairs(tempInputPairs)
  }



  return (
    <form onSubmit={handleSubmit} >
      {
        inputPairs.map((pair, pairIndex) => {
          return <div className={styles.formGroup} key={`pair-${pairIndex + 1}`} >
            <input
              type="text" placeholder={`${pair.level}/field-${pairIndex + 1}`}
              value={pair.field}
              disabled={pair.req && true}

              onChange={e => handlePairChange('field', pairIndex, e)} />
            <input
              list={`optionList-${pair.field}`}
              type="text" placeholder={`${pair.level}/value-${pairIndex + 1}`}
              value={pair.value}
              required={true}
              onChange={e => handlePairChange('value', pairIndex, e)} />
            {
              pair.options &&
              <datalist id={`optionList-${pair.field}`} >
                {
                  pair.options.map((option) => {
                    return <option value={option}> {option} </option>
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
