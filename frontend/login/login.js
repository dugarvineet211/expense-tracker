document.getElementById('login').addEventListener('click',(e)=>
{
    e.preventDefault();
    
    const email=document.getElementById('email');
    const password=document.getElementById('password');

    const userDetails={
        email:email.value,
        password:password.value
    };

    axios.post('http://localhost:3000/login',userDetails)
    .then()
    .catch();
});