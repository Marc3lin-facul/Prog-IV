import { useNavigate, useLocation } from "react-router-dom";
import {useEffect} from "react";
import './Dashboard.css';
import Header from "./Header.jsx"

function Dashboard(){
    const navigate = useNavigate();
    const location = useLocation(); //Enviar dados de maneira segura
    const userCPF = location.state?.userCPF;
    const senhaUsuario = location.state?.userSenha;

    
    useEffect(() =>{
        if (!userCPF){
            navigate('/')
        }
    }, [userCPF, navigate])

    
    return(
        <div className = "login">
            <Header/>
            <main>
                <h1>Painel Principal (Dashboard)</h1>
                <h2>Seja bem-vindo {userCPF}, conectou com a senha: {senhaUsuario}</h2>
            </main>
            <footer>marcelo.faculdade06@gmail.com (2026)</footer>
        </div>
    )
}

export default Dashboard