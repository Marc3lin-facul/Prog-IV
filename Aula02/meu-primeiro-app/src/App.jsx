import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import logo from "./assets/logo.png"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class = "login">
        <img src={logo} alt="Logo do IFRJ campus Niteroi"/>
        <div class = "info">
            <p>Agora o acesso é feito com seu <strong>CPF + senha</strong></p>
        </div>
        <div class = "usuario">
            <input type="number" name="user" placeholder= "CPF (só números)"/>
            <input type="password" name="senha" placeholder= "Senha"/>
        </div>
        <button type="submit">Confirmar</button>
        <div class = "links">
            <a href="#">Esqueci a senha</a>
            <a href="#">Esqueci o E-mail Cadastrado</a>
            <a href="#">Primeiro acesso</a>
        </div>
    </div>
    </>
  )
}

export default App
