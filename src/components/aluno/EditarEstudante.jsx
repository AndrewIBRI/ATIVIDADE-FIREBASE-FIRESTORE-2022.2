import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import FirebaseContext from '../../utils/FirebaseContext'
import StudentService from '../../services/StudentService'

const PaginaEditarEstudante = () => {
    return (
        <FirebaseContext.Consumer>
            {value => <EditarEstudante firebase={value} />}
        </FirebaseContext.Consumer>
    )
}

const EditarEstudante = (props)=> {

    const [nome, setNome] = useState('')
    const [curso, setCurso] = useState('')
    const [ira, setIra] = useState(0.0)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(
        ()=>{
            StudentService.retrieve(
                props.firebase.getFirestoreDb(),
                (student)=>{
                    setNome(student.nome)
                    setCurso(student.curso)
                    setIra(student.ira)
                },
                params.id
            )
        }
        ,
        []
    )

    const handleSubmit = (event)=> {
        event.preventDefault()
        const studentUpdated = {nome,curso,ira}
        StudentService.update(
            props.firebase.getFirestoreDb(),
            (result)=>{
                navigate('/listarEstudante')
            },
            params.id,
            studentUpdated
        )
    }

    return (
        <div style={{marginTop:20}}>
            <h2>Editar Estudante</h2>
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
                    <label>IRA: </label>
                    <input 
                        type='number'
                        step='any'
                        className='form-control'
                        placeholder='Digite seu IRA'
                        value={ira ?? 0.0}
                        onChange={
                            (event)=>{
                                setIra(event.target.value)
                            }
                        }
                         />
                </div>
                <div className='form-group' style={{marginTop:15}}>
                    <input 
                        type='submit' 
                        value='Editar Estudante'
                        className='btn btn-primary' 
                        />
                </div>
            </form>
        </div>
    )
}

export default PaginaEditarEstudante