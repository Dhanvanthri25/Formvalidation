import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function UpdateData(){
    const {s_no} = useParams();
    const [first_name,setFirst_name] = useState('');
    const [last_name,setLast_name] = useState('');
    const [gender,setGender] = useState('');
    const [phone_no,setPhone_no] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    // const [updateddate,setUpdateddate] = useState('');
    // const [status,setStatus] = useState('');

    useEffect(()=>{
        fetch("http://localhost:2500/Update/"+s_no+"")
        .then(response => response.json())
        .then(function(res){
            setFirst_name (res[0].first_name);
            setLast_name (res[0].last_name);
            setGender (res[0].gender);
            setPhone_no (res[0].phone_no);
            setEmail (res[0].email);
            setPassword (res[0].password);
            // setUpdateddate (res[0].updateddate);
            // setStatus (res[0].status);

        })

        .catch(function(error){
            alert(error);
            window.location.href = "/";
        })
    },[])





    const handlesubmit = async(event)=>{
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = {headers:{"enctype":"multipart/form-data"}};
        await axios.put('http://localhost:2500/Updateddata/' + s_no + '',{first_name,last_name,gender,phone_no,email,password},config)
        .then(function(res){
            if(res.data.status === 'error'){
                alert('error');
                window.location.href="/";
            }
            else if (res.data.status === 'success'){
                alert('updated')
                window.location.href = "/";
            }
        })
            .catch(function(err){
                alert(err);
                window.location.href="/";
            })

    }

   










    return(
        <>
           <div className="container-fluid mt-5 pt-5 vh-100">
           <form onSubmit={handlesubmit}>
                            <label for="inputEmail4" className="form-label">First Name</label>
                            <input type="text" name="first_name" className="form-control" id="firstname" placeholder="Enter Your FirstName" value={first_name} onChange={(e)=>setFirst_name(e.target.value)}/>
                   
                            <label for="inputPassword4" className="form-label">LastName</label>
                            <input type="text" name="last_name" className="form-control" id="lastname" placeholder="Enter Your LastName" value={last_name} onChange={(e)=>setLast_name(e.target.value)} />
        
                            <label for="inputEmail4" className="form-label">Gender</label>
                            <input type="text" name="gender" className="form-control" id="gender" placeholder="Enter Your Gender" value={gender} onChange={(e)=>setGender(e.target.value)}/>
                
                            <label for="inputPassword4" className="form-label">Phone Number</label>
                            <input type="tel" name="phone_no" className="form-control" id="phoneno" placeholder="Enter Your PhoneNumber" value={phone_no} onChange={(e)=>setPhone_no(e.target.value)} />
   
                            <label for="inputEmail4" className="form-label">E-Mail</label>
                            <input type="text" name="email" className="form-control" id="email" placeholder="Enter Your E-Mail" value={email} onChange={(e)=>setEmail(e.target.value)} />
              
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" id="password" placeholder="Enter Your Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    
                            <input type="submit" className="rounded-3 mt-2"/>
                     
            </form>
           </div>

        </>
    );
}