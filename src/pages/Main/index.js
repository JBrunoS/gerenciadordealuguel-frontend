import React, { useEffect, useState } from 'react'
import {FiArrowRight, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'


import  './style.css'

import api from '../../services/api'

export default function Main(){
    const [incidents, setIncidents] = useState([]);
    

    useEffect(() => {
        api.get('predios')
            .then(response => {
            setIncidents(response.data);
        })
    }, []);


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
                            <li key={incidents.id}>
                            <strong>{incidents.endereco}</strong>

                            <Link to='/users'  
                            onClick={
                                () => localStorage.setItem('predioId', incidents.id) }
                                /*() => localStorage.setItem('predioNome', incidents.endereco)**/ >Ver mais <FiArrowRight size='16px' color='#4267b2' /> </Link>
                        </li>
                        ))}
                    </ul>
                </div>
        </div>
    )
}