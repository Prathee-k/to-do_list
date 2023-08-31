import React, { useEffect, useState } from 'react'
import './TodoList.css'
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";

import  {FiEdit}from "react-icons/fi";

import  {TiDelete}from "react-icons/ti";
import li from './images/list.jpg'
 const TodoList = () => {
    let getlocalItems = () => {
        let list = localStorage.getItem("list")
        if (list) {
            return JSON.parse(localStorage.getItem('list'))
        } else {
            return []
        }
    }
    let [text, setText] = useState()
    let [list, setList] = useState(getlocalItems)
    let [toggle, setToggle] = useState(true)
    let [isedit, setisEdit] = useState(null)
    // console.log(text);


    let add = (e) => {
        e.preventDefault()
        if (!text) {
        alert("please fill the required field")   
        }
        else if (text && !toggle) {
            setList(list.map((ele) => {
                if (ele.id == isedit) {
                    return { ...ele, name: text }
                }
                return ele
            }))
            setText("")
        setisEdit(null)
        setToggle(true)
        }
        else {
            let input = { id: new Date().getTime().toString(), name: text }
            // console.log(input);
            setList([...list, input])
            setText("")
        }

        
    }

    let del = (ind) => {
        let dl = list.filter((ele) => ind != ele.id)
        setList(dl)

    }

    let clear = () => {
        setList([])

    }
    let edit = (id) => {
        let newitem = list.find((ele) => {
            return ele.id == id
        })
        // console.log(newitem);
        setToggle(false)
        setText(newitem.name)
        setisEdit(id)
    }

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(list))
    }, [list])
    return (
        <div className='App'>
<section>

            <div className="header">
                <div className="logo">
                <img height="50px" width="50px" src={li} alt="" />

                </div>
                <div className="title">
                <h1> To-do List</h1>

                </div>
            </div>
            <p>It's a long road from conception to completion!</p>
            <div className="part-1">
                <figure>
                    <img src="" alt="" />
                </figure>
                <div className="item">
                    <form onSubmit={add}>
                       <input className='inp' type="text" placeholder='add the task....' value={text} onChange={(e) => setText(e.target.value)} />
                    
                    {toggle ? <AiOutlinePlus className='plus' onClick={add} title='Add item' /> :
                        <FiEdit className='edit' onClick={add} />
                    }
                    </form>
                    </div>
                    <div className="display">
                        {list.map((ele) => (
                            <div className='items'  key={ele.id}>
                            <div>    <h3 className='listname'>{ele.name}</h3></div>
                               <div className='btn' >
                               <FiEdit className='edit' onClick={() => edit(ele.id)}  title='Edit item'/>

                              <TiDelete className='del' onClick={() => del(ele.id)} title='Delete item'/>   
                                </div> 

                            </div>

                        ))}
                        {list.length>1?( <button onClick={clear} className='ck'><BsTrashFill className='bin'/>Remove All</button>):(<div></div>)}

                    </div>
                </div>
                </section>

            </div>

    )
}

export default TodoList