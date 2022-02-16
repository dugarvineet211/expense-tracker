document.getElementById('signup').addEventListener('click',(e)=>
{
    e.preventDefault();
    const name=document.getElementById('name');
    const email=document.getElementById('email');
    const number=document.getElementById('number');
    const password=document.getElementById('password');

    const userDetails={
        name:name.value,
        email:email.value,
        number:number.value,
        password:password.value,
    }

    
    axios.post('http://localhost:3000/signup',userDetails)
    .then((res)=>{
        if(res.status===201)
        alert(res.data.message);
    })
    .catch((err)=>{
        alert('User exists! Please login!');
    });
    
});
