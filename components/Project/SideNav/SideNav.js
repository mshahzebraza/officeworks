// Dependency & Helpers
import React from 'react'
import { concatStrings } from '../../../helpers/reusable'

// Store
// import { projectActions } from '../../store/project/project-slice'

// Styles
import styles from './SideNav.module.scss'

// Components
import Detail from '../../Detail&Summary/Detail'
import DetailItem from '../../Detail&Summary/DetailItem'



export default function SideNav({ list = [], outerClasses = [], projectIndexStates }) {

  return (

    <section className={concatStrings([styles.nav, ...outerClasses])} >

      <Detail
        title={'Projects'}>
        {
          list.length > 0 && list.map(
            (project, projectIndex) =>
              <DetailItem
                key={projectIndex}
                detailItemId={projectIndex}
                detailItemStates={projectIndexStates}
              >
                {project && project.summary && project.summary.nomenclature}

              </DetailItem>

          )
        }
      </Detail>

    </section >
  )
}
