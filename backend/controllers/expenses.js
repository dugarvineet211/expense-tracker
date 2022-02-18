const Expense=require('../models/expenses');

exports.addExpense=(req,res,next)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;

    req.user.createExpense({amount,description,category})
    .then(expense=>{
        return res.status(201).json({expense,success:true,message:'Successfully created new expense'});
    })
    .catch(err=>{
        console.log(err);
        return res.status(403).json({success:false,message:'Cannot add new expense!'});
    });
}

exports.getAllExpenses=(req,res,next)=>{
    req.user.getExpenses()
    .then(expenses=>{
        return res.status(200).json({expenses,success:true});
    })
    .catch(err=>{
        return res.status(403).json({success:false,message:'Cannot get expenses!'});
    })
}

exports.deleteExpense=(req,res,next)=>{
    const id=req.params.expenseId;
    Expense.destroy({where:{expenseId:id}})
    .then(()=>{
        return res.status(201).json({success:true,message:'Successfully deleted expense!'});
    })
    .catch(err=>{
        return err.status(403).json({success:false,message:'Cannot delete expenses!'});
    });
}