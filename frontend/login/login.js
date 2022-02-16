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
    .then(res=>{
       
        if(res.status===200)
        {
        alert('LOGIN SUCCESSFUL!!');
        window.location.href='../tracker/tracker.html'
        }
        if(res.status===401)
        throw new Error('Password Incorrect');
        else 
        throw new Error('User not authorized');
    })
    .catch(err=>{
        // if(err.status===401)
        // alert('Password incorrect!');
        // if(err.status===404)
        // alert('User does not exist!');
        alert('User does not exist or Password Incorrect!!');
    });
});