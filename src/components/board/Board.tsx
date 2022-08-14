import React, {FC, useState} from "react"
import {List} from "../../@types/List";
import "./Board.css"

interface IBoardLists{
    boardLists: List[];
}

export const Board: FC<IBoardLists> = ({boardLists}) => {

    const [listTitle, setListTitle] = useState("")

    const onListTitleChange = (listTitle: string) => {
        setListTitle(listTitle);
    }

    const onAddList = () => {
        if (listTitle.length) {
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