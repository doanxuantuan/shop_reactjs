const port=4000;
const express=require("express");
const app=express();
const  mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");
const { error } = require("console");
const { type } = require("os");
const { ppid } = require("process");

app.use(express.json());
app.use(cors());
//database connect mongodb
mongoose.connect("mongodb+srv://greatstackdev:007007007@cluster0.qiw4hj0.mongodb.net/e-cormmerce");

//api creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})


// imgae Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage})



app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})



const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_prices:{
        type:Number,
        required:true,
    },
    old_prices:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    },
})



//creation API add product 
app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0)
        {
            let last_product_array=products.slice(-1);
            let last_product=last_product_array[0];
            id=last_product.id+1;
        }
        else{
            id=1;
        }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_prices:req.body.new_prices,
        old_prices:req.body.old_prices,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// Creation API delete products from database
app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creation API get all products from frontend
app.get('/allproduct',async(req,res)=>{
    let products=await Product.find({});
    console.log("All Fetch Products");
    res.send(products);
})
//Creation User model
const Users=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

app.post('/signup',async(req,res)=>{
    let check =await Users.findOne({email:req.body.email});
    if(check)
        {
            return res.status(404).json({success:false,errors:"Đã tồn tại"})
        }
        let cart={};
        for(let i=0;i<300;i++)
        {
                cart[i]=0;
        }
        const user=new Users({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cartData:cart,
        })
        await user.save();
        const data={
            user:{
                id:user.id
            }
        }
        const token=jwt.sign(data,'secret_ecom');
        res.json({success:true,token})
})

//creating enpoint for user login
app.post('/login',async(req,res)=>{
    let user= await Users.findOne({email:req.body.email});
    if(user)
        {
            const passCompare=req.body.password===user.password;
            if(passCompare)
                {
                    const data={
                        user:{
                            id:user.id
                        }
                    }
                    const token=jwt.sign(data,'secret_ecom')
                    res.json({success:true,token});
                }
                else{
                    res.json({success:false,error:"Wrong password"});
                }
        }
      else{
        res.json({success:false,error:"Wrong Email"})
      }
})
app.get('/newcollections',async(req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})
app.get('/popularinwomen',async(req,res)=>{
    let products=await Product.find({category:"women"});
    let product_in_women=products.slice(0,4);
    console.log("Popular in women");
    res.send(product_in_women);
})
// const fetchUser=async (req,res,next)=>{
//     const token=req.header('auth-token');
//     if(!token){
//         res.status(401).send({errors:"Please authen using validation"})
//     }
//     else{
//         try {
//             const data=jwt.verify(token,'secret-ecom');
//             req.user=data.user;
//             next();
//         } catch (error) {
//             res.status(401).send({errors:"Please authen using a valid token"})
//         }
//     }
// }
// app.post('/addtocart',fetchUser,async(req,res)=>{
//     console.log(req.body,req.user);
// })
app.listen(port,(error)=>{
    if(!error)
        {
            console.log("server running in port"+ port)
        }
        else{
            console.log("Error:"+error)
        }
})