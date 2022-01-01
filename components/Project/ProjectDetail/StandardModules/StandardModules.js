import React, { useState } from 'react'
import { camelToSentenceCase } from '../../../../helpers/reusable';
import Detail from '../../../Detail&Summary/Detail';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './StandardModules.module.scss'
import ProjectModule_Form from '../ProjectForms/ProjectModule_Form';
// import UpdateProjectPart_Modal from '../ProjectForms/UpdateProjectPart_Modal';
import { useDispatch } from 'react-redux';
import { projectActions } from '../../../../store/project/project-slice';
import Button from '../../../UI/Button';

export default function StandardModules({ stdParts, moduleState, projectState }) {

  const initialUpdateFormState = { show: false, data: null };

  const dispatch = useDispatch();

  const [showAddForm, setShowAddForm] = useState(false)
  const [updateFormState, setUpdateFormState] = useState(initialUpdateFormState)


  const [projectType, projectId, assemblies] = projectState;
  const isProjectValid = !!projectType && !!projectId;

  const stdPartsExist =
    stdParts.bearing.length > 0 ||
    stdParts.screw.length > 0 ||
    stdParts.washer.length > 0 ||
    stdParts.misc.length > 0;


  const buttonsJSX = <>
    <Button caption='Add Part' click={() => { setShowAddForm(state => !state) }} />,
  </>

  const stdPartCTGs = ['bearing', 'screw', 'washer', 'misc'];

  return (

    <DetailSection title='Standard Modules' buttonsJSX={isProjectValid && buttonsJSX} >
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
        stdParts &&
          stdPartsExist ?
          stdPartCTGs.map(
            (stdPartCat, stdPartCatKey) => <Detail
              key={stdPartCatKey}
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
                        <EntryCtrlBtn type={'Summary'} click={() => { setUpdateFormState({ show: true, data: stdPart }) }} />
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