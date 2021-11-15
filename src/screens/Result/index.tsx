import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from 'react-router-dom';

import './styles.scss';

const Result = () => {

    let { id } = useParams();
    let [ title, setTitle ] = useState<string | null>(null)

    useEffect(() => {
        axios.get(`http://45.84.0.9:89/tests/${id}`).then((result) => {
            setTitle(result.data.name)
        });

    }, [id])

    return (
        <div className="screen result">
            <h1 className="screen__title">Results</h1>
            {title ? <span className="screen__subtitle">{title}</span> : null}
            <div className="screen__content">
                <div className="screen__back">
                    <Link to={`/`}><span>&#8592; Back</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Result;