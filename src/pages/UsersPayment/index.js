import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {FiArrowLeft, FiCheck, FiDollarSign, FiEdit, FiTrash2} from 'react-icons/fi'

import './style.css'

import api from '../../services/api'



export default function Payment(){
    const [incidents, setIncidents] = useState([])
    const [meses, setMeses] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());


    const history = useHistory();
    const predioId = localStorage.getItem('predioId')
    const userId = localStorage.getItem('userID')

    useEffect(() => {
        api.get(`users/incidents/${userId}`, {
            headers: {
                Authorization : predioId,
            }
        }).then(response => {
            setIncidents(response.data)
        })

    }, [userId, predioId])

    useEffect(() => {
        if (year === '') {
            return
        }else{
            try {
            
                api.get(`payment/${userId}/${year}`, {
                     headers: {
                         Authorization: predioId,
                     }
                 }).then(response => {
                     setMeses(response.data);
                 })
             } catch (error) {
                 alert(error)
             }
        }
        
    }, [year, userId, predioId])


    async function handleDelete(){
        
        try {
            await api.delete(`users/${userId}`, {
                headers: {
                    Authorization: predioId,
                }
            })
            alert("Excluído com sucesso")
            history.go('/users')
        } catch (error) {
            alert('Falha ao excluir o registro');
        }
    }

    function handleBack(){
        history.push('/users')
    }

    return(
        <div className='user-container'>
            <header>
                <p>Gerenciamento de Aluguel - Pagamentos</p>
            </header>

            <div className='user-component'>
                <div>
                    <button className='button' onClick={handleBack}><FiArrowLeft size='24px' color='FFF' /></button>
                    <Link to='/new/payment'>
                        <FiDollarSign size='25px' color='green'/>
                    </Link>
                    <Link to='/edit/users'>
                        <FiEdit 
                            size='24px' 
                            color='orange' 
                        />
                    </Link>
                    <Link to='/users'>
                        <FiTrash2 
                            size='24px' 
                            color='red' 
                            onClick={() => handleDelete()}
                        />
                    </Link> 
                </div>
                <div>
                    <p>Nome: <strong>{incidents.nome}</strong></p>
                    <p>Telefone: <a href={`tel:${incidents.telefone}`}>{incidents.telefone}</a></p>
                </div>
                <div>
                    <p>Nº quarto: {incidents.numero_quarto}</p>
                    <p>Vencimento: {incidents.vencimento_aluguel}</p>
                    
                </div>

                
                    <div  className='date-picker'>
                        <select
                            value={year}
                            onChange={e => setYear(e.target.value)}
                        >
                            <option>Selecione o ano</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                        </select>
                    </div>
                
                    <div className='main'>
                            { meses.map(meses => (
                                <div key={meses.id}>
                                    <p>{(() =>{
                                        switch (meses.mes) {
                                            case 1:
                                                return 'Janeiro'
                                            case 2:
                                                return 'Fevereiro'
                                            case 3:
                                                return 'Março'
                                            case 4:
                                                return 'Abril'
                                            case 5:
                                                return 'Maio'
                                            case 6:
                                                return 'Junho'
                                            case 7:
                                                return 'Julho'
                                            case 8:
                                                return 'Agosto'
                                            case 9:
                                                return 'Setembro'
                                            case 10:
                                                return 'Outubro'
                                            case 11:
                                                return 'Novembro'
                                            case 12:
                                                return 'Dezembro'
                                        
                                            default:
                                                break;
                                        }
                                    })(meses.mes)}<FiCheck size='20px' color='#FFF'  style={{ marginLeft: '20px' }}/></p>
                                </div>
                            ))
                            }
                    </div>
            </div>
        </div>
    )
}