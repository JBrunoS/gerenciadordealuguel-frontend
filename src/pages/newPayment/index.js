import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

import './style.css'

export default function NewPayment() {
    const [valor, setValor] = useState('')
    const [date, setData] = useState('')

    
    const userName = localStorage.getItem('userName')
    const userQuarto = localStorage.getItem('userQuarto')
    const predioId = localStorage.getItem('predioId')
    const userId = localStorage.getItem('userID')
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();

        const dia = date.substring(8, 10);
        const mes = date.substring(5, 7);
        const ano = date.substring(0, 4);
        
        const data = {
            dia, 
            mes,
            ano, 
            valor
        }

        try {
            await api.post(`/payment/${userId}`, data, {
                headers: {
                    Authorization: predioId
                }
            }).then(response => {
                if(response.status === 204){
                    history.goBack();
                }
            })
        } catch (error) {
            alert("Já existe um aluguel cadastrado nesse mês e ano")
        }
    }

    function goBack(){
        history.goBack();
    }


    return(
        <div className='new-payment-container'>
            <header>
                <p>Gerenciamento de Aluguel - Pagamentos</p>
            </header>

            <div className='new-payment-component'>
                <div>
                    <span>Nome: {userName} </span>
                    <span>Quarto: {userQuarto} </span>
                </div>
                <form onSubmit={handleSubmit} >
                    <label>Valor:</label>
                    <input 
                        required
                        type='number' 
                        min='370' 
                        max='1100' 
                        placeholder='R$ 100,00'
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                    />

                    <label>Data:</label>
                    <input 
                        required
                        type='date' 
                        min='2021-01-01'
                        value={date}
                        onChange={e => setData(e.target.value)}
                    />

                    <div>
                        <button type='button' onClick={goBack} >Cancelar</button>
                        <button type='submit'>Salvar</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}