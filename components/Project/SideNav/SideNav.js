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



export default function SideNav({ list = [], outerClasses = [], detailSummaryStates }) {


  return (
    <section className={concatStrings([styles.nav, ...outerClasses])} >

      {
        list.length > 0 && list.map(
          (projCat, projCatIdx) =>
            <Detail
              key={projCatIdx}
              title={projCat.name}
            >
              {
                projCat.projects.map(
                  (project, catItemIdx) =>
                    <DetailItem
                      key={catItemIdx}
                      detailId={projCat.name}
                      detailItemId={project.nomenclature}
                      // detailItemId={catItemIdx}
                      selectionStates={detailSummaryStates}
                    >
                      {project.nomenclature}
                    </DetailItem>
                )
              }
            </Detail>

        )
      }


    </section >
  )
}
