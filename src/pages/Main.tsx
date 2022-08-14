import React from 'react'
import {Header} from "../components/header/Header";
import {useBoardState} from "../contexts/BoardContext";
import {Board} from "../components/board/Board";


export const Main = () => {

    const boardLists = useBoardState()

   return (<>
       <Header />
       <Board boardLists={boardLists.lists} />
   </>)
}