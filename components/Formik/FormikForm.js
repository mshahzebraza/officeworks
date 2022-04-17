import { Form } from 'formik'
import React, { useState } from 'react'
import { concatStrings } from '../../helpers/reusable'
import styles from './formik.module.scss';
import FormikStepControls from './FormikStepControls';

function FormikForm({ children, outerClasses = [], multiStage = false, stepOptions = [] }) {
     { //? How to use multi-step feature of the form
          // 1. Use the Following props in FormikForm
          /* {
               multiStage
               stepOptions={[ //? One options object for each direction
                    { goToNext: () => stageTwoCriteria(values, setFieldValue, validateField, errors) }, //? TRUE return of the goTo funcs will show the next step only
                    {}
               ]}
          } */
          // Create the functions for navigation. ("values" and other formik props may be used to make the decision)
          /* 
          let stageTwoCriteria = (values) => {

               // ID must not be empty or null
               if (!values.id) return false

               // find duplicate ID in current moduleList
               const duplicateModule = moduleState.find(module => module.id === values.id)
               if (!duplicateModule) return true // if no duplicate module found, then proceed to next form stage

               // if duplicate module found, then ask user to confirm if they want to proceed
               const confirmSubmission = window.confirm(`Id matches an existing module.
               \nClick Confirm to continue?
               \nClick Cancel to refill the form.`)
               if (!confirmSubmission) return false // if user clicks cancel, then stop the form submission

               return true
          }
           */
          // 3. Wrap the desired children components into Fragments to make them show together

     }

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
                    activeStepOnNext={stepOptions?.[activeStep]?.goToNext}
                    activeStepOnPrev={stepOptions?.[activeStep]?.goToPrev}
                    activeStepState={[activeStep, setActiveStep]}
               />

          </Form >
     )
}

export default FormikForm




