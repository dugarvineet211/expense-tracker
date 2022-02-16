document.getElementById('add').addEventListener('click',(e)=>{
    e.preventDefault();

    const amount=document.getElementById('amount');
    const description=document.getElementById('description');
    const category=document.getElementById('category');

    const expenseDetails={
        amount:amount.value,
        description:description.value,
        category:category.value
    }
    
    axios.post('http://localhost:3000/addexpenses',expenseDetails)
    .then()
    .catch();
})