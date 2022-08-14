import React, {FC, useState} from 'react'
import {List} from "../../@types/List";
import "./BoardColumn.css"

interface IBoardColumn {
    boardList: List
}

export const BoardColumn: FC<IBoardColumn> = ({boardList}) => {

    const [isAddingCard, setIsAddingCard] = useState(false)
    const [cardTitle, setCardTitle] = useState("")
    const [cardDescription, setCardDescription] = useState("")

    const onCancelCard = () => {
        setIsAddingCard(false)
    }

    const onCardTitleChange = (title: string) => {
        setCardTitle(title)
    }

    const onCardDescriptionChange = (description: string) => {
        setCardDescription(description)
    }

    return (
        <div className="list-box">
            <h4>
                {boardList?.title}
            </h4>
            <div className="cards-wrapper">
                <>{
                    boardList.cards.map((card, index) => (
                        <div key={`card-${index}`}>{card.id}</div>
                    ))
                }</>
            </div>
            <div className="card-form-container">
                {isAddingCard && <form className="card-form">
                    <input placeholder="Title" value={cardTitle} onChange={(event) => onCardTitleChange(event.target.value)}/>
                    <textarea placeholder="Description" value={cardDescription}
                              onChange={(event) => onCardDescriptionChange(event.target.value)} className="card-description"></textarea>
                </form>}
                <div>
                    {isAddingCard && <button className="add-card-btn" onClick={onCancelCard}>Cancel</button>}
                    <button className="add-card-btn">+ Add a card</button>
                </div>
            </div>
        </div>
    )
}