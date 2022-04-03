import React, { Children } from 'react'
import { concatStrings } from '../../helpers/reusable'
import styles from './formik.module.scss'

function FormikStep({
     type = 'next', // || 'prev'
     stepLength = 2,
     // activeStep = 0,
     // setActiveStep = () => { },
     activeStepState = [0, () => 0],
     onPrev = null,
     onNext = null,

     children,
     disabled = false,
     outerClasses = [],
     ...restProps
}) {

     const [activeStep, setActiveStep] = activeStepState
     let isFirstStep = activeStep === 0;
     let isLastStep = activeStep === stepLength - 1;

     return (
          <button
               {...restProps}
               onClick={() => {
                    if (type === 'next') {

                         // if onNext is available then execute it before moving to next stage
                         const isCriteriaMet = onNext && onNext()

                         if (isCriteriaMet) {
                              setActiveStep(activeStep + 1);
                         } else {
                              alert('Criteria to next stage is not met')
                         }
                    } else {
                         const isCriteriaMet = onPrev && onPrev()

                         if (isCriteriaMet) {
                              setActiveStep(activeStep - 1);
                         } else {
                              alert('Criteria to next stage is not met')
                         }
                    }
               }}
               type="button"
               disabled={
                    (type === 'next' && isLastStep) || (type === 'prev' && isFirstStep) || disabled
               }
               className={concatStrings([styles.formStep, ...outerClasses])}
          >
               {children ||
                    (type === 'next'
                         ? `Next Step #${activeStep + 1}`
                         : `Prev Step #${activeStep + 1}`
                    )
               }
          </button>
     )
}

export default FormikStep
