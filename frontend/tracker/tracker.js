function addNewExpense(e)
{
    e.preventDefault();

    const amount=document.getElementById('amount');
    const description=document.getElementById('description');
    const category=document.getElementById('category');

    const expenseDetails={
        amount:amount.value,
        description:description.value,
        category:category.value
    }
    const token = localStorage.getItem('token');
    axios.post('http://localhost:3000/addexpense',expenseDetails,{headers:{'Authorization':token}})
    .then((res)=>{
        if(res.status===201)
        addExpense(res.data.expense);
    })
    .catch(err=>alert(err.response.data.message));
}

window.addEventListener('load',()=>{
    const token=localStorage.getItem('token');
    axios.get('http://localhost:3000/getexpense',{headers:{"Authorization":token}})
    .then(res=>{
        if(res.status===200)
        res.data.expenses.forEach(expense=>{addExpense(expense)})
    })
    .catch(err=>console.log(err));
});

function addExpense(expense)
{
    const parent=document.getElementById('list');
    const liElementId=`${expense.expenseId}`
    parent.innerHTML+=`<li id="${liElementId}">
    ${expense.category} - ${expense.description} - ${expense.amount} <button id='delete' onclick="deleteNewExpense(event,${expense.expenseId})"> Delete Expense</button> </li>`;
}

function deleteNewExpense(e,expenseId)
{
    const token=localStorage.getItem('token');
    axios.delete(`http://localhost:3000/deleteexpense/${expenseId}`,{headers:{"Authorization" :token}})
    .then(res=>{
        if(res.status==201)
        deleteExpense(expenseId);
    })
    .catch();
}

function deleteExpense(expenseId)
{
    document.getElementById(expenseId).remove();
}

