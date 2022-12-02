import { Routes, Route } from "react-router-dom"

import Home from '../Home';

import CriarEstudante from '../aluno/CriarEstudante';
import EditarEstudante from '../aluno/EditarEstudante';
import ListarEstudante from '../aluno/ListarEstudantes';

import CriarProfessor from '../professor/CriarProfessor'
import EditarProfessor from '../professor/EditarProfessor'
import ListarProfessor from '../professor/ListarProfessor'

const CRUDRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            
            <Route path='criarEstudante' element={<CriarEstudante />} />
            <Route path='listarEstudante' element={<ListarEstudante />} />
            <Route path='editarEstudante/:id' element={<EditarEstudante />} />

            <Route path='criarProfessor' element={<CriarProfessor />} />
            <Route path='listarProfessor' element={<ListarProfessor />} />
            <Route path='editarProfessor/:id' element={<EditarProfessor />} />
        </Routes>
    )
}

export default CRUDRoutes