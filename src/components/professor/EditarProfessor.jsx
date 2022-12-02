import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import FirebaseContext from '../../utils/FirebaseContext'
import TeacherService from "../../services/TeacherService"

const EditTeacherPage = () => {
    return (
        <FirebaseContext.Consumer>
            {value => <EditTeacher firebase={value} />}
        </FirebaseContext.Consumer>
    )
}
const EditTeacher = (props)=> {

    const [nome, setNome] = useState('')
    const [curso, setCurso] = useState('')
    const [salario, setSalario] = useState(0.0)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(
        ()=>{
          TeacherService.retrieve(
                props.firebase.getFirestoreDb(),
                (teacher)=>{
                    setNome(teacher.nome)
                    setCurso(teacher.curso)
                    setSalario(teacher.salario)
                },
                params.id
            )
        }
        ,
        []
    )
    const handleSubmit = (event)=> {
        event.preventDefault()
        const teacherUpdated = {nome,curso,salario}
        TeacherService.update(
            props.firebase.getFirestoreDb(),
            (result)=>{
                navigate('/listarProfessor')
            },
            params.id,
            teacherUpdated
        )
    }
    return (
        <div style={{marginTop:20}}>
            <h2>Editar Professor</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nome: </label>
                    <input 
                        type='text'
                        className='form-control'
                        placeholder='Digite seu nome'
                        value={(nome === null || nome === undefined)?'':nome}
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
                        value={curso ?? ''}
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
                        value={salario ?? 0.0}
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
                        value='Editar Professor'
                        className='btn btn-primary' 
                        />
                </div>
            </form>
        </div>
    )
}

export default EditTeacherPage