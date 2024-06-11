import './App.css';
import React, {useEffect} from "react";
import { useState } from 'react';
import Table from './Table';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue]  = useState('');
  const [passwordValue, setPasswordValue]  = useState('');
  const [showInput, setShowInput] = useState(false);


  //data
  const [data, setData] = useState([]);

  // new Data
  const [newData, setNewData] = useState({id:'', createdAt: '', name: '', avatar_link:''});

  useEffect(() => {
    fetchData();
  }, []);

  //GET
  const fetchData= ()=>{
    axios.get(`https://6667b394f53957909ff4fe14.mockapi.io/sonlh`)
        .then(res => {
          setData(res.data);
        })
        .catch(error => console.log(error));
  };

  // xử lí khi thêm dữ liệu mới
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setNewData({...newData,[name]: value})
  }
  //xử lý khi submit từ form
  const handleSubmit1 = (e) =>{
    e.preventDefault();
    if(newData.id){
      axios.put(`https://6667b394f53957909ff4fe14.mockapi.io/sonlh/${newData.id}`,newData)
          .then(() =>{
            fetchData();
          })
          .catch(error => console.log(error));
    }
    else {
      axios.post('https://6667b394f53957909ff4fe14.mockapi.io/sonlh',newData)
          .then(() =>{
            fetchData();
          })
          .catch(error => console.log(error));
    }
    //reset form
    setNewData({id:'', createdAt: '', name: '', avatar_link:''});
  };
  const handleInputValue = (events) => {
    setInputValue(events.target.value)};
  const handlePasswordValue = (events) => {
    setPasswordValue(events.target.value)};
  //delete Data
  const deleteData = (id) =>{
    axios.delete(`https://6667b394f53957909ff4fe14.mockapi.io/sonlh/${id}`)
    .then(()=>{
      fetchData();
    })
        .catch(error => console.log(error));
  }
  //edit Data
  const editData = (item) =>{
    const {id,name,avatar_link} = item ;
    setNewData({id,createdAt: item["createdAt"],name,avatar_link})
  }

  const handleSubmit = (events) => {
    events.preventDefault();
    setShowInput(true);
    console.log('Input Value', inputValue);
    console.log('Input Value', passwordValue);

  }

  return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
                type='text'
                value={inputValue}
                onChange={handleInputValue}
            />
          </label>
          <label>
            Password:
            <input
                type='password'
                value={passwordValue}
                onChange={handlePasswordValue}
            />
          </label>
          <button type={'submit'}>Button</button>
        </form>
        {/*hiển thị thông tin vừa nhập*/}
        {showInput && (
            <>
              <p>Username: {inputValue} </p>
              <p>Password: {passwordValue}</p>
            </>
        )}

        <div>
        <h1>Information Table</h1>
        <Table data={data} deleteData={deleteData} onEdit={editData}/>
        </div>
  {/* Them form nhap du lieu*/}
        <h2>{newData.id ? 'Edit Data' : 'Add New Data'}</h2>
        <form onSubmit={handleSubmit1}>
          <div>
            <label>
              Name:
              <input
                  type="text"
                  name="name"
                  value={newData.name}
                  onChange={handleChange}
                  required
              />
            </label>
          </div>
          <div>
            <label>
              Avatar Link:
              <input
                  type="text"
                  name="avatar_link"
                  value={newData.avatar_link}
                  onChange={handleChange}
                  required
              />
            </label>
          </div>
          <button type="submit">{newData.id ? 'Update' : 'Add'}</button>
        </form>

      </div>
  );
}

export default App;
