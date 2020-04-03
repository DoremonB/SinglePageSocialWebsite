//   //Very Very important !!!!!!!!!!...nested quering

// users.post('/getAllPostByMyFriends',checkAuth,async(req,res)=>{
//   console.log("User id is : "+req.decoded._id)
//   // const alldata=await (await MyFriendList.findOne({user:req.decoded._id}).populate('friends')).execPopulate()
  
//   //Very Very important !!!!!!!!!!...nested quering

  // const alldata=await MyFriendList.
  // findOne({user:req.decoded._id}).
  // populate({
  //   path: 'friends',
  //   select:'email MyPosts',
  //   // Get friends of friends - populate the 'friends' array for every friend
  //   populate: {
  //     path: 'MyPosts',
  //     select:'Comments Likes',
  //     populate:{
  //       path:'Comments'
  //     }
  //   }
  // });
  

//   return res.json({alldata})
// })

const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const checkAuth=require('./check-auth')

const User = require('../models/Users')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const Notification=require('../models/Notification')
const MyFriendList=require('../models/MyFriendList')
const Like=require('../models/Like')
users.use(cors())

process.env.SECRET_KEY = 'secretkey'

users.post('/getAllUserData',checkAuth,async(req,res)=>{
  console.log("User id is : "+req.decoded._id)
  const alldata=await User.find({_id:req.decoded._id}).populate({
    path:'MyPosts',
    populate:'Comments Likes'
  })
  return res.json({alldata})
})

users.post('/currentUser',checkAuth,async(req,res,next)=>{
  const user=await User.findById(req.decoded._id)
  return res.json({user})
})

users.post('/getAllPostByMyFriends',checkAuth,async(req,res)=>{
  // console.log("User id is : "+req.decoded._id)
  // // const alldata=await (await MyFriendList.findOne({user:req.decoded._id}).populate('friends')).execPopulate()
  
  // //Very Very important !!!!!!!!!!...nested quering

  // const alldata=await MyFriendList.
  // findOne({user:req.decoded._id}).
  // populate({
  //   path: 'friends',
  //   select:'MyPosts',
    
  //   // Get friends of friends - populate the 'friends' array for every friend
  //   populate: {
  //     path: 'MyPosts',
  //     // select:'Comments Likes',
  //     populate:{
  //       path:'Comments Likes createdBy'
  //     }
  //   }
  // });

  const u=await User.findById(req.decoded._id)
  li=u.MyFriends
  

  Post.find()
  .where('createdBy')
  .in(li)
  .sort('-date')
  // .populate('Likes Comments createdBy')

  .populate(
    [
      { path:'Likes' },
      { path:'createdBy'},
      {
        path:'Comments',
        populate:{
          path:'createdBy',
          select:'_id first_name profile_pic'
          // populate:'profile_pic'
        }
      }
    ]
  )


  .exec(function (err, records) {
    //make magic happen
    console.log("records are :"+records)
    console.log("records are ####:"+records[0].Comments[1].createdBy.profile_pic[records[0].Comments[1].createdBy.profile_pic.length-1])
    console.log("records length is :"+records.length)

    return res.json(records)
  });
  

  // return res.json(alldata.friends)
  
})

users.post('/allposts',checkAuth,async(req,res)=>{
  
  decoded=req.decoded

  allposts=await Post.find().sort('-date').populate('Comments Likes createdBy').exec()
  console.log("this is all posts after population "+allposts)

  return res.json(allposts)
})

users.post('/myfriends',checkAuth,async(req,res)=>{
  decoded=req.decoded
  const myfriends=await User.findById(decoded._id).select('MyFriends')
  return res.json(myfriends)
})

