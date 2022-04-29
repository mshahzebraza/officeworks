// Dependency
import React from 'react'

// Store & Styles

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
import { Summarize } from '../UI/Summarize/Summarize'


export default function MWO_Summary({ closer, mwoData }) {

     return (
          <Portal>
               <Modal
                    title='MWO Summary'
                    closer={closer}
               >
                    <Summarize
                         data={mwoData}
                         dataKeyOptions={{
                              toDelete: ['_id', '__v', 'index'],
                              toFetch: [['linkedModules', 'item']],
                              toUpdate: [['mwoId', 'MWO ID'], ['linkedModules', 'Modules Ordered']]
                         }}
                    />
               </Modal>
          </Portal>
     )
}