const multiStepForm = document.querySelector("[data-multi-step]")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]//turn to array
let currentStep = formSteps.findIndex(step => {
    return step.classList.contains("active")
})
if (currentStep < 0) {
    currentStep = 0
    formSteps[currentStep].classList.add("active")
    showCurrentStep()
}

multiStepForm.addEventListener("click", e => {
    let incrementor
    if (e.target.matches("[data-next]")) {
        incrementor = 1
    } else if (e.target.matches("[data-previous]")) {
        incrementor = -1
    }

    if (incrementor == null) return

    // const inputs = [...formSteps[currentStep].querySelectorAll("input")]
    // const allValid = inputs.every(input => input.checkValidity())
    const allValid = true
    if (allValid) {
        currentStep += incrementor
        showCurrentStep()
    }
    console.log(currentStep)
})

formSteps.forEach(step => {
    step.addEventListener("animationend", e => {
        formSteps[currentStep].classList.remove('hide')
        step.classList.toggle("hide", !step.classList.contains('active'))
    })
})

function showCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep)
    }) 
}