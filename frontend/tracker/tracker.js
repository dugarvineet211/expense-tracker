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

function logout()
{
    localStorage.clear();
    window.location.href='../login/login.html';
}

async function toPremium(e)
{
    const token = localStorage.getItem('token');
    const response=await axios.get('http://localhost:3000/premiummembership', { headers: {"Authorization" : token} });
    var options =
    {
     "key": response.data.key_id,
     "name": "Test Company",
     "order_id": response.data.order.id, 
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     "handler": function (response) {
         axios.post('http://localhost:3000/updatetransaction',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User now')
         }).catch(() => {
             alert('Something went wrong! Try again!')
         })
     },
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.description);
 });

}

