

const subBtn = document.getElementById("sumitBtn");
window.onload = function(){
    alert("this is working!! nice");
  };
const  resquestFunction =async ()=>{
    console.log("hello man how are you!!");
    if(document.getElementById("login_input_user_password").value == document.getElementById("login_input_confirm_password").value){
        document.getElementById("msg").innerHTML = "";   
        
            axios
            .post("http://localhost:8080/singin",{user_name:document.getElementById("login_input_name").value,user_password:document.getElementById("login_input_user_password").value}) 
            .then(res=>{
                // console.log(res.data);
                document.getElementById("login_input_user_password").value = "";
                document.getElementById("login_input_confirm_password").value = "";
                return res;

            })
            .then(data=>{
                // location.assign("");
                console.log(data);

            }).catch(err=>{
                alert("something went wrong!!");
            });

       }
       else{
          var item = document.getElementById("msg")
          document.getElementById("login_input_user_password").value = "";
          document.getElementById("login_input_confirm_password").value = "";
          item.innerHTML = "the passwords do not match!"
          item.style.color = 'red';
           
       }
    
};

subBtn.addEventListener('click',resquestFunction);
