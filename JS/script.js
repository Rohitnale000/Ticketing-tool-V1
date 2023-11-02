
//to collect data from user and store into localstorage
let array = JSON.parse(localStorage.getItem('Registration')) || [];
const getFormData = () => {

    let id = new Date().getTime()
    const formDataObj = {
        id: id,
        firstName: document.getElementById('first_name').value,
        lastName: document.getElementById('last_name').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        role: document.getElementById('role').value
    }

    try {
        const result = validation(formDataObj)
        if (result) {
            array.push(formDataObj)
            localStorage.setItem('Registration', JSON.stringify(array))
            toastr.success(formDataObj.firstName + " " + formDataObj.lastName + ' You have succsufully reagister', 'Registration')
            document.getElementById("registrationForm").reset();
            setTimeout(() => {
                document.location.href = "/login.html";
            }, 3000);
        }

    } catch (error) {
        console.log(error)
    }
}

//login with username and password 
const loginService = () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let data = JSON.parse(localStorage.getItem('Registration'));

    if (!data) {
        toastr.error("Data not found in localStorage", 'Error');
        return;
    }
    let found = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].username === username && data[i].password === password) {
            if (data[i].role === "user") {
                toastr.success(`${data[i].username} you have logged in successfully`, 'Success');
                setTimeout(() => {
                    sessionStorage.setItem('loginData', JSON.stringify({username:data[i].username,password:data[i].password}))
                    document.location.href = "/user.html";
                //location.replace("user.html")
                }, 1000);
                found = true;
                break;
            } else if (data[i].role === "admin") {
                toastr.success(`${data[i].username} you have logged in successfully`, 'Success');
                setTimeout(() => {
                    sessionStorage.setItem('loginData', JSON.stringify({username:data[i].username,password:data[i].password}))
                  //  location.replace("user.html")
                  document.location.href = "/user.html";
                }, 1000);
                found = true;
                break;
            }
        }

    }
    if (!found) {
        toastr.error("Please enter a valid username or password", 'Error');
    }
}

//reset all form feilds
const onCancle = () => {
    document.getElementById("registrationForm").reset();
}

//validation for all feilds with specific message
const validation = (formData) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const conformPass = document.getElementById('conform_assword').value

    let firstNameValid = formData.firstName.length > 2;
    let lastNameValid = formData.lastName.length > 2;
    let userNameValid = formData.username.length > 4;
    let emailValid = emailRegex.test(formData.email);
    let passValid = passwordRegex.test(formData.password);
    let conformValid = formData.password === conformPass

    if (!firstNameValid) {
        document.getElementById("fname_val").style.display = "block";
    } else {
        document.getElementById("fname_val").style.display = "none";
    }

    if (!lastNameValid) {
        document.getElementById("lname_val").style.display = "block";
    } else {
        document.getElementById("lname_val").style.display = "none";
    }

    if (!userNameValid) {
        document.getElementById("uname_val").style.display = "block";
    } else {
        document.getElementById("uname_val").style.display = "none";
    }

    if (!emailValid) {
        document.getElementById("email_val").style.display = "block";
    } else {
        document.getElementById("email_val").style.display = "none";
    }

    if (!passValid) {
        document.getElementById("pass_val").style.display = "block";
    } else {
        document.getElementById("pass_val").style.display = "none";
    }

    if (!conformValid) {
        document.getElementById("cpass_val").style.display = "block";
    } else {
        document.getElementById("cpass_val").style.display = "none";
    }

    if (!firstNameValid || !lastNameValid || !userNameValid || !emailValid || !passValid || !conformValid) {
        return false;
    } else {
        return true;
    }


};