import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate()
    const handleLogout = () => {
        //Retorna de volta para a tela de login
        navigate('/')
    }

    return(
        <div>
            <h1>Painel Principal {Dashboard}</h1>

            <button onClick= {handleLogout}>
                Sair / Voltar ao Login
            </button>
        </div>
    )
}

export default Dashboard