import React, {FC, useState} from "react"
import {List} from "../../@types/List";
import "./Board.css"
import {addList, useBoardDispatch} from "../../contexts/BoardContext";

interface IBoardLists{
    boardLists: List[];
}

export const Board: FC<IBoardLists> = ({boardLists}) => {

    const [listTitle, setListTitle] = useState("")

    const boardDispatch = useBoardDispatch()

    const onListTitleChange = (listTitle: string) => {
        setListTitle(listTitle);
    }

    const onAddList = () => {
        if (listTitle.length) {
            addList(boardDispatch, {
                id: boardLists.length,
                title: listTitle,
                cards: []
            })
            setListTitle("")
        }
    }

    return <>
        <div className="board-list-wrapper">
            <>
                {boardLists.map((boardList, index) => (
                    <div key={`list-${index}`}>{boardList.id}</div>
                ))}
            </>
            <div>
                <input value={listTitle} onChange={(event) => onListTitleChange(event.target.value)} />
                <button onClick={onAddList}>Add a list</button>
            </div>
        </div>
    </>
}