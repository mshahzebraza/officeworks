import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { camelToSentenceCase, isObjEmpty } from '../../../../helpers/reusable';
import { projectActions } from '../../../../store/project/project-slice';
import Detail from '../../../Detail&Summary/Detail';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
// import AddProjectPart_Modal from '../ProjectForms/AddProjectPart_Modal';
// import UpdateProjectPart_Modal from '../ProjectForms/UpdateProjectPart_Modal';
import ProjectModule_Form from '../ProjectForms/ProjectModule_Form';
import styles from './SpecialModules.module.scss'


export default function SpecialModules({ specParts, moduleState, projectState }) {

  // let activeModuleData = {};
  // console.log('activeModuleData', activeModuleData);
  const initialUpdateFormState = { show: false, data: null };

  const dispatch = useDispatch();
  const [showAddForm, setShowAddForm] = useState(false)

  const [updateFormState, setUpdateFormState] = useState(initialUpdateFormState)


  const [projectType, projectId, assemblies] = projectState;
  const isProjectValid = !!projectType && !!projectId;

  const specPartsExist = specParts.manufactured.length > 0 || specParts.purchased.length > 0;


  const partCTGs = ['purchased', 'manufactured'];

  const specBtnDataList = [
    {
      caption: 'Add Part',
      click: () => {
        setShowAddForm(state => !state)
        console.log(`Hey Add`);
      }
    },

  ]


  return (
    <DetailSection title='Special Modules' btnDataList={isProjectValid && specBtnDataList} >
      {
        showAddForm && <ProjectModule_Form
          closer={() => setShowAddForm(false)}
          projectCatName={projectType}
          projectId={projectId}
          assemblies={assemblies}
        />
      }

      {
        updateFormState.show && <ProjectModule_Form
          closer={() => setUpdateFormState(initialUpdateFormState)}
          projectCatName={projectType}
          projectId={projectId}
          assemblies={assemblies}
          oldModuleData={updateFormState.data}
        />
      }

      {
        specPartsExist ?
          partCTGs.map( // searches the partListData for each category mentioned in the array
            (partCTG, partCTGkey) => <Detail // add a detailId field
              key={partCTGkey}
              title={`${specParts[partCTG].length}x ${camelToSentenceCase(partCTG)} Parts`} // -> 2x Special Modules
              defaultOpen
            >
              {
                specParts[partCTG].map(
                  (specPart, idx2) => {
                    return <DetailItem
                      key={idx2}
                      detailId={partCTG}
                      detailItemId={specPart.nomenclature}
                      selectionStates={moduleState}
                      outerClasses={[styles.entry]}
                    >
                      <span className={styles.entryIndex}> {idx2 + 1}.</span>
                      <span className={styles.entryNomenclature}> {specPart.nomenclature}</span>
                      <span className={styles.entryId}> {specPart.id}</span>
                      <span className={styles.entryQty}> {specPart.qty}/Act</span>
                      <div className={styles.entryCommands}>
                        <EntryCtrlBtn type={'Summary'} click={() => { setUpdateFormState({ show: true, data: specPart }) }} />
                        <EntryCtrlBtn type={'Update'} click={() => { setUpdateFormState({ show: true, data: specPart }) }} />
                        <EntryCtrlBtn type={'Delete'} click={() => { dispatch(projectActions.deleteProjectPart([projectType, projectId, specPart.id])) }} />
                      </div>
                    </DetailItem>
                  }
                )
              }
            </Detail>
          ) : <p className='note'>No Module Found - SpecialModule</p>
      }
    </DetailSection>
  );
}



function EntryCtrlBtn(props) { // Pass the `TYPE` in sentence case

  return (
    <button
      className={`${styles[`entryCommands${props.type}`]} ${`tooltip`}`}
      onClick={props.click}
    >
      {/* <Image
        src={`/icons/${props.type}.png`}
        alt={props.type}
        width={20}
        height={20} /> */}
      {props.type.split('')[0]}
      <span className={`tooltipContent`}>{props.type}</span>
    </button>
  )
}