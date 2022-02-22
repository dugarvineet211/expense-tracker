const Expense=require('../models/expenses');
const uuid=require('uuid');
const BlobServiceClient=require('@azure/storage-blob');

exports.addExpense=(req,res,next)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    console.log(req.body);

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
    console.log(req.body);
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

exports.downloadExpenses=async (req, res) => {

    try {
        if(!req.user.isPremiumUser)
        {
            return res.status(401).json({ success: false, message: 'User is not a premium User'})
        }
        const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

        const containerName = 'vineetdugar211ExpenseTracker';e
        console.log('\nCreating container...');
        console.log('\t', containerName);

        const containerClient = await blobServiceClient.getContainerClient(containerName);

        if(!containerClient.exists())
        {
            const createContainerResponse = await containerClient.create({ access: 'container'});
            console.log("Container was created successfully! requestId: ", createContainerResponse.requestId);
        }
        const blobName = 'expenses' + uuidv1() + '.txt';
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        console.log('\nUploading to Azure storage as blob:\n\t', blobName);

        const data =  JSON.stringify(await req.user.getExpenses());

        const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
        console.log("Blob was uploaded successfully. requestId: ", JSON.stringify(uploadBlobResponse));

        const fileUrl = `https://demostoragesharpener.blob.core.windows.net/${containerName}/${blobName}`;
        res.status(201).json({ fileUrl, success: true});
    } catch(err) {
        res.status(500).json({ error: err, success: false, message: 'Something went wrong'})
    }

};
