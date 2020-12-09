// const { Headers } = require("node-fetch");

// const axios = require('axios');
const subBtn = document.getElementById("sbumitBtn");
const  resquestFunction = ()=>{
    console.log("the user name was => "+document.getElementById("login_input_name").value);
    console.log("the user password was => "+document.getElementById("login_input_password").value);
    // axios
    // .post('http://localhost:8080/api', { user_id:document.getElementById("login_input_name").value, passWrd:document.getElementById("login_input_password").value })
    // .then(res => {
    //   console.log("got the response from the database!");
    // //   resp(res.data);
    // })
    // .catch(error => {
  
    //   console.error(error)
    // })


    var data = {
         user_id:document.getElementById("login_input_name").value,
         passWrd:document.getElementById("login_input_password").value }

    fetch("http://localhost:8080/api",{method:"POST",body: {
        user_id:document.getElementById("login_input_name").value,
        passWrd:document.getElementById("login_input_password").value }
        , mode:'cors'
        // ,headers: data ? {'Content-Type':'application/json'} : {}
    })
        .then(response =>{
            // console.log(resp);
            return response;
        }).then(data =>{
            console.log(data);
        });
};

subBtn.addEventListener('click',resquestFunction);
