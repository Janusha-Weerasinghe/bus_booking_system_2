const express = require('express');
const {signupSchema, signinSchema}= require('../middlewares/requestValidator');
const { doHash, doHashValidation, hmacProcess } = require('../utils/hashing');
const User = require('../models/user');
const Joi = require('joi');
const jwt =require ('jsonwebtoken');
const transtport = require('../middlewares/sendMail');
const organization=require('../models/organization');
const router = express.Router();


exports.signup = async (req, res) => {
    const { NICnumber, fullName, email, password, roleID, contactNumber } = req.body;

    try {
        // Validate request body against signupSchema
        const { error, value } = signupSchema.validate({ NICnumber, fullName, email, password, roleID, contactNumber });

        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message });
        }

        const existingUserByEmail = await User.findOne({ email });
        const existingUserByNIC = await User.findOne({ NICnumber });

        if (existingUserByEmail) {
            return res.status(401).json({ success: false, message: 'Email already in use' });
        }

        if (existingUserByNIC) {
            return res.status(401).json({ success: false, message: 'NIC number already in use' });
        }
        // Validate organization if operator
        if (roleID === 'operator') {
            const organization = await Organization.findById(organizationRegisteredId);
            if (!organization) return res.status(404).json({ success: false, message: 'Invalid organization registered ID' });
        }
        const hashPassword = await doHash(password, 12);

        const newUser = new User({
            NICnumber,
            fullName,
            email,
            password: hashPassword,
            roleID,
            contactNumber,
        });

        const result = await newUser.save();
        result.password = undefined;

        res.status(201).json({
            success: true,
            message: 'Your account was created successfully',
            result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const{error,value} = signinSchema.validate({email,password});
        if(error){
            return res.status(401)
            .json({success:false,message:error.details[0].message});
        }
        const existingUser = await User.findOne({email}).select('+password').populate('roleID');
         if(!existingUser){
            return res.status(404).json({ success: false, message: 'User does not exists' });
        }
        const result =await doHashValidation(password, existingUser.password)
        if(!result){
            return res.status(401)
            .json({sucess:false,message:"Invalid credintials"});

        }
   const token =jwt.sign({
    userId : existingUser.id,
    email:existingUser.email,
    verified :existingUser.verified,
    roleName: existingUser.roleID.roleName
   },
process.env.TOKEN_SECRET ,{
    expiresIn:'8h',
}
);
res.cookie('Authorization','Bearer '+token , {expires: new Date(Date.now() +8*3600000),httpOnly:process.env.NODE_ENV ==='production', secure:process.env.NODE_ENV ==='production',

})
.json({
    sucess:true,token,
    roleName: existingUser.roleID.roleName,
    message:'logged in successfully'
})
    }    
    catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

exports.signout = async (req,res)=>{
    res.clearCookie('Authorization').status(200).json({success:true,message:'Logout succesfull'})
}

exports.sendVerificationCode= async (req,res)=>{
    const {email}= req.body;
    try{
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'User does not exists' });
        }
        if (existingUser.verified) {
            return res.status(400).json({ success: false, message: 'Your already verified' });
        }
        const codeValue=Math.floor(Math.random()*1000000).toString();
        let info = await transtport.sendMail({
            from:process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to:existingUser.email,
            subject:"verificatiion code",
            html:'<h1> ' + codeValue +'</h1>'
        })
        if(info.accepted[0]=== existingUser.email){
            const hashedCodeValue = hmacProcess(codeValue,process.env.HMAC_VERIFICATION_CODE_SECRET);
            existingUser.verificationCode = hashedCodeValue;
            existingUser.verificationCodeValidation=Date.now();
            await existingUser.save()
            return res.status(200).json({sucess:true,message:'Code sent!'});


        }
        res.status(400).json({sucess:false,message:'Code sent failed'});
        

    }
    catch(error){
        console.log(error);

    }
}

