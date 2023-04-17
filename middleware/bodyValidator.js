function bodyPostValidator(req, res, next) {
    const { body } = req;
    for (let key in body) {
      if (body[key] === null || body[key] === undefined || body[key] === ""){
        return res.status(400).json({ Error: `${key} can neither be null nor undefined or empty` });
        
      }
    }
    let {fName, lName, address, email, phone} = body;
    if(!fName || !lName || !address || !email || !phone){
        res.status(400);
        throw new Error(`All fields are requested!`);
    }
    next();
  }

function bodyPutValidator(req, res, next){

  
  const { body } = req;
  for (let key in body) {
    if (body[key] === null || body[key] === undefined || body[key] === ""){
      return res.status(400).json({ Error: `${key} can neither be null nor undefined or empty` });
      
    }
  }
  next();
}

  module.exports = {bodyPostValidator, bodyPutValidator};
  