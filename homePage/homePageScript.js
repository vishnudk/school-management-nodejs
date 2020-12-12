const subBtn = document.getElementById("check");

const fun = async ()=>{
    let params = new URLSearchParams(location.search);
    console.log("this is the function");
    document.getElementById("user_name").innerHTML="hello man how are you";    
};
subBtn.addEventListener('click',fun);

