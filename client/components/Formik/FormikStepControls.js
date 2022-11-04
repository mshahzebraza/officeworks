import React from 'react'
import FormikStep from "./FormikStep";

function FormikStepControls({
     activeStepState,
     stepLength,
     activeStepOnNext = null,
     activeStepOnPrev = null,
}) {
     return (
          <div
               style={{
                    display: "flex"
               }}
          >
               <FormikStep
                    style={{
                         marginRight: "auto",
                         flex: "0 0 45%"
                    }}
                    activeStepState={activeStepState}
                    stepLength={stepLength}
                    type="prev"
                    onPrev={activeStepOnPrev ? activeStepOnPrev : () => true}
               />
               <FormikStep
                    style={{
                         marginLeft: "auto",
                         flex: "0 0 45%"
                    }}
                    activeStepState={activeStepState}
                    stepLength={stepLength} // ? if activeStepOnNext is not available then proceed to next stage automatically
                    onNext={activeStepOnNext ? activeStepOnNext : () => true}
                    type="next"
               />
          </div>);
}

export default FormikStepControls
