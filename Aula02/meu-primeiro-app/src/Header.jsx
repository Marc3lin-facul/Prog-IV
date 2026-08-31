import { useNavigate, useLocation} from "react-router-dom";

function Header(){

    const navigate = useNavigate();
    const location = useLocation();
    const userCPF = location.state?.userCPF
    const handleLogout = () => {
        //Retorna de volta para a tela de login
        navigate('/')
    }
    return(
        <>
            <header>
                <img src="#" alt="Logo" />
                <img src="#" alt="Usuario" />
                <p>{userCPF}</p>
                <nav>
                    <ul>
                        <li>Configurações</li>
                        <li><button className="btn-header" onClick= {handleLogout}>Sair / Voltar ao Login</button></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;