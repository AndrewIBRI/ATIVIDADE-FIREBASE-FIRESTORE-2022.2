import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FirebaseContext from '../../utils/FirebaseContext'
import TeacherService from "../../services/TeacherService"

const PaginaCriarProfessor = () => {
    return (
        <FirebaseContext.Consumer>
            {value => <CriarProfessor firebase={value} />}
        </FirebaseContext.Consumer>
    )
}
const CriarProfessor = (props) => {

    const [nome, setNome] = useState('')
    const [curso, setCurso] = useState('')
    const [salario, setSalario] = useState(0.0)
    const navigate = useNavigate()

    const handleSubmit = (event)=> {
        event.preventDefault()
        const newTeacher = {nome,curso,salario}
        TeacherService.add(
            props.firebase.getFirestoreDb(),
            (id)=>{
                alert(`Professor ${id} adicionado!`)
                navigate('/listarProfessor')
            },
            newTeacher
        )
    }
    return (
        <div style={{marginTop:20}}>
            <h2>Criar Professor</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nome: </label>
                    <input 
                        type='text'
                        className='form-control'
                        placeholder='Digite seu nome'
                        onChange={
                            (event)=>{
                                setNome(event.target.value)
                            }
                        }
                    />
                </div>
                <div className='form-group'>
                    <label>Curso: </label>
                    <input 
                        type='text'
                        className='form-control'
                        placeholder='Digite seu curso'
                        onChange={
                            (event)=>{
                                setCurso(event.target.value)
                            }
                        }
                    />
                </div>
                <div className='form-group'>
                    <label>Salario: </label>
                    <input 
                        type='number'
                        step='any'
                        className='form-control'
                        placeholder='Digite seu Salario'
                        onChange={
                            (event)=>{
                                setSalario(event.target.value)
                            }
                        }
                         />
                </div>
                <div className='form-group' style={{marginTop:15}}>
                    <input 
                        type='submit' 
                        value='Criar Professor'
                        className='btn btn-primary' 
                        />
                </div>
            </form>
        </div>
    )
}

export default PaginaCriarProfessor