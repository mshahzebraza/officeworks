import React from 'react'
import { useState } from 'react';

function ModalButton({ caption = 'Show Modal', ModalComponent, ...rest }) {
  // modalState & modalStateSetter = stateVariables
  // const [modalState, setModalState] = stateVariables;

  const [modalState, setModalState] = useState(false)
  return (
    <>
      {/* <button onClick={() => setShowModal(true)} >Add a MWO</button>
      {showModal && <MWO_Form closer={() => setShowModal(false)} />} */}
      <button
        type='button'
        onClick={() => setModalState(true)}
      >
        {caption}
      </button>

      {modalState && <ModalComponent {...rest} closer={() => setModalState(false)} />}

    </>
  )
}

export default ModalButton
