import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import FirebaseContext from '../../utils/FirebaseContext'
import StudentService from '../../services/StudentService'

const PaginaListarEstudante = () => {
    return (
        <FirebaseContext.Consumer>
            {value => <ListarEstudante firebase={value} />}
        </FirebaseContext.Consumer>
    )
}

const ListarEstudante = (props) => {

    const [students, setStudents] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(
        () => {
            StudentService.list_on_snapshot(
                props.firebase.getFirestoreDb(),
                (students) => {
                    setStudents(students)
                }
            )
        }
        ,
        []
    )

    function deleteStudent(id) {
        if (window.confirm('Deseja excluir?')) {
            StudentService.delete(
                props.firebase.getFirestoreDb(),
                ()=>{
                   let studentsTemp = students
                   for(let i=0;i<studentsTemp.length;i++){
                        if(studentsTemp[i].id===id){
                            studentsTemp.splice(i,1)
                            break
                        }
                   }
                   setStudents(studentsTemp)
                   setReload(!reload)
                },
                id
            )
        }
    }
    const generateTableBody = () => {
        return students.map(
            (element, index) => {
                element.key = index
                return (
                    <tr>
                        <td>{element.id}</td>
                        <td>{element.nome}</td>
                        <td>{element.curso}</td>
                        <td>{element.ira}</td>
                        <td>
                            <Link to={'/editarEstudante/' + element.id} className='btn btn-primary'>
                                Editar
                            </Link>
                        </td>
                        <td>
                            <button className='btn btn-danger' onClick={() => deleteStudent(element.id)}>
                                Apagar
                            </button>
                        </td>
                    </tr>
                )
            }
        )
    }

    return (
        <div>
            <h1>Listar Estudante</h1>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>IRA</th>
                        <th colSpan={2}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {generateTableBody()}
                </tbody>
            </table>
        </div>
    )
}

export default PaginaListarEstudante