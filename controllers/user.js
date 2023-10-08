const Project=require("../models/user")

const createdata = async(req, res) => {
    try{
        const {name, email, password}=req.body;
        const project=new Project({
            name,
            email,
            password,
        })
        await project.save()
        res.json(project)
    }catch(error) {
        res.status(500).json({error:error.message});
    }
}

const getAllData=async(req,res)=>{
    try {
        const getproject = await Project.find()
        res.json(getproject)
    }catch(error) {
        res.status(500).json({ error: error.message });
    }
}

const updateById = async(req,res)=>{
    try{
const {name, email, password} = req.body;
    let dataAgainstId = Project.findByIdAndUpdate(req.params.id, 
        {name,email,password},
        {new:true}
        )
        if(!dataAgainstId){
            return res.status(404).json({message: "DATA NOT FOUND"})
        }        
    }catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports={
    createdata,
    getAllData,
    updateById
}