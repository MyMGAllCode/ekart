import React, {useState, useEffect} from "react";
import axios from "axios";

const RegisterUser = () =>{
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState(0);
    const [registered, setRegistered] = useState(false);
    const [registeredUser, setRegisteredUser] = useState({});
    const postUser = () => {
        let post = {
            title:title,
            body:body,
            userId:userId
        }
        console.log(post);

axios.post('https://jsonplaceholder.typicode.com/posts',post).then(function (response) {
    console.log(response);
    setRegisteredUser(response.data);
    setRegistered(true);

  })
  .catch(function (error) {
    setRegistered(true)
    console.log(error);
  });

    }

    return(
        <div>
        {!registered?<div>
        <h3>User Registration</h3>
        <hr/>
        <label>User Title:</label><input onKeyUp={(e)=>setTitle(e.target.value)} type='text'/><br/>
        <label>User body:</label><input onKeyUp={(e)=>setBody(e.target.value)} type='text'/><br/>
        <label>UserId:</label><input  onKeyUp={(e)=>setUserId(parseInt(e.target.value))} type='number'/><br/>
        <button onClick={postUser}>Register</button>
        </div>
        :<div>
           <h1>User Registed with Id:{registeredUser.id}</h1> 
        </div>
        }
        </div>
    );
}
export default RegisterUser;