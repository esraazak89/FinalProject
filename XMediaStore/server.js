const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


let photographer = require("./module/photographer")
let type = require("./module/type")
let post = require("./module/post")
let customer = require("./module/customer")
let book = require("./module/book")


  const db = mongoose.connect('mongodb://localhost/MediaStore',{
    useNewUrlParser: true ,
    useUnifiedTopology: true
})


app.post('/photographer', function(req,res){
    let NewPhotographer = new photographer()

   NewPhotographer.photographer_pic = req.body.photographer_pic 
    NewPhotographer.photographer_Name = req.body.photographer_Name
    NewPhotographer.username = req.body.username
    NewPhotographer.Phone_Number = req.body.Phone_Number
    NewPhotographer.Location = req.body.Location
    NewPhotographer.Photography_email = req.body.Photography_email
    NewPhotographer.Password  = req.body.Password
   
  //console.log(req.body.photographer_pic)

    
    NewPhotographer.save(function(err,AddedPhotographer){
        if (err){
          console.log(err)
          res.status(500).send({error:"Couldn't add"})
        } else {
          
          res.send(AddedPhotographer)
        }
      })
})

// get 

app.get('/photographers', function(req, res) {
    photographer.find({}, function(err, photographer) {
        if(err) {
            console.log(err);
            res.status(500).send(err)
        }
        else {
            res.send(photographer)
        }
    })
  })

  app.delete('/photographer/:ID', function(req, res) {
    let photographerId = req.params.ID;
    console.log('deleting');
  
    photographer.deleteOne({_id: photographerId}, function(err, State) {
      if(err) {
        res.status(500).send({error: 'could not delete..'})
        console.log(err);
      }
      else {
        res.send(State)
      }
    })
  })

  app.put('/photographer/:ID', function(req, res) {
    let photographerId = req.params.ID
    console.log('Photographer');
  
    photographer.updateOne({_id: photographerId}, {$set: {
        photographer_Name :req.body.photographer_Name,
        Photography_email : req.body.Photography_email,
      username : req.body.username,
      Phone_Number:req.body. Phone_Number,
      Location:  req.body.Location,
      Password: req.body.Password,
      Photography_Type : req.body.Photography_Type
    }} ,(err, State) => {
        if(err) {
          res.status(500).send({error: 'could not change ..'})
          console.log(err);
        }
        else {
          res.send(State)
        }
    })
  })

//post type
app.post ('/type' , function(req,res){
    let NewType = new type()
    NewType.typeName = req.body.typeName

    NewType.save(function(err,SavedType) {
        if(err) {
            console.log(err);
            res.status(500).send(err)
        }
        else {
            res.send(SavedType)
        }
    })
})



app.post ('/post' , function(req,res){
    let NewPost = new post()
    NewPost.post_desc = req.body.post_desc
    NewPost.post_pic = req.body.post_pic
    NewPost.price = req.body.price
    NewPost.Photography_Type = req.body.Photography_Type
    NewPost.save(function(err,SavedPost) {
        if(err) {
            console.log(err);
            res.status(500).send(err)
        }
        else {
            res.send(SavedPost)
        }
    })
})
app.get('/posts', function(req, res) {
    post.find({}).populate( {
        path: "Photography_Type",
        model:"type",
        select: "typeName-_id=0"
    }).exec(function(err, post) {
        if(err) {
            console.log(err);
            res.status(500).send(err)
        }
        else {
            res.send(post)
        }
    })
  })

  app.delete('/post/:ID', function(req, res) {
    let postId = req.params.ID;
    console.log('deleting');
  
    post.deleteOne({_id: postId}, function(err, State) {
      if(err) {
        res.status(500).send({error: 'could not delete..'})
        console.log(err);
      }
      else {
        res.send(State)
      }
    })
  })

  app.put('/post/:ID', function(req, res) {
    let postId = req.params.ID
    console.log('post');
  
    post.updateOne({_id: postId}, {$set: {
        post_desc :req.body.post_desc,
        post_pic : req.body.post_pic,
        price:req.body.price,
         Photography_Type : req.body.Photography_Type
    }} ,(err, State) => {
        if(err) {
          res.status(500).send({error: 'could not change ..'})
          console.log(err);
        }
        else {
          res.send(State)
        }
    })
  })


  app.post('/UploadPic' , function (req,res){

    console.log('in upload');
      console.log(req.files.file)
     console.log(req.files.file.name)
  
  
      try {
          if(!req.files.file) {
              res.send({
                  status: false,
                  message: 'No file uploaded'
              });
          } else {
              //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
              let Pic = req.files.file;
  
              //Use the mv() method to place the file in upload directory (i.e. "uploads")
              let newName = Date.now().toString()+Pic.name.substr(Pic.name.length - 5)
  
              console.log(newName)
              Pic.mv('./uploads/' + newName); //>>first part of path react
  
              //send response
              res.send({
                  status: true,
                  message: 'File is uploaded',
                  data: {
                      name: newName, // >> send this path to react (second)
                      mimetype: Pic.mimetype,
                      size: Pic.size
                  }
              });
              console.log('done')
          }
      } catch (err) {
             console.log(err)
            console.log('failed')
  
          res.status(500).send(err);
      }
  
  })

  app.post('/customer', function(req,res){
    let NewCustomer = new customer()
    NewCustomer.customer_Name = req.body.customer_Name
    //NewCustomer. customerID =req.body. customerID 
    NewCustomer.Phone_Number = req.body.Phone_Number
    NewCustomer.Location = req.body.Location
    NewCustomer.username = req.body.username
    NewCustomer.customer_email = req.body.customer_email
    NewCustomer.Password  = req.body.Password
   
    
    NewCustomer.save(function(err,AddedCustomer){
        if (err){
          console.log(err)
          res.status(500).send({error:"Couldn't add"})
        } else {
          
          res.send(AddedCustomer)
        }
      })
})

app.post('/book', function(req,res){
  let NewBook = new book()
  NewBook.FullName = req.body.FullName
  NewBook.username = req.body.username
  NewBook.Phone_Number = req.body.Phone_Number
  NewBook.City = req.body.City
  NewBook.Date = req.body.Date
  NewBook.Alt_Date = req.body.Alt_Date

  NewBook.save(function(err,AddedBook){
      if (err){
        console.log(err)
        res.status(500).send({error:"Couldn't add"})
      } else {
        
        res.send(AddedBook)
      }
    })
})
//get book

/* app.get('/books', function(req, res) {
  post.find({}).populate( {
     // path: "Photography_Type",
     // model:"book",
     // select: "typeName-_id=0"
  }).exec(function(err, post) {
      if(err) {
          console.log(err);
          res.status(500).send(err)
      }
      else {
          res.send(post)
      }
  })
})
 */

app.get('/', function(req, res) {
    res.status(200).send('all is good')
    console.log('ready');
  })

  app.listen(4000, function() {
    console.log("Server is running on port 4000...")
})