users.post('/myallposts',checkAuth,async(req,res)=>{
  decoded=req.decoded

  allposts=await Post.find({ createdBy:decoded._id }).sort('-date')
  // .populate('Comments Likes createdBy')
  .populate(
    [
      { path:'Likes' },
      { path:'createdBy'},
      {
        path:'Comments',
        populate:{
          path:'createdBy',
          select:'_id first_name profile_pic'
          // populate:'profile_pic'
        }
      }
    ]
  )
  .exec()
  // console.log(allposts)
  // const p=await Post.findById(req.body.postId).populate('Comments Likes').exec()
  return res.json(allposts)
})

users.post('/myNotifications',checkAuth,async(req,res)=>{
  decoded=req.decoded

  allNotifications=await Notification.find({ sentTo:decoded._id }).sort('-date')
  console.log(allNotifications)
  return res.json(allNotifications)
})

users.post('/allusers',checkAuth,async(req,res)=>{
  console.log("entered allusers")
  allusers=await User.find()
  console.log(allusers)
  return res.json(allusers)
})

users.post('/allusersmyfriends',checkAuth,async(req,res)=>{
  console.log("entered allusersmyfriends")

  const user=await User.findById(req.decoded._id)
  let li=user.MyFriends
  console.log(li)
  

  User.find()
  .where('_id')
  .in(li)
  .exec(function (err, records) {
    //make magic happen
    console.log("records are :"+records)
    
    console.log("records length is :"+records.length)

    return res.json(records)
  });

  


  // decoded=req.decoded
  // const user=await User.findOne({
  //   _id: decoded._id
  // })

  // fl=await MyFriendList.findOne({user:decoded._id})
  
  // lis=[]
  // // fl.friends.map(async (i)=>{
  // //   u=await User.findById(i)
  // //   console.log(i+" #  "+u)
  // // })
  // for(var i=0;i<fl.friends.length;i++){
  //   u=await User.findById(fl.friends[i])
  //   lis.push(u)
  // }

  // // const allusersmyfriends=fl.friends
  // console.log(lis)
  // return res.json(lis)
})

users.post('/register',async (req, res) => {
    const today = new Date()
    const userData ={
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      created: today,
      profile_pic:['http://res.cloudinary.com/dn5lfusbo/image/upload/v1585563298/blog/instagram-sketched.png2020-03-30T10:14:56.903Z.png'],
      cover_pic:['http://res.cloudinary.com/dn5lfusbo/image/upload/v1585563298/blog/instagram-sketched.png2020-03-30T10:14:56.903Z.png']
    }

    const user= await User.findOne({
        email: req.body.email
      })
      
        if (!user) {
            bcrypt.hash(req.body.password, 10,async (err, hash) => {
              userData.password = hash
              console.log(userData)
              try{
                const u=await User.create(userData)
                // await MyFriendList.create({ user:userData._id,friends:[] })
                //
                const myfriendlistData =new MyFriendList ({
                    user: u._id,
                    friends:[]
                })
                console.log(myfriendlistData)
                await myfriendlistData.save()
                    
                
                
                //
                res.json({ status: userData.email + ' Registered!' })
              }
              catch(err){
                res.send('error: ' + err)
              }
            } 
            )
        }
        else {
            res.json({ error: 'User already exists' })
        }
        
        
    })



    users.post('/login',async (req, res) => {
        const user=await User.findOne({
          email: req.body.email
        })
            if (user) {
              if (bcrypt.compareSync(req.body.password, user.password)) {
                // Passwords match
                const payload = {
                  _id: user._id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
		              bio:user.bio,
                  profile_pic:user.profile_pic[user.profile_pic.length-1],
                  cover_pic:user.cover_pic[user.cover_pic.length-1]
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                  expiresIn: 1440
                })
                res.json({token:token})
              } else {
                // Passwords don't match
                res.json({ error: 'Password doesnt match' })
              }
            } else {
              res.json({ error: 'User does not exist' })
            }
    })
          
      

