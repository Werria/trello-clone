import React, {FC, useEffect, useState} from 'react'
import {Card} from "../../@types/Card";
import "./ColumnCard.css"
import {cutCard, useBoardDispatch, useBoardState} from "../../contexts/BoardContext";

interface IColumnCard {
    columnCard: Card
    listId: number
}

export const ColumnCard: FC<IColumnCard> = ({columnCard, listId}) => {
    const [isEditingCard, setIsEditingCard] = useState(false)
    const [cardTitle, setCardTitle] = useState(columnCard.title)
    const [cardDescription, setCardDescription] = useState(columnCard.description)

    const boardDispatch = useBoardDispatch()
    const boardState = useBoardState()

    useEffect(() => {
        setCardTitle(columnCard.title)
        setCardDescription(columnCard.description)
    }, [boardState.cuttingCard?.id])

    const onCutCard = () => {
        cutCard(boardDispatch, {
            listId,
            cuttingCard: columnCard
        })
    }

    const onCardTitleChange = (title: string) => {
        setCardTitle(title)
    }

    const onCardDescriptionChange = (description: string) => {
        setCardDescription(description)
    }

    const onCancelEdit = () => {
        setCardTitle(columnCard.title)
        setCardDescription(columnCard.description)
        setIsEditingCard(false)
    }

    return (<div className="card-box-container">
        <div className="card-box">
            <div className={!isEditingCard ? "card-header" : "card-editing-header"}>
                {!isEditingCard && (
                    <h5>
                        {cardTitle}
                    </h5>
                )}
                {!isEditingCard && <button className="card-edit-btn" onClick={() => setIsEditingCard(true)}>Edit</button>}
                {isEditingCard && (<div className="card-btn-wrapper">
                    <button className="card-edit-btn" onClick={onCancelEdit}>Cancel</button>
                    <button className="card-edit-btn">Done</button>
                </div>)}
            </div>
            {isEditingCard && (
                <input value={cardTitle} onChange={(event) => onCardTitleChange(event.target.value)} />
            )}
            {!isEditingCard ? (
                <p className="card-body">
                    {cardDescription}
                </p>
            ) : (
                <textarea value={cardDescription} onChange={(event) => onCardDescriptionChange(event.target.value)} />
            )}
        </div>
        {!boardState.isCuttingCard && !isEditingCard && <button className="cut-card-btn" onClick={onCutCard}>Cut this card</button>}
    </div>)
}