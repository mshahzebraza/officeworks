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

  const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = detailSummaryStates

  return (
    <section className={concatStrings([styles.nav, ...outerClasses])} >

      {
        list.length > 0 && list.map(
          (projCat, projCatIdx) =>
            <Detail
              key={projCatIdx}
              title={projCat.name}
              click={
                () => {
                  setActiveDetailItem('') // do this only if the activeDetailItem doesn't start with the parent detail
                  setActiveDetail(projCat.name)
                }
              }
              isActive={activeDetail == projCat.name}
            >
              {
                projCat.projects.map(
                  (project, catItemIdx) =>
                    <DetailItem
                      key={catItemIdx}
                      click={() => {
                        setActiveDetailItem(project.nomenclature)
                        activeDetail !== projCat.name && setActiveDetail(projCat.name)
                      }}

                      isActive={activeDetailItem == project.nomenclature}
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
