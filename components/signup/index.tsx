"use client";
import Finish from "./finish/page";
import StepFour from "./step-four/page";
import StepOne from "./step-one/page";
import StepThree from "./step-three/page";
import StepTwo from "./step-two/page";
import UseSignUp from "./useSignup";

const SignUp = () => {
  const {
    formik,
    loading,
    screen,
    handleBack,
    handleNext,
    plansList,
    isDisabled,
    isVerifying,
    planInfo,
    isCorrectEmail,
    handleResendOTP,
    navigateToHome,
    isRegistered
  } = UseSignUp();

  return (
    <>
      {screen === 0 ?
        <StepOne navigateToHome={navigateToHome} isCorrectEmail={isCorrectEmail} isDisabled={isDisabled} formik={formik} handleBack={handleBack} />
        : screen === 1 ?
          <StepTwo formik={formik} navigateToHome={navigateToHome} plansList={plansList} handleBack={handleBack} handleNext={handleNext} />
          : screen === 2 ?
            <StepFour isRegistered={isRegistered} navigateToHome={navigateToHome} handleResendOTP={handleResendOTP} isVerifying={loading || isVerifying} formik={formik} handleBack={handleBack} />
            : screen === 3 ?
              <StepThree loading={loading} formik={formik} navigateToHome={navigateToHome} planInfo={planInfo} handleBack={handleBack} handleNext={handleNext} />
              : screen === 4 ?
                <Finish navigateToHome={navigateToHome} /> : ""
      }
    </>
  )
};

export default SignUp;
