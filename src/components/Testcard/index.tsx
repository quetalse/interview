import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import {DataType} from "../../@types";

type testCard = {
    data: DataType
}

const TestCard: React.FC<testCard> = ({data: {id, name, type, status, site}}) => {

    let cardModify = `test-card_${type === 'CLASSIC' ? 'burgundy' : type === 'SERVER_SIDE' ? 'lightblue' : 'blue'}`;
    let statusModify = `test-card__status_${status.toLowerCase()}`;

    let btnText = ( status === 'ONLINE' || status === 'PAUSED' || status === 'STOPPED') ? 'Results' : 'Finalize';
    let btnLowerCase = btnText.toLowerCase();

    return (
        <div className={`test-card ${cardModify}`}>
            <div className="test-card__name">{name}</div>
            <div className="test-card__type">{type}</div>
            <div className={`test-card__status ${statusModify}`}>{status}</div>
            <div className="test-card__site">{site}</div>
            <Link className={`test-card__btn test-card__btn_${btnLowerCase}`} to={`/${btnLowerCase}/${id}`}>{btnText}</Link>
        </div>
    )
}

export default TestCard;