//This route is not actually used in front end.
//In front end we generate and store the token on the basis of mail,password and secretkey.....so when we decode the token we get the mail,password.....and thus we get all info by decoding token
users.get('/profile',checkAuth, (req, res) => {
    //pass it without bearer in this case.....jwt.verify takes token without keyword 'Bearer '
    decoded=req.decoded
  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

users.post('/createPost',checkAuth,async (req, res) => {
  
  decoded=req.decoded
  const user=await User.findOne({
    _id: decoded._id
  })
  
  if(user){
      try{
    const upload = multer({ storage }).single('image')
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      console.log('file uploaded to server')
      console.log(req.file)
  
      // SEND FILE TO CLOUDINARY
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
      })
      
      const path = req.file.path
      const uniqueFilename = req.file.filename+new Date().toISOString()
  
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        async function(err, image) {
          if (err) return res.send(err)
          console.log('file uploaded to Cloudinary')
          // remove file from server
          const fs = require('fs')
          fs.unlinkSync(path)
          // return image details
          console.log(image.url)
        //   res.json(image)
            
        try{
            const postData =new Post ({
                caption: req.body.caption,
                image_url: image.url,
                createdBy:user._id,
                Likes:[],
                Comments:[]
            })
            console.log(postData)
                const p=await postData.save()
                //Now also update user's array of MyPost
                const postlist=user.MyPosts
                console.log("Before "+postlist)
                postlist.push(p._id)
                console.log("After "+postlist)
                user.MyPosts=postlist
                await user.save()

                res.json({'status':'success'})
            }
            catch(err){
                res.json({'error':err})
            }


        }
      )
    })
  


        }catch(err){
            res.send(err)
        }
    }
    else{
        return res.send('no user')
    }

    
})

users.post('/createStatusPost',checkAuth,async (req, res) => {
  
  decoded=req.decoded
  const user=await User.findOne({
    _id: decoded._id
  })
  
  if(user){
      try{
    
            const postData =new Post ({
                caption: req.body.content,
                image_url: '',
                createdBy:user._id,
                Likes:[],
                Comments:[]
            })
            console.log(postData)
                const p=await postData.save()
                //Now also update user's array of MyPost
                const postlist=user.MyPosts
                console.log("Before "+postlist)
                postlist.push(p._id)
                console.log("After "+postlist)
                user.MyPosts=postlist
                const u=await user.save()
                console.log('status post result backend :'+u)

                res.json({'status':'success'})
            }
            catch(err){
                res.json({'error':err})
            }


        }
      
    
  

    
    else{
        return res.send('no user')
    }

    
})

