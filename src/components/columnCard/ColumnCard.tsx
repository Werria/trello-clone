import React, {FC} from 'react'
import {Card} from "../../@types/Card";
import "./ColumnCard.css"
import {cutCard, useBoardDispatch} from "../../contexts/BoardContext";

interface IColumnCard {
    columnCard: Card
    listId: number
}

export const ColumnCard: FC<IColumnCard> = ({columnCard, listId}) => {

    const boardDispatch = useBoardDispatch()

    const onCutCard = () => {
        cutCard(boardDispatch, {
            listId,
            cuttingCard: columnCard
        })
    }

    return (<div className="card-box-container">
            <div>
                <h5>{columnCard.title}</h5>
            </div>
            <button className="cut-card-btn" onClick={onCutCard}>Cut this card</button>
        </div>)
}