import React, {FC, useState} from 'react'
import {List} from "../../@types/List";
import "./BoardColumn.css"
import {addCard, useBoardDispatch, useBoardState} from "../../contexts/BoardContext";
import {ColumnCard} from "../columnCard/ColumnCard";

interface IBoardColumn {
    boardList: List
}

export const BoardColumn: FC<IBoardColumn> = ({boardList}) => {

    const [isAddingCard, setIsAddingCard] = useState(false)
    const [cardTitle, setCardTitle] = useState("")
    const [cardDescription, setCardDescription] = useState("")

    const boardDispatch = useBoardDispatch()
    const boardState = useBoardState()

    const onCancelCard = () => {
        setIsAddingCard(false)
    }

    const onAddCard = () => {
        if (!isAddingCard) {
            setCardTitle("")
            setCardDescription("")
            setIsAddingCard(true)
        } else if (cardTitle && cardDescription) {
            addCard(boardDispatch, {
                id: boardList.id,
                card: {
                    id: new Date(),
                    title: cardTitle,
                    description: cardDescription
                }
            })
            setIsAddingCard(false)
        }
    }

    const onCardTitleChange = (title: string) => {
        setCardTitle(title)
    }

    const onCardDescriptionChange = (description: string) => {
        setCardDescription(description)
    }

    const onPasteCard = () => {
        addCard(boardDispatch, {
            id: boardList.id,
            card: {
                id: new Date(),
                title: boardState.cuttingCard?.title,
                description: boardState.cuttingCard?.description
            }
        })
    }

    return (
        <div className="list-box">
            <h4>
                {boardList?.title}
            </h4>
            <div className="cards-wrapper">
                <>{
                    boardList.cards.map((card, index) => (
                        <ColumnCard key={`card-${index}`} columnCard={card} listId={boardList.id} />
                    ))
                }</>
                {boardState.isCuttingCard && <button className="paste-card-btn" onClick={onPasteCard}>Paste the card</button>}
            </div>
            <div className="card-form-container">
                {isAddingCard && <form className="card-form">
                    <input placeholder="Title" value={cardTitle} onChange={(event) => onCardTitleChange(event.target.value)}/>
                    <textarea placeholder="Description" value={cardDescription}
                              onChange={(event) => onCardDescriptionChange(event.target.value)} className="card-description"></textarea>
                </form>}
                <div>
                    {isAddingCard && <button className="add-card-btn" onClick={onCancelCard}>Cancel</button>}
                    <button className="add-card-btn" onClick={onAddCard}>+ Add a card</button>
                </div>
            </div>
        </div>
    )
}