users.post('/createComment',checkAuth,async (req, res) => {
  
    decoded=req.decoded
    const user=await User.findOne({
      _id: decoded._id
    })

    const post=await Post.findOne({_id:req.body.postId})
    // .populate('Likes createdBy Comments')
    // .populate(
    //   [
    //     { path:'Likes' },
    //     { path:'createdBy'},
    //     {
    //       path:'Comments',
    //       populate:{
    //         path:'createdBy',
    //         select:'_id first_name profile_pic'
    //         // populate:'profile_pic'
    //       }
    //     }
    //   ]
    // )
    // .exec()

    

    const commentData =new Comment ({
      content: req.body.content,
      createdBy:user._id,
      postId:post._id
    })
    console.log(commentData)
      const cmt=await commentData.save()
      
      await post.Comments.push(cmt)
      const p=await post.save()

      //Create Notif about the comment
      const notificationData =new Notification ({
        content: decoded.email +" comented ' "+ req.body.content +" ' on post with caption ' "+post.caption+" '",
        sentBy:decoded._id,
        sentTo:post.createdBy,
        notificationType:3,//3->comment
        postId:post._id
      })
      console.log(notificationData)
        await notificationData.save()


        ////get updated post it......dont populate it before saving....because the lastest saved wont be pulated den
        const postfinal=await Post.findOne({_id:req.body.postId})
        // .populate('Likes createdBy Comments')
        .populate(
          [
            { path:'Likes' },
            { path:'createdBy'},
            {
              path:'Comments',
              populate:{
                path:'createdBy',
                select:'_id first_name profile_pic'
                // populate:'profile_pic'
              }
            }
          ]
        )
        .exec()
      

      return res.json({status:'success',post:postfinal})
    //This is just temporariy arrangement
  
  
  
  
    
    if(user){
        try{
      const upload = multer({ storage }).single('image')
      upload(req, res, async function(err) {
        if (err) {
          return res.send(err)
        }
        console.log('file uploaded to server')
        ///////////
        if(!req.file){
          try{
              const commentData =new Comment ({
                  content: req.body.content,
                  createdBy:user._id
              })
              console.log(commentData)
                  const cmt=await commentData.save()
                  console.log(cmt)
                  const p=await Post.findById(req.body.postId).populate('Comments Likes').exec()
                  await p.Comments.push(cmt)
                  await p.save()
                  

                  res.json({p})
              }
              catch(err){
                  res.json({err})
              }
        }
        ///////////////

        console.log(req.file)
    
        // SEND FILE TO CLOUDINARY
        const cloudinary = require('cloudinary').v2
        cloudinary.config({
          cloud_name: 'dn5lfusbo',
          api_key: '763614237956682',
          api_secret: 'qS4vG8wGgCbQrzbFaQSO8AH0qBk'
        })
        
        const path = req.file.path
        const uniqueFilename = req.file.filename+new Date().toISOString()
    
        cloudinary.uploader.upload(
          path,
          { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
          async function(err, image) {
            if (err) return res.send(err)
            console.log('file uploaded to Cloudinary')
            // remove file from server
            const fs = require('fs')
            fs.unlinkSync(path)
            // return image details
            console.log(image.url)
          //   res.json(image)
              
          
              const commentData =new Comment ({
                  content: req.body.content,
                  image_url: image.url,
                  createdBy:user._id
              })
              console.log(commentData)
                  const cmt=await commentData.save()
                  console.log(cmt)
                  const p=await Post.findById(req.body.postId).populate('Comments Likes').exec()
                  await p.Comments.push(cmt)
                  p.save()
                  

                  res.json({p})
              
  
  
          }
        )
      })
    
  
  
          }catch(err){
            
          }
      }
      else{
          return res.send('no user')
      }
  
      
  })

  users.post('/createNotification',checkAuth,async (req, res) => {
  
    decoded=req.decoded
    const user=await User.findOne({
      _id: decoded._id
    })
    
    if(user){
        try{
      
        
              const notificationData =new Notification ({
                  content: req.body.content,
                  sentBy:req.body.sentBy,
                  sentTo:req.body.sentTo,
                  notificationType:req.body.notificationType
              })
              console.log(notificationData)
                  await notificationData.save()
                  res.json({'status':'success'})
              
              
        
    
  
  
        }catch(err){
            res.send(err)
        }
      }
      else{
          return res.send('no user')
      }
  
      
  })

users.post('/addFriend',checkAuth, (req, res) => {
//pass it without bearer in this case.....jwt.verify takes token without keyword 'Bearer '
decoded=req.decoded
User.findOne({
_id: decoded._id
})

.then(async (user) => {
    console.log("friendThisUserId : "+req.body.friendThisUserId)
    if (user) {
        console.log("Inside if statement : "+req.body.friendThisUserId)
	console.log(user)        
	const mfl=await MyFriendList.findOne({ user:decoded._id })
        //console.log(mfl)
        await mfl.friends.push(req.body.friendThisUserId)
        await mfl.save()

        myfriendlist=user.MyFriends
        myfriendlist.push(req.body.friendThisUserId)
        user.MyFriends=myfriendlist
        const u=await user.save()
        console.log("After updating MyFriends array for user : "+u)


        //Create Notification in receiver's account
        const notificationData =new Notification ({
            content: user.email +" has added you as friend.",
            sentBy:user._id,
            sentTo:req.body.friendThisUserId,
            notificationType:"1"
        })
        console.log(notificationData)
            await notificationData.save()
            


        
    res.json({"message":"success"})
    } else {
    res.send('User does not exist')
    }
})
.catch(err => {
    res.send('error: ' + err)
})
})

users.post('/removeFriend',checkAuth, (req, res) => {
    
    decoded=req.decoded
    User.findOne({
    _id: decoded._id
    })
    
    .then(async (user) => {
        if (user) {
            // console.log(user)
            var mfl=await MyFriendList.findOne({ user:decoded._id })
            // console.log(mfl)
            var index= mfl.friends.indexOf(req.body.friendThisUserId)
            if(index>-1){
                await mfl.friends.splice(index,1)
            }
            await mfl.save()

            var myfriendlist=user.MyFriends
            index=myfriendlist.indexOf(req.body.friendThisUserId)
            console.log("index is :"+index)
            if(index>-1){
              
              myfriendlist.splice(index,1)
            }
            console.log("index is :"+index+"  user.MyFriends is :"+user.MyFriends)
            user.MyFriends=myfriendlist
            user.save()

            
        res.json({"message":"success"})
        } else {
        res.send('User does not exist')
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
    })

users.post('/like',checkAuth,async (req,res,next)=>{
  
  decoded=req.decoded
    try{
    const user=await User.findOne({
    _id: decoded._id
    })
    
    // console.log("like:user._id :"+user._id)
    // console.log("req.body.postId : "+req.body.postId)
    const post=await Post.findOne({_id:req.body.postId})
    // .populate('Likes createdBy Comments')
    .populate(
      [
        { path:'Likes' },
        { path:'createdBy'},
        {
          path:'Comments',
          populate:{
            path:'createdBy',
            select:'_id first_name profile_pic'
            // populate:'profile_pic'
          }
        }
      ]
    )
    .exec()
    // console.log("like:post_id :"+post._id)
    // console.log(post)

    

    listOfLikes=post.Likes
    console.log("listOfLikes "+listOfLikes)

    let alreadyLiked=0;
    let likedId=''
    let likeIndex=-1
    let req_like=null

    //testing
    // let zalreadyLiked=0;
    // let zlikedId=''
    // let zlikeIndex=-1
    // let zreq_like=null
    // listOfLikes.some((obj,index)=>{
    //   if(obj.createdBy == user._id){
        
    //     console.log("%qaz "+decoded._id+" "+obj.createdBy+" % "+user._id)
    //     likeIndex=index
    //     alreadyLiked=1
    //     likedId=obj._id
    //     req_like=obj
    //     return
    //   }
    //   return obj.createdBy == user._id
    // })
    
    

    for(var i=0;i<listOfLikes.length;i++){
      console.log("inside loop "+i)
      if(listOfLikes[i].createdBy.toString() == user._id.toString()){
        alreadyLiked=1;
        likedId=listOfLikes[i]._id
        likeIndex=i
        req_like=listOfLikes[i]
        break;
      }
    }
    

    // console.log('already like123 :'+alreadyLiked+" "+zalreadyLiked)
    // console.log('likeId like123 :'+likedId+" "+zlikedId)
    // console.log('like index like123 :'+likeIndex+" "+zlikeIndex)
    

    console.log("already liked :"+alreadyLiked)
    if(alreadyLiked===1){
      
      
      // const i=listOfLikes.indexOf(req_like)
      const i=likeIndex
      if(i>-1){
        listOfLikes.splice(i,1)
      }
      

      let li=listOfLikes.map(a=>a._id)
      
      // li=[]
      // console.log('inside here '+listOfLikes)
      // for(var k=0;k<listOfLikes.length;k++){
      //   li.push(listOfLikes[i]._id)
      //   console.log("arrmap :"+li[i]+"-"+zli[i])
      // }
      post.Likes=li
      
      let p=await post.save()

      const resultOfNotifDelete=await Notification.deleteOne({
        sentBy:decoded._id,
        sentTo:post.createdBy,
        notificationType:2,//like->2
        postId:post._id
      })
      
      res.json({status:'success',post:p})
    }
    else{
      
      const like=new Like({
        createdBy:user._id
      })
      const l=await like.save()
      await post.Likes.push(l._id)
      let p=await post.save()

      //create Notification
      const notificationData =new Notification ({
        content: decoded.email +" liked your post with caption ' "+post.caption+" '",
        sentBy:decoded._id,
        sentTo:post.createdBy,
        notificationType:2,
        postId:post._id
      })
      console.log(notificationData)
        await notificationData.save()

      
        res.json({status:'success',post:p})
    }



    // return res.send("like successful")
    }
    catch(err){
        return res.send(err)
    }
})

users.post('/deleteNotif',checkAuth,async(req,res,next)=>{
  const resultOfNotifDelete=await Notification.deleteOne({
    _id:req.body.notifId,
  })
  console.log("resultOfNotifDelete : "+resultOfNotifDelete)
  res.json({'status':'success'})
})

users.post('/changeProfilePic',checkAuth,async (req, res) => {
  
  decoded=req.decoded
  const user=await User.findOne({
    _id: decoded._id
  })
  
  if(user){
      try{
    const upload = multer({ storage }).single('image')
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      console.log('file uploaded to server')
      console.log(req.file)
  
      // SEND FILE TO CLOUDINARY
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: 'dn5lfusbo',
        api_key: '763614237956682',
        api_secret: 'qS4vG8wGgCbQrzbFaQSO8AH0qBk'
      })
      
      const path = req.file.path
      const uniqueFilename = req.file.filename+new Date().toISOString()
  
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        async function(err, image) {
          if (err) return res.send(err)
          console.log('file uploaded to Cloudinary')
          // remove file from server
          const fs = require('fs')
          fs.unlinkSync(path)
          // return image details
          console.log(image.url)
        //   res.json(image)
            
        try{
           
            
            // user.profile_pic=image.url
            user.profile_pic.push(image.url)
            await user.save()
                

                res.json({'status':'success','profile_image_url':user.profile_pic[user.profile_pic.length-1]})
            }
            catch(err){
                res.json({'error':err})
            }


        }
      )
    })
  


        }catch(err){
            res.send(err)
        }
    }
    else{
        return res.send('no user')
    }

    
})

