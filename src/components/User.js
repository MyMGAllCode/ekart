import React, {useState, useEffect} from 'react';
import './users.css'
import axios  from 'axios';
import RegisterUser  from './RegisterUser';
const Users = () => {
const [users, setUsers] = useState([]);
const [user, setUser] = useState({});
const [isRegister, setRegister] = useState(false);
useEffect(()=>{
    console.log('useEffect called');
    allUsers();
},[]);

const allUsers = () =>{
    setRegister(false);
    fetch('https://jsonplaceholder.typicode.com/users').then(res=>res.json()).then(data=>{
        console.log('data',data);
        setUser({});
        setUsers(data);

    }).catch(err=>{
        console.log('Error in users Api');
    })
}

const userHandler = (id) => {
    setRegister(false);
    console.log('Fectching User for Id',id);
    axios.get('https://jsonplaceholder.typicode.com/users/'+id).then(data=>{
        console.log('Data',data.data);
        setUser(data.data);
    })
}

console.log('Data rendering');
console.log('User',user);

    return (<div> 

        <h1>Welcome </h1>
        <button onClick={allUsers}>Show Users</button>
        <button onClick={()=>setRegister(true)}>Register User</button>
    {!isRegister? 
    <div>
       {Object.keys(user).length==0&&   <table style={{borderCollapse: 'collapse'}}>
           <tr><th>Id</th> <th>Name</th><th>Email</th><th>phone</th></tr> 
           {users.map(u=><tr onClick={()=>userHandler(u.id)} ><td>{u.id}</td><td >{u.name}</td><td>{u.email}</td><td>{u.phone}</td></tr>)}
        </table>
    }
    {
        Object.keys(user).length!=0 && <div>
            <label>Name:</label>{user.name}<br/>
            <label>Id:</label>{user.id}<br/>
            <label>Email:</label>{user.email}<br/>
        </div>
    }
    </div> 
    :<RegisterUser/>
    }
    </div>);

}

export default Users;