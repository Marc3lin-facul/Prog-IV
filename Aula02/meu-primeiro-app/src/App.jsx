import { useState } from 'react'
import './App.css'
import logo from "./assets/logo.png"
import { useNavigate } from 'react-router-dom'

function App() {
  
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    if (!cpf || !senha){
      alert("Por favor, preencha todos os campos!")
      return
    }
    console.log("Dados enviados: ", {cpf, senha})
    navigate('/dashboard')
  }
  

  return (
    <>
      <div class = "login">
        <form className = "login" onSubmit = {handleLogin}>
          <img src={logo} alt="Logo do IFRJ campus Niteroi"/>
          <div class = "info">
              <p>Agora o acesso é feito com seu <strong>CPF + senha</strong></p>
          </div>
          <div class = "usuario">
              <input 
              type="number"
              placeholder= "CPF (só números)"
              value = {cpf}
              onChange = {(e) => setCpf(e.target.value)}/>

              <input 
              type="password"
              placeholder= "Senha"
              value = {senha}
              onChange = {(e) => setSenha(e.target.value)}/>
          </div>

          <button type="submit">Confirmar</button>
          <div class = "links">
              <a href="#">Esqueci a senha</a>
              <a href="#">Esqueci o E-mail Cadastrado</a>
              <a href="#">Primeiro acesso</a>
          </div>
        </form>
      </div>
      
    </>
  )
}

export default App