users.post('/changeCoverPic',checkAuth,async (req, res) => {
  
  decoded=req.decoded
  const user=await User.findOne({
    _id: decoded._id
  })
  
  if(user){
      try{
    const upload = multer({ storage }).single('image')
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      console.log('file uploaded to server')
      console.log(req.file)
  
      // SEND FILE TO CLOUDINARY
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: 'dn5lfusbo',
        api_key: '763614237956682',
        api_secret: 'qS4vG8wGgCbQrzbFaQSO8AH0qBk'
      })
      
      const path = req.file.path
      const uniqueFilename = req.file.filename+new Date().toISOString()
  
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        async function(err, image) {
          if (err) return res.send(err)
          console.log('file uploaded to Cloudinary')
          // remove file from server
          const fs = require('fs')
          fs.unlinkSync(path)
          // return image details
          console.log(image.url)
        //   res.json(image)
            
        try{
           
            
            // user.cover_pic=image.url
            user.cover_pic.push(image.url)
            await user.save()
                

                res.json({'status':'success','cover_image_url':user.cover_pic[user.cover_pic.length-1]})
            }
            catch(err){
                res.json({'error':err})
            }


        }
      )
    })
  


        }catch(err){
            res.send(err)
        }
    }
    else{
        return res.send('no user')
    }

    
})

users.post('/updateProfile',checkAuth,async(req,res,next)=>{
  console.log(req.body.first_name+" --- "+req.body.last_name+" --- "+req.body.bio)
  const user=await User.findById(req.decoded._id)
  user.first_name=req.body.first_name
  user.last_name=req.body.last_name
  user.bio=req.body.bio
  const u=await user.save()
  
  res.json({'status':'success',user:u})
})


module.exports = users
