/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

import './filme-info.css';

import api from '../../services/api';

function Filme(){

    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "1773ea91513f34d54e30530a838cf60e",
                    language: 'pt-BR',
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log('FILME NÃO ENCONTRADO!')
                navigate('/', {replace: true});
                return;
            })
        }

        loadFilme();

        return() => {
            console.log('COMPONENTE FOI DESMONTADO')
        }
    
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeflix');

        let filmesSalvos = JSON.parse(minhaLista)|| [];

        const possuiFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id);

        if(possuiFilme){
            toast.warn("Esse filme já está na lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!')
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average}</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='eternal'href={`https://youtube.com/results?search_query=${filme.title}`}>
                        Trailer
                    </a>
                </button>

            </div>
        </div>
    )
}

export default Filme;