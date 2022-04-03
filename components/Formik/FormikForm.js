import { Form } from 'formik'
import React, { useState } from 'react'
import { concatStrings } from '../../helpers/reusable'
import styles from './formik.module.scss';
import FormikStepControls from './FormikStepControls';

function FormikForm({ children, outerClasses = [], multiStage = false, stepOptions = [] }) {
     if (!multiStage) {
          return (
               <Form className={concatStrings([styles.form, ...outerClasses])} >
                    {children}
               </Form >
          )
     }

     const [activeStep, setActiveStep] = useState(0);


     return (
          <Form className={concatStrings([styles.form, ...outerClasses])} >

               {children[activeStep]}

               <FormikStepControls
                    stepLength={children.length}
                    activeStepOnNext={stepOptions?.[activeStep]?.onNext}
                    activeStepOnPrev={stepOptions?.[activeStep]?.onPrev}
                    activeStepState={[activeStep, setActiveStep]}
               />

          </Form >
     )
}

export default FormikForm




