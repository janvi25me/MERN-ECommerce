import { Address } from "../Models/Address.js";

//add address
export const addAddress = async (req, res) => {
    try {
    let {fullName, address, city, state, country, pinCode, phoneNumber} = req.body

let userId = req.user

    let userAddress = await Address.create({
        userId, fullName, address, city, state, country, pinCode, phoneNumber
    })

  res.json({message: 'Address added', userAddress,success:true})
}
catch(error) {
    res.json({message: "Address not found", error})
}
}

//get Address
export const getAddress = async (req, res) => {
    try
    {
    let address = await Address.find({userId: req.user}).sort({cretedAt:-1})
    res.json({messaage: "Address is", userAddress:address[0]})
    }  
catch(error) {
    res.json({message: "Address not found", error})
}
}