import React, { useState } from 'react'
import { defaultPairMaker } from '../public/helpers';

export default function MultiForm(props) {

  // check if the compulsory fields array include any strings
  // If YES, then add predefined pairs with labels equal to the strings
  // const passedDownFields = [
  //   { field: 'Name', value: '', req: true },
  //   { field: 'Type', value: '', req: true },
  //   { field: 'Remarks', value: '', req: true },
  // ]
  // props.defaultFields && console.log(defaultPairMaker(props.defaultFields));

  const [inputs, setInputs] = useState(props.defaultFields && defaultPairMaker(props.defaultFields) || [
    { field: 'New Field', value: '' },
  ]);

  const handleFieldAdd = (e) => {
    e.preventDefault();
    const tempInputs = [...inputs];
    tempInputs.push({ field: ``, value: `` })
    setInputs(tempInputs)

  }
  const handlerPairDelete = (pairIndex, e) => {
    e.preventDefault();
    const tempInputs = [...inputs];
    tempInputs.splice(pairIndex, 1)
    setInputs(tempInputs)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  }

  const handlePairChange = (inputLabel, pairIndex, evt) => {
    const tempInputs = [...inputs];
    inputLabel === 'field' ? tempInputs[pairIndex].field = evt.target.value : tempInputs[pairIndex].value = evt.target.value;
    setInputs(tempInputs)
  }



  return (
    <form onSubmit={handleSubmit} >
      {
        inputs.map((pair, idx) => {
          return <div key={`pair-${idx + 1}`} >
            <input
              type="text" placeholder={`field-${idx + 1}`}
              value={inputs[idx].field}
              disabled={inputs[idx].req && true}

              onChange={e => handlePairChange('field', idx, e)} />
            <input
              type="text" placeholder={`value-${idx + 1}`}
              value={inputs[idx].value}
              required={true}
              onChange={e => handlePairChange('value', idx, e)} />

            {!inputs[idx].req && <button onClick={e => handlerPairDelete(idx, e)} > Delete pair</button>}

          </div>
        })
      }
      <button onClick={handleFieldAdd}>Add Field</button>
      <button type='submit' >Submit Data</button>
    </form>
  )
}
