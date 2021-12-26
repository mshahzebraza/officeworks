import React, { useState } from 'react'
import { camelToSentenceCase } from '../../../../helpers/reusable';
import Detail from '../../../Detail&Summary/Detail';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './StandardModules.module.scss'
import AddProjectPart_Modal from '../ProjectForms/AddProjectPart_Modal';
import UpdateProjectPart_Modal from '../ProjectForms/UpdateProjectPart_Modal';
import { useDispatch } from 'react-redux';
import { projectActions } from '../../../../store/project/project-slice';

export default function StandardModules({ stdParts, moduleState, projectState }) {

  const initialUpdateFormState = { show: false, data: null };

  const dispatch = useDispatch();

  const [showAddForm, setShowAddForm] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [updateFormState, setUpdateFormState] = useState(initialUpdateFormState)


  const [projectType, projectId] = projectState;
  const isProjectValid = !!projectType && !!projectId;

  const stdPartsExist =
    stdParts.bearing.length > 0 ||
    stdParts.screw.length > 0 ||
    stdParts.washer.length > 0 ||
    stdParts.misc.length > 0;

  const stdBtnDataList = [
    {
      caption: 'Add Part',
      click: () => {
        setShowAddForm(state => !state)
        console.log(`Hey Add`);
      }
    }
  ]

  const stdPartCTGs = ['bearing', 'screw', 'washer', 'misc'];

  return (

    <DetailSection title='Standard Modules' btnDataList={isProjectValid && stdBtnDataList} >
      {
        showAddForm && <AddProjectPart_Modal
          closer={() => setShowAddForm(false)}
          projectCatName={projectType}
          projectId={projectId}
        />
      }
      {
        updateFormState.show && <UpdateProjectPart_Modal
          closer={() => setUpdateFormState(initialUpdateFormState)}
          projectCatName={projectType}
          projectId={projectId}
          oldModuleData={updateFormState.data}
        />
      }

      {
        stdParts &&
          stdPartsExist ?
          stdPartCTGs.map(
            stdPartCat => <Detail
              title={`${stdParts[stdPartCat].length}x ${camelToSentenceCase(stdPartCat)} Parts`} // -> 2x Special Modules
              defaultOpen
            >
              {
                stdParts[stdPartCat].map(
                  (stdPart, idx2) =>
                    <DetailItem
                      key={idx2}
                      detailId={stdPartCat}
                      detailItemId={stdPart.id}
                      selectionStates={moduleState}
                      outerClasses={[styles.entry]}
                    >
                      <span className={styles.entryIndex}> {idx2 + 1}.</span>
                      <span className={styles.entryId}> {stdPart.id}</span>
                      <span className={styles.entryOther}> ---</span>
                      <span className={styles.entryQty}> {stdPart.qty}/Act</span>
                      <div className={styles.entryCommands}>
                        <EntryCtrlBtn type={'Update'} click={() => { setUpdateFormState({ show: true, data: stdPart }) }} />
                        <EntryCtrlBtn type={'Delete'} click={() => { dispatch(projectActions.deleteProjectPart([projectType, projectId, stdPart.id])) }} />
                      </div>
                    </DetailItem>
                )
              }
            </Detail>
          ) : <p className='note'>No Module Found - StandardModule</p>
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