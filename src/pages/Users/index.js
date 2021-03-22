import React, { useEffect, useState }from 'react'
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi'
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

    function goToPayment(id, name, room){
        localStorage.setItem('userID', id)
        localStorage.setItem('userName', name)
        localStorage.setItem('userQuarto', room)
        history.push('/payment')
    }
    
    
    return(
        <div className='user-container'>
            <header>
                <p>Gerenciamento de aluguel</p>
            </header>
            
                <div className='user-component' >
                    <div>
                        <button 
                            type='button' 
                            onClick={goBack} className='button'
                        >
                            <FiArrowLeft size='16px' color='#FFF' />
                            Voltar
                        </button>
                        <p>USUÁRIOS</p>
                        <Link to='/new/user' className='button'>Novo</Link>
                    </div>
                    
                        {incidents.map(incident => (
                            
                            <div className='user-details' key={incident.id} onClick={() => goToPayment(incident.id, incident.nome, incident.numero_quarto)}>
                                <span>{incident.nome}</span>
                                <span>Kitnet {incident.numero_quarto}</span>
                                <span>Venc: {incident.vencimento_aluguel}</span>
                            {/*   
                                <Link to='/payment' ><FiDollarSign size='24px' color='green' onClick={() => localStorage.setItem('userID', incidents.id)} /></Link>
                                <Link to='/edit/users' ><FiEdit size='24px' color='orange' onClick={() => localStorage.setItem('userID', incidents.id)} /></Link>
                                <Link to='/users'><FiTrash2 size='24px' color='red' onClick={() => handleDelete(incidents.id)}/></Link> 
                            */}
                                <Link to='/payment'><FiArrowRight size='24px' color='blue' /></Link>
                            </div>
                        ))}
                    
                </div>
        </div>
    )
}