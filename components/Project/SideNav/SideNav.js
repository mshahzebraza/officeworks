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



export default function SideNav({ list = [], outerClasses = [], activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem }) {


  return (
    <section className={concatStrings([styles.nav, ...outerClasses])} >

      {
        list.length > 0 && list.map(
          (projCat, projCatIdx) =>
            <Detail
              title={projCat.name}
              click={
                () => {
                  setActiveDetailItem('')
                  setActiveDetail(projCat.name)
                }
              }
              isActive={activeDetail == projCat.name}
            >
              {
                projCat.projects.map(
                  (project, catItemIdx) =>
                    <DetailItem
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
