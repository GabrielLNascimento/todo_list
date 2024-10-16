import React, { Component } from 'react'

// form
// icone '+'
import { FaPlus } from 'react-icons/fa'

// Tarefas
import { FaEdit, FaWindowClose } from 'react-icons/fa'

import './Main.css'

export default class Main extends  Component {
  state = {
    NovaTarefa: "",
    tarefas: [],
    index: -1
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state
    let { NovaTarefa } = this.state
    NovaTarefa = NovaTarefa.trim()

    // indice -1 => nao existe
    if (tarefas.indexOf(NovaTarefa) != -1) return

    const novasTarefas = [...tarefas]

    if (index == -1) {
      this.setState({
        tarefas: [...novasTarefas, NovaTarefa],
        NovaTarefa: ''
      })
    } else {

      novasTarefas[index] = NovaTarefa

      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
        NovaTarefa: ''
      })
    }

  }

  handleChange = (e) => {
    this.setState({
      NovaTarefa: e.target.value
    })
  }

  handleEdit = (e, index) => {
    const { tarefas } = this.state
    this.setState({
      index,
      NovaTarefa: tarefas[index]
    })
  }

  handleDelete = (e, index) => {
    const { tarefas } = this.state
    const novasTarefas = [...tarefas]

    novasTarefas.splice(index, 1)

    this.setState({
      tarefas: [...novasTarefas]
    })
  }

  render() {
    const { NovaTarefa, tarefas } = this.state
    return (
      <div className='main'>
        <h1>Lista de tarefas</h1>

        <form action='#' className='form' onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type='text'
            value = {NovaTarefa}
          />
          <button type='submit'>
            <FaPlus />
          </button>
        </form>

        <ul className='tarefas'>
          {tarefas.map((tarefa, index) => (
            <li key={tarefa}>
              {tarefa}
              <span>
                <FaEdit
                  className='edit'
                  onClick={(e) => this.handleEdit(e, index)}
                />
                <FaWindowClose
                  className='delete'
                  onClick={(e) => this.handleDelete(e, index)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
