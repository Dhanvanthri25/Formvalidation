const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const database = require('mysql');

const add = express();
add.use(cors());
add.use(bodyparser.json());
add.use(express.json());
add.use(express.static('public'));

let a = database.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "root",
        database: "crud"
    }
)

a.connect(function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Database Connected Successfully");
    }
}
)

add.get('/Personaldetails', (request, response) => {
    let sql = 'Select * from personal_details ';
    a.query(sql, (error, result) => {
        if (error) {
            response.send(error);
        }
        else {
            response.send(result);
        }
    })
})

add.post('/AddUser',(request,response)=>{
    let {firstname,lastname,gender,phoneno,email,password} = request.body;
    let sql = 'insert into personal_details(first_name,last_name,gender,phone_no,email,password,status) values (?,?,?,?,?,?,?)';
    a.query(sql,[firstname,lastname,gender,phoneno,email,password,0],(error,result)=>{
        if (error) {
            let s = {"status":"error"}
            response.send(s);
        }
        else{
            let s = {"status":"success"}
            response.send(s);
        }
    })
})

add.post('/Delete',(request,response)=>{
    let s_no = request.body.s_no;
    let sql = 'delete from personal_details where s_no = ?';

    a.query (sql,[s_no],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let s = {"status":"success"};
            response.send(s)
        }
    })
})

add.get('/Update/:s_no',(request,response)=>{
    let s_no = request.params.s_no;
    let sql = 'select * from personal_details where s_no=?';
    a.query(sql,[s_no],(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})

add.put('/Updateddata/:s_no',(request,response)=>{
    let s_no = request.params.s_no;
    let {first_name,last_name,gender,phone_no,email,password} = request.body;
    console.log(email)
    let sql = 'update personal_details set first_name=?,last_name=?,gender=?,phone_no=?,email=?,password=? where s_no=?';
    a.query(sql,[first_name,last_name,gender,phone_no,email,password,s_no],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let s = {"status":"success"};
            response.send(s)
        }  

})
})

add.listen(2500, () => { console.log("Server running on 2500") });