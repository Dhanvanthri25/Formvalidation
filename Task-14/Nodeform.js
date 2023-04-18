import axios from "axios";
import React from "react";

export function Form() {
    const handlesubmit = async (event) => {
        event.preventDefault();
        var dataString = new FormData(event.target);
        dataString.set('firstname',dataString.get('firstname'));
        dataString.set('lastname',dataString.get('lastname'));
        dataString.set('gender',dataString.get('gender'));
        dataString.set('phoneno',dataString.get('phoneno'));
        dataString.set('email',dataString.get('email'));
        dataString.set('password',dataString.get('password'));
        var config = { headers: { "enctype": "multipart/form-data" } };
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var gender = document.getElementById("gender").value;
        var phoneno = document.getElementById("phoneno").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        if (firstname === '' || firstname === 'null') {
            alert("enter first name")
        } else if (lastname === '' || lastname === 'null') {
            alert("enter lastname")
        } else if (gender === '' || gender === 'null') {
            alert("enter gender")
        } else if (phoneno === '' || phoneno === 'null') {
            alert("enter phone number")
        } else if (email === '' || email === 'null') {
            alert("enter email")
        } else if (password === '' || password === 'null') {
            alert("enter phone number")
        } else {
            await axios.post("http://localhost:2500/AddUser", {firstname,lastname,gender,phoneno,email,password}, config)
                .then(function (res) {
                    if (res.data.status === 'error') {
                        alert('error')
                        window.location.reload();
                    } else if (res.data.status === 'error') {
                        alert('success')
                        window.location.reload();
                    }
                })
        }
    }

    return (
        <>
           <div className="container-fluid mt-5 pt-5 vh-100">
           <form onSubmit={handlesubmit}>
                            <label for="inputEmail4" className="form-label">First Name</label>
                            <input type="text" name="firstname" className="form-control" id="firstname" placeholder="Enter Your FirstName" />
                   
                            <label for="inputPassword4" className="form-label">LastName</label>
                            <input type="text" name="lastname" className="form-control" id="lastname" placeholder="Enter Your LastName" />
        
                            <label for="inputEmail4" className="form-label">Gender</label>
                            <input type="text" name="gender" className="form-control" id="gender" placeholder="Enter Your Gender" />
                
                            <label for="inputPassword4" className="form-label">Phone Number</label>
                            <input type="tel" name="phoneno" className="form-control" id="phoneno" placeholder="Enter Your PhoneNumber" />
   
                            <label for="inputEmail4" className="form-label">E-Mail</label>
                            <input type="text" name="email" className="form-control" id="email" placeholder="Enter Your E-Mail" />
              
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" id="password" placeholder="Enter Your Password" />
                    
                            <input type="submit" className="rounded-3 mt-2"/>
                     
            </form>
           </div>
        </>
    );
}
