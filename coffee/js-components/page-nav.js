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

const goToBeginning = () => {
    currentStep = 0
    showCurrentStep()
}


multiStepForm.addEventListener("click", e => {
    
    let incrementor = null
    if (e.target.matches("[data-next]")) {
        incrementor = 1
    } else if (e.target.matches("[data-previous]")) {
        incrementor = -1
    }

    if (incrementor == null) return

    let allValid = false
    if (e.target.id == "submit" && incrementor == 1) {
        const inputs = [...formSteps[currentStep].querySelectorAll("input")] // only check for important ones
        allValid = inputs.every(input => input.checkValidity())// if incrementor is 1 then stop going forward else allow to go backwards
        if (allValid) {
            resetChecks()
        }
    } else {
        allValid = true
    }
    if (allValid) {
        currentStep += incrementor
        showCurrentStep()
    }
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