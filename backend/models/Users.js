const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile_pic:{
    type:String,
    default:'http://res.cloudinary.com/dn5lfusbo/image/upload/v1585307958/blog/twitter_final.png2020-03-27T11:19:17.740Z.png'
  },
  bio:{
    type:String,
    default:''
  },
  MyFriends:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'MyFriendList'
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('Users', UserSchema)