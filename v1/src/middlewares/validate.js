const httpStatus = require("http-status"); //BU DOSYA BİR MİDDLEWARE VE MİDDLEWARE'LER ROUTİNG SEVİYESİNDE İS GORUR
const { object } = require("joi");

const validate=(schema)=>(req,res,next)=>{
   const {value,error}= schema.validate(req.body);
   if(error){
    const errorMessage=error.details?.map(detail=>detail.message).join(", ")
    res.status(httpStatus.BAD_REQUEST).json({error:errorMessage});
    return;
   }

   Object.assign(req,value);
   return next();
};

module.exports=validate;