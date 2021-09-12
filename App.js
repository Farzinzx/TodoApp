import React from "react"

import 'bootstrap/dist/css/bootstrap.css'

//import Component
import Header from "./Component/Header";
import InputData from "./Component/InputData";
import TodoList from "./Component/TodoList";
import Todo from "./Component/Todo";

class App extends React.Component{

    state = {
        todos :[],
        statusDone : false
    }



    addTodo(text){
        this.setState(prevState => {
            return{
                todos: [...prevState.todos ,
                    {key : Date.now() , done : false , text , date : ''}
                    ]
            }
        })
    }

    deleteTodo = (key) => {
        this.setState(prevState =>{
            return{
                todos:prevState.todos.filter(item => item.key !== key)
            }
        })

    }

    editTodo = (key , text ) =>{
        let {todos} = this.state

        let item = todos.find(item => item.key === key)
        item.text = text

        let newTodos = todos.filter(item => item.key !== key)

        this.setState({
            todos:[
                ...newTodos,
                item
            ]
        })

    }

    toggleBtn = (key) => {
        let  {todos} = this.state

        let item = todos.find(item => item.key === key)
        item.done =! item.done

        let newTodos = todos.filter(item => item.key !== key)
        this.setState({
            todos : [
                ...newTodos,
                item
            ]
        })
    }

    dataTodo(date){

        let NewTodos = this.state.todos.filter(item => item.date === date)
        NewTodos.date = date

        this.setState(prevState=> {
            return{
                todos : [
                    ...prevState.todos,
                    NewTodos

                ]
            }
            }
        )
    }


    render(){
        let {todos , statusDone} = this.state

        let filterList = todos.filter(item => item.done === statusDone)
        return(
           <div className='app'>
               <Header/>
               <InputData
                   add ={this.addTodo.bind(this)}
                   dateTodo ={this.dataTodo.bind(this)}
               />
               <div className="todosList">
                   <div className="container">
                       <div className="d-flex flex-column align-items-center ">
                           <nav className="col-6 mb-3">
                               <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                   <a className={`"nav-item nav-link active font-weight-bold" ${!statusDone ? 'active' : ''}`} id="nav-home-tab" onClick={()=>this.setState({statusDone : false})}>undone <span className="badge text-black badge-secondary">{todos.filter(item => item.done===false).length}</span></a>
                                   <a className={`"nav-item nav-link font-weight-bold" ${ statusDone ? 'active' : ''}`} id="nav-profile-tab" onClick={()=>this.setState({statusDone : true})}>done <span className="badge text-black badge-success">{todos.filter(item => item.done===true).length}</span></a>
                                   <a className='font-weight-bold nav-item nav-link '  >Date</a>
                               </div>
                           </nav>
                           {
                               filterList == 0
                                   ? <p>There isn`t any todos</p>
                                   : filterList.map(item => <Todo
                                       key = {item.key}
                                       item = {item}
                                       deleteTodo = {this.deleteTodo}
                                       toggleBtn = {this.toggleBtn}
                                       editBtn = {this.editTodo}
                                   />)
                           }
                       </div>

                   </div>
               </div>
           </div>
        )
    }
}

export  default  App