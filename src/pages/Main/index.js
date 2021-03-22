import React, { useEffect, useState } from 'react'
import {FiArrowRight, FiPlus } from 'react-icons/fi'
import { useHistory, Link } from 'react-router-dom'


import  './style.css'

import api from '../../services/api'

export default function Main(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('predios')
            .then(response => {
            setIncidents(response.data);
        })
    }, []);

    function goToUsers(id){
        localStorage.setItem('predioId', id)
        history.push('/users')
    }
    return(
        <div className='container'>
            <header>
                <p>Gerenciamento de aluguel</p>
            </header>
            
                <div className='component' >
                    <div>
                        <p>PRÉDIOS</p>
                        <button type='button'><Link to='/register/predios' >Adicionar</Link><FiPlus size='16px' color='#FFF' /></button>
                        
                    </div>
                    
                    <ul>
                        {incidents.map(incidents =>(
                            <li key={incidents.id} onClick={() => goToUsers(incidents.id)}>
                            <strong>{incidents.endereco}</strong>

                            <Link to='/users'>
                                Ver mais 
                                <FiArrowRight size='16px' color='#4267b2' /> 
                            </Link>
                        </li>
                        ))}
                    </ul>
                </div>
        </div>
    )
}