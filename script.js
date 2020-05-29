const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const container =document.querySelector('.container')
const container2 =document.querySelector('.container2')

// Show input error message
function showError (input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}
// Show input success message
function showSuccess (input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

//Check email is valid
function isEamilValid (input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(input.value.trim())){
        showSuccess(input)
        return true
    }else{
        showError(input, 'Email is not valid')
        return false
    }
}

//Get field name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

//Check required fields
function checkRequired(inputArr){
    var isCompleted = true
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
            isCompleted = false
        }
    })
    return isCompleted
}

//Check input length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
        return false
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
        return false
    }else{
        showSuccess(input)
        return true
    }
}

//Check password match
function checkPasswordsMatch(input1, input2){
    if(input1.value.trim() !== '' ){
        if(input1.value !== input2.value ){
            showError(input2, 'Password do not match')
            return false
        }else{
            showSuccess(input2)
            return true
        }
    }
    return false
}


// Check the form
function checkForm () {

    username.addEventListener('input', function(e){
        checkLength(username, 3, 15)
    })

    email.addEventListener('input', function(e){
        isEamilValid(email)
    })
    
    password.addEventListener('input', function(e){
        checkLength(password, 6, 20)
        
    })
    
    password2.addEventListener('input', function(e){
        checkPasswordsMatch(password, password2)
    })
    

    form.addEventListener('submit', function(e) {
        e.preventDefault()
        const input1 = checkRequired([username, email, password, password2])

        if(!input1){
            alert('Please complete the form!')
        }else{
            const input2 = checkLength(username, 3, 15)
            const input3 = isEamilValid(email)
            const input4 = checkLength(password, 6, 20)
            const input5 = checkPasswordsMatch(password, password2)

            if(input2&&input3&&input4&&input5){
                container.classList.add('fadeOut')
                container2.classList.add('fadeIn')
            }
        }
        

    
        
    })

    
  
}

checkForm()