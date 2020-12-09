

const subBtn = document.getElementById("sbumitBtn");
const  resquestFunction =async ()=>{
    
    console.log("the user name was => "+document.getElementById("login_input_name").value);
    console.log("the user password was => "+document.getElementById("login_input_password").value);
    axios
    .post("http://localhost:8080/api",{user_id:document.getElementById("login_input_name").value,passWrd:document.getElementById("login_input_password").value}) 
    .then(res =>{
        console.log(res.data);
        return res.data.body;
    })
    .then(data=>{
        if (data == true ){
            document.getElementById('msg').innerHTML = "";
            alert("this was the correct credentials!!");
            // window.open("http://localhost:801/signin",replace = "http://localhost/login/post1")
            location.replace("http://localhost:801/signin");
        }
        else{
            document.getElementById('login_input_name').value = '';
            document.getElementById('login_input_password').value = '';
            document.getElementById('msg').innerHTML = "incorrect credentials!!";
        }

    }).catch(err=>{
        alert("something went wrong!!");
    });
};

subBtn.addEventListener('click',resquestFunction);
