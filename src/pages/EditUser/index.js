import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'

import './style.css'

import api from '../../services/api'

export default function NewUsers(){

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [RG, setRG] = useState('');
    const [CPF, setCPF] = useState('');
    const [telefone_emprego, setTelEmprego] = useState('');
    const [vencimento_aluguel, setVencimento_aluguel] = useState('');
    const [numero_quarto, setNumeroQuarto] = useState('');
    const [tipo, setTipo] = useState('');

    const predioId = localStorage.getItem('predioId');
    const userID = localStorage.getItem('userID');

    const history = useHistory();

    useEffect(() => {
        api.get(`users/incidents/${userID}`, {
            headers: {
                Authorization : predioId,
            }
        }).then(response => {
            
            setNome(response.data.nome)
            setTelefone(response.data.telefone)
            setWhatsapp(response.data.whatsapp)
            setRG(response.data.RG)
            setCPF(response.data.CPF)
            setTelEmprego(response.data.telefone_emprego)
            setVencimento_aluguel(response.data.vencimento_aluguel)
            setNumeroQuarto(response.data.numero_quarto)
            setTipo(response.data.tipo)
        })
    }, [userID, predioId]);


    async function handleEditUser(e){
        e.preventDefault();

        const data = {
            nome,
            telefone,
            whatsapp,
            RG,
            CPF,
            telefone_emprego,
            vencimento_aluguel,
            numero_quarto,
            tipo
        }

        
        try {
            await api.put(`users/${userID}`, data, {
                headers: {
                    Authorization: predioId,
                }
            })
            alert(`${nome} teve seus dados editados.`)
            history.push('/users')

        } catch (error) {
            alert('Não foi possível salvar')
        }
    }

    function handleBack(){
        history.push('/users')
    }



    return(
        <div className='edit-user-container'>
            <header>
                <p>Gerenciamento de aluguel</p>
            </header>

            <div className='edit-user-component' >
                <p>EDITAR MORADORES</p>
            

                <form onSubmit={handleEditUser}>
                    <input 
                        placeholder='Nome'
                        value={nome} 
                        onChange={e => setNome(e.target.value)} 
                    />
                    <input 
                        placeholder='telefone' 
                        value={telefone} 
                        onChange={e => setTelefone(e.target.value)} 
                    />
                    <input 
                        placeholder='whatsapp' 
                        value={whatsapp} 
                        onChange={e => setWhatsapp(e.target.value)} 
                    />
                    <input 
                        placeholder='RG' 
                        value={RG} 
                        onChange={e => setRG(e.target.value)} 
                    />
                    <input 
                        placeholder='CPF'  
                        value={CPF} 
                        onChange={e => setCPF(e.target.value)} 
                    />
                    <input 
                        placeholder='Telefone empresa'  
                        value={telefone_emprego} 
                        onChange={e => setTelEmprego(e.target.value)} 
                    />
                    <input 
                        placeholder='Dia de vencimento'  
                        type='number'
                        value={vencimento_aluguel} 
                        onChange={e => setVencimento_aluguel(e.target.value)}
                    />
                    <input 
                        placeholder='Número Kitnet'  
                        type='number'
                        value={numero_quarto} 
                        onChange={e => setNumeroQuarto(e.target.value)} 
                    />
                    <input 
                        placeholder='Tipo'  
                        value={tipo} 
                        onChange={e => setTipo(e.target.value)} 
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