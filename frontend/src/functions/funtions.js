import axios from 'axios'

export const login = async(data)=> {

    const result=await axios
    .post('http://localhost:5000/users/login',{
      email:data.email,
      password:data.password
    })

    localStorage.setItem('usertoken',result.data.token)

    return result
  }

export const register = async(data)=> {
  try{
    const result=await axios
    .post('http://localhost:5000/users/register',{
      first_name:data.first_name,
      last_name:data.last_name,
      email:data.email,
      password:data.password
    })
    return result
  }
  catch(err){
    return -1
  }

    
}

export const currentUserFun=async()=>{
    const result=await axios.post('http://localhost:5000/users/currentUser',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        "Content-type": "multipart/form-data",
      }
    })
    return result
}


export const changeProfilePicFun=async(data)=>{
    const result=await axios.post("http://localhost:5000/users/changeProfilePic", data, 
    {
      headers: {
          "Authorization": "Bearer "+localStorage.usertoken,
          "Content-type": "multipart/form-data",
      },                    
    })
    return result
}

export const changeCoverPicFun=async(data)=>{
    const result=await axios.post("http://localhost:5000/users/changeCoverPic", data, 
    {
      headers: {
          "Authorization": "Bearer "+localStorage.usertoken,
          "Content-type": "multipart/form-data",
      },                    
    })
    return result
}

export const allpostsFun=async()=>{
    const result=await axios.post('http://localhost:5000/users/allposts',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        "Content-type": "multipart/form-data",
      }
    }
    )
    return result
}

export const myfriendsFun=async()=>{
    const result=await axios.post('http://localhost:5000/users/myfriends',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        "Content-type": "multipart/form-data",
      }
    }
    )
    return result
}

export const likeFun=async(bodyParameters)=>{
    const result=await axios.post('http://localhost:5000/users/like',bodyParameters,
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        'Content-Type': 'application/json',
      }
    }
    )
    return result
}



export const createPostFun=async(data)=>{
    const result=await axios.post("http://localhost:5000/users/createPost", data, 
    {
      headers: {
          "Authorization": "Bearer "+localStorage.usertoken,
          "Content-type": "multipart/form-data",
      },                    
    })
    return result
} 

export const myNotificationsFun=async(data)=>{
    const result=await axios.post('http://localhost:5000/users/myNotifications',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken
      }
    })
    
    return result
} 

export const deleteNotifFun=async(data)=>{
    const result=await axios.post('http://localhost:5000/users/deleteNotif',{
        notifId:data.notifId
      },
      {
        headers:{
          'authorization':'Bearer '+localStorage.usertoken
        }
      })
    return result
} 

export const allusersmyfriendsFun=async(data)=>{
    const result=await axios.post('http://localhost:5000/users/allusersmyfriends',{},
    {
    headers: {
        "Authorization": "Bearer "+localStorage.usertoken,
        "Content-type": "multipart/form-data",
    },                    
  })
    return result
} 

export const removeFriendFun=async(bodyParameters)=>{
    const result=await axios.post('http://localhost:5000/users/removeFriend',bodyParameters,
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        'Content-Type': 'application/json',
      }
    }
    )
    return result
} 

export const allusersFun=async()=>{
    const result=await axios.post('http://localhost:5000/users/allusers',{},
    {
    headers: {
        "Authorization": "Bearer "+localStorage.usertoken,
        "Content-type": "multipart/form-data",
    },                    
  })
    return result
} 

export const addFriendFun=async(bodyParameters)=>{
    const result=await axios.post('http://localhost:5000/users/addFriend',bodyParameters,
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        'Content-Type': 'application/json',
      }
    }
    )
    return result
} 