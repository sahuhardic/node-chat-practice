const generateMessage = (obj)=>{
    Object.assign(obj,{createdAt:new Date().getTime()});
}; 

module.exports={generateMessage};