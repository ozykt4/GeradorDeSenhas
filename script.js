const inputEl = document.querySelector("#password")

const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")

const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

let passwordLenght = 16

function generatePassword() {
  let chars = "abcdfghjklmnpqrstuvwxyz"

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
  const numberChars = "123456789"
  const symbolChars = "?![]*()@&"

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars 
  }
    
   if (numberCheckEl.checked) {
    chars += numberChars 
  }
    
  if (symbolCheckEl.checked) {
    chars += symbolChars
  }
    
  let password = ""

  for (let i = 0; i < passwordLenght; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber,randomNumber + 1)
  }

  inputEl.value = password

  calculateQuality()
  calculateFonteSize()
}

function calculateQuality() {
  const percent = Math.round(
    (passwordLenght / 64)  * 25 +
      (upperCaseCheckEl.checked ? 15 : 0) +
      (numberCheckEl.checked ? 25 : 0) +
      (symbolCheckEl.checked ? 35 : 0)  
  )
  securityIndicatorBarEl.style.width = `${percent}%`

  if (percent > 69) {
    securityIndicatorBarEl.classList.remove('critial')
    securityIndicatorBarEl.classList.remove('warning')
    securityIndicatorBarEl.classList.add('safe')
  }else if (percent > 50) {
    securityIndicatorBarEl.classList.remove('critial')
    securityIndicatorBarEl.classList.add('warning')
    securityIndicatorBarEl.classList.remove('safe')
  }else {
    securityIndicatorBarEl.classList.add('critial')
    securityIndicatorBarEl.classList.remove('warning')
    securityIndicatorBarEl.classList.remove('safe')
  }

  if (percent >= 100) {
    securityIndicatorBarEl.classList.add("completed")
  }else {
    securityIndicatorBarEl.classList.remove("completed")
  }

}

function calculateFonteSize() {
  if(passwordLenght > 45) {
    inputEl.classList.remove("font-sm")
    inputEl.classList.remove("font-xs")
    inputEl.classList.add("font-xxs")
  } else if (passwordLenght > 32) {
    inputEl.classList.remove("font-sm")
    inputEl.classList.add("font-xs")
    inputEl.classList.remove("font-xxs")
  } else if (passwordLenght > 22) {
    inputEl.classList.add("font-sm")
    inputEl.classList.remove("font-xs")
    inputEl.classList.remoce("font-xxs")
  } else {
    inputEl.classList.remove("font-sm")
    inputEl.classList.remove("font-xs")
    inputEl.classList.remove("font-xxs")
  }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const passwordLenghtEl = document.querySelector("#password-lenght")
passwordLenghtEl.addEventListener("input", function() {
    passwordLenght = passwordLenghtEl.value
    document.querySelector("#password-lenght-text").innerText =
        passwordLenght
    generatePassword()
})
upperCaseCheckEl.addEventListener('click', generatePassword)
numberCheckEl.addEventListener('click', generatePassword)
symbolCheckEl.addEventListener('click', generatePassword)

document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click", generatePassword)

generatePassword() 