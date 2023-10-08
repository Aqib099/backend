const Form = require('../models/form')

const insertData = async(req, res) => {
    try{
        const {name, email, password}=req.body;
        const form=new Form({
            name,
            email,
            password,
        })
        await form.save()
        res.json(form)
    }catch(error) {
        res.status(500).json({error:error.message});
    }
}

const getData=async(req,res)=>{
    try {
        const getFormData = await Form.find()
        res.json(getFormData)
    }catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports={
    insertData,
    getData
}