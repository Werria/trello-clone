import React, {FC} from 'react'
import {Card} from "../../@types/Card";
import "./ColumnCard.css"

interface IColumnCard {
    columnCard: Card
    listId: number
}

export const ColumnCard: FC<IColumnCard> = ({columnCard, listId}) => {

    return (<div className="card-box-container">
            <div>
                <h5>{columnCard.title}</h5>
            </div>
            <button className="cut-card-btn">Cut this card</button>
        </div>)
}