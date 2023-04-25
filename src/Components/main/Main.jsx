import React, { useEffect, useState } from 'react';
import './Main.css';
import service from '../../service';
import searchIco from '../../assets/search.svg';

import { Loading } from '../Loading/Loading';

export const Main = (props) => {

    const [response, setResponse] = useState([]);
    const [message, setMessage] = useState('');
    const [geos, setGeos] = useState({});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = service();

    const userClick = (e) => {
        e.preventDefault();
        setLoading(true);
        request.getData(message)
            .then(success)
            .catch(onError);
    }

    const success = (res) => {
        setResponse(res.data);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const spinner = loading ? <Loading /> : null;
    const errorMessage = error ? <h1>Что-то пошло не так</h1> : null;
    const content = !(loading && error);
    return (
        <>
            <h1 className='results-title'>Результаты поиска:</h1>
            <div className="wrapper">
                <div className="results">
                    <div className="inner">
                        {spinner}
                        {response.map((el, i) => {
                            if (el.result_type != 'geos') {
                                return (
                                    <div className="cart" key={i}>
                                        <img className='img' src={el.result_object.photo.images.original.url || ''} alt="" />
                                        <h3 className='title'>{el.result_object.name}</h3>
                                        <span className="subtitle">{el.result_object.address}</span>
                                    </div>
                                )
                            }
                        })}
                        {errorMessage}
                    </div>
                </div>
                <div className="search-wrapper">
                    <form className='form' onSubmit={(e) => userClick(e)}>
                        <input className="input" type="text" placeholder='название города' onChange={(e) => setMessage(e.target.value)} />
                        <img src={searchIco} alt="" />
                    </form>
                    <div className="request">
                        <div className="request__item">
                            <span className="request__item-key">место поиска:</span>
                            <span className="request__item-value">{geos.name}</span>
                        </div>
                        <div className="request__item">
                            <span className="request__item-key">колличество ответов:</span>
                            <span className="request__item-value">30</span>
                        </div>
                        <div className="request__item">
                            <span className="request__item-key">сортировка по:</span>
                            <span className="request__item-value">актуальности</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
