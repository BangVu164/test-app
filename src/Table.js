import React from "react";
import './App.css';

const Table =({data,deleteData, onEdit}) =>{
    return (
        <table className="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Create Time</th>
                <th>Name</th>
                <th>Avatar Link</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item)=>
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.name}</td>
                    <td>{item.avatar_link}</td>
                    <td>
                        <button onClick={()=>onEdit(item)}>Edit</button>
                        <button onClick={()=>deleteData(item.id) }>Delete</button>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}
export default Table;