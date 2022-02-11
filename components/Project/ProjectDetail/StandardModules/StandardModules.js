import React, { useState } from 'react'
import { camelToSentenceCase } from '../../../../helpers/reusable';
import Detail from '../../../Detail&Summary/Detail';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './StandardModules.module.scss'
import ProjectModule_Form from '../ProjectForms/ProjectModule_Form';
// import UpdateProjectPart_Modal from '../ProjectForms/UpdateProjectPart_Modal';
// import { useDispatch } from 'react-redux';
import { projectActions } from '../../../../store/project/project-slice';
import Button from '../../../UI/Button';
import ModalButton from '../../../UI/ModalButton';
import DataRow from '../../../UI/DataRow/DataRow';
import DataRowItem from '../../../UI/DataRow/DataRowItem';
import { deleteProjModHandler } from '../../../../lib/apollo_client/projectApollo';


export default function StandardModules({ stdParts, projectState = [], assemblyList = [] }) {


  // const dispatch = useDispatch();


  const [projectType, projectId] = projectState;
  const isProjectValid = !!projectType && !!projectId;

  const stdPartsExist =
    stdParts.bearing.length > 0 ||
    stdParts.screw.length > 0 ||
    stdParts.washer.length > 0 ||
    stdParts.misc.length > 0;


  const buttonsJSX = <>
    <ModalButton
      caption='Add Part'
      ModalComponent={ProjectModule_Form}
      assemblies={assemblyList}
      projectState={projectState}
    />
  </>

  const stdPartCTGs = ['bearing', 'screw', 'washer', 'misc'];

  return (

    <DetailSection title='Standard Modules' buttonsJSX={isProjectValid && buttonsJSX} >


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
                    // detailId={stdPartCat}
                    // detailItemId={stdPart.id}
                    // selectionStates={moduleState}
                    >
                      <DataRow raw >
                        <DataRowItem flex={1} outerClasses={[styles.entryIndex]} content={`${idx2 + 1}.`} />
                        <DataRowItem flex={2} outerClasses={[styles.entryId]} content={`${stdPart.id}`} />
                        <DataRowItem flex={5} outerClasses={[styles.entryOther]} content={` ---`} />
                        <DataRowItem flex={1} outerClasses={[styles.entryQty]} content={`${stdPart.qty}/Act`} />
                        <DataRowItem
                          flex={4}
                          outerClasses={[styles.entryCommands]}
                          content={<>
                            <ModalButton
                              caption='U'
                              ModalComponent={ProjectModule_Form}
                              projectState={projectState}
                              assemblies={assemblyList}
                              oldModuleData={stdPart}
                            />
                            <Button caption='S - X' click={() => { alert('Delete function not defined') }} />
                            <Button caption='D' click={() => deleteProjModHandler([projectType, projectId, stdPart.id])} />

                          </>}
                        />
                      </DataRow>
                    </DetailItem>
                )
              }
            </Detail>
          ) : <p className='note'>No Module Found - StandardModule</p>
      }


    </DetailSection>

  );
}
