import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import'./Admintable.css';
import { Link } from "react-router-dom";

export function  Admin(){


    const[tabledata,settabledata]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:2500/Personaldetails')
        .then((result)=>
        {
            console.log(result);
            settabledata(result.data);
        });
    },[])

    const data_del = (s_no) => {
        var dataString = {s_no:s_no};
        var config = {headers:{"enctype":"multipart/form-data"}};

        axios.post('http://localhost:2500/Delete',dataString,config)
        .then(function(res){
            if(res.data.status === 'error') {
                alert('error');
                window.location.reload();
            }
            else if (res.data.status === 'success'){
                alert('deleted');
                window.location.reload();
            }

        })
        .catch(function(error){
            alert(error);
            window.location.reload();
        })
        

    }


return(
    <>
    <div className="bgcolor vh-100 table ">

        <table className=" border border-5 tb">
            <tr className="tb border border-3">
            <th className="tb">Sno</th>    
            <th className="tb">FirstName</th>
            <th className="tb">LastName</th>
            <th className="tb">Gender</th>
            <th className="tb">PhoneNo</th>

            <th className="tb">updatedDate</th>
            <th className="tb">Email</th>
            <th className="tb">Password</th>
            <th className="tb">status</th>

            <th className="tb">Edit</th>
            <th className="tb">Button</th>

            
        
            </tr>
            <tbody>
                {tabledata.map((value,index)=>(

                    <tr>
                        <td className="tb">{value.s_no}</td>
                        <td className="tb">{value.first_name}</td>
                        <td className="tb">{value.last_name}</td>
                        <td className="tb">{value.gender}</td>
                        <td className="tb">{value.phone_no}</td>

                        <td className="tb">{value.updated_date}</td>
                        <td className="tb">{value.email}</td>
                        <td className="tb">{value.password}</td>
                        <td className="tb">{value.status}</td>

                        <Link to = {"/UpdateData/"+value.s_no}><td><input type="button" className="bg-warning" value="Edit"/></td></Link>
                        <td><input type="button" onClick={()=>{data_del(value.s_no)}} className="bg-danger"  value="Delete"/></td>
                    </tr>
                ))}
            </tbody>
            
        </table>
    </div>
    </>
);
}