import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

import './style.css'

import api from '../../services/api'

export default function NewUsers(){
    const [endereco, setEndereco] = useState('');
    const [qtd_quartos, setQtd_quartos] = useState('');
    

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            endereco,
            qtd_quartos,
        }


        try {
            await api.post('predios', data);

            alert(`Novo prédio adicionado!`)
            history.push('/')

        } catch (error) {
            alert('Não foi possível salvar')
        }
    }

    function handleBack(){
        history.push('/')
    }

    return(
        <div className='new-user-container'>
            <header>
                <p>Gerenciamento de aluguel</p>
            </header>

            <div className='new-user-component' >
                <p>CADASTRO DE NOVOS PRÉDIOS</p>
            
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder='Endereço'
                        value={endereco} 
                        onChange={e => setEndereco(e.target.value)} 
                    />
                    <input 
                        placeholder='Quantidade de quartos' 
                        value={qtd_quartos} 
                        onChange={e => setQtd_quartos(e.target.value)} 
                    />

                    <div className='button-group'>
                        <button type='button' className='button' onClick={handleBack}>Cancelar</button>
                        <button type='submit'>Salvar</button>
                    </div>

                </form>  
                </div>
        </div>
    )
}