import React, { useEffect, useState }from 'react'
import {FiTrash2, FiArrowLeft, FiEdit} from 'react-icons/fi'
import { useHistory, Link } from 'react-router-dom'

import './style.css'

import api from '../../services/api'

export default function Users() {
    const [incidents, setIncidents] = useState([]);
    
    const history = useHistory();
    const predioId = localStorage.getItem('predioId')
    

    useEffect(() => {
        api.get('users', {
            headers: {
                Authorization : predioId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [predioId]);
    
    function goBack(){
        history.push('/');
    }

    async function handleDelete(id){
        try {
            await api.delete(`users/${id}`, {
                headers: {
                    Authorization: predioId,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert('Falha ao excluir o registro');
        }
    }
    
    
    return(
        <div className='user-container'>
            <header>
                <p>Gerenciamento de aluguel</p>
            </header>
            
                <div className='user-component' >
                    <div>
                        <button type='button' onClick={goBack} className='button'><FiArrowLeft size='16px' color='#FFF' />Voltar</button>
                        <p>USUÁRIOS</p>
                        <Link to='/new/user' className='button'>Novo</Link>
                    </div>
                    
                        {incidents.map(incidents => (
                            
                            <div className='user-details' key={incidents.id}>
                            <span>{incidents.nome}</span>
                            <span>Kitnet {incidents.numero_quarto}</span>
                            <span>Venc: {incidents.vencimento_aluguel}</span>
                            <Link to='/edit/users' ><FiEdit size='24px' color='orange' onClick={() => localStorage.setItem('userID', incidents.id)} /></Link>
                            <Link to='/users'><FiTrash2 size='24px' color='red' onClick={() => handleDelete(incidents.id)}/></Link>
                            </div>
                        ))}

                    

                    
                    
                    
                </div>
        </div>
    )
}