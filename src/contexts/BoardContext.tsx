import React, {Reducer} from "react";
import {List} from "../@types/List";
import {Card} from "../@types/Card";

const initialState: State = {
    lists: [],
    isCuttingCard: false,
}

type State = {
    lists: List[],
    isCuttingCard: boolean,
    cuttingCard?: Card
}

type Action = {
    type: "ADD_LIST" | "ADD_CARD" | "CUT_CARD";
    payload: any;
};

type BoardProviderProps = {
    children: React.ReactNode;
};

type Dispatch = (action: Action) => void;

let BoardStateContext = React.createContext<State | undefined>(undefined);
let BoardDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const boardReducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case "ADD_LIST":
            return {lists: [ ...state.lists, action.payload], isCuttingCard: state.isCuttingCard};
        case "ADD_CARD": {
            const addTemp = [...state.lists]
            addTemp[action.payload.id] = {...state.lists[action.payload.id],
                cards: [...state.lists[action.payload.id].cards, action.payload.card]}
            return {lists: [...addTemp], isCuttingCard: false}
        };
        case "CUT_CARD": {
            const newCards = state.lists[action.payload.listId].cards.filter((card) => card.id !== action.payload.cuttingCard.id)
            const cutTemp = [...state.lists]
            cutTemp[action.payload.listId] = {...state.lists[action.payload.listId],
                cards: [...newCards]}
            return {lists: [...cutTemp], isCuttingCard: true, cuttingCard: {...action.payload.cuttingCard}}
        };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function BoardProvider({children}: BoardProviderProps) {
    let [state, dispatch] = React.useReducer(boardReducer, initialState);

    return (
        <BoardStateContext.Provider value={state}>
            <BoardDispatchContext.Provider value={dispatch}>
                {children}
            </BoardDispatchContext.Provider>
        </BoardStateContext.Provider>
    );
}

function useBoardState() {
    let context = React.useContext(BoardStateContext);
    if (context === undefined) {
        throw new Error("useBoardState must be used within a BoardProvider");
    }
    return context;
}

function useBoardDispatch() {
    let context = React.useContext(BoardDispatchContext);
    if (context === undefined) {
        throw new Error("useBoardDispatch must be used within a BoardProvider");
    }
    return context;
}

export { BoardProvider, useBoardState, useBoardDispatch, addList, addCard, cutCard };

// ###########################################################
function addList(dispatch: Dispatch, list: List) {
    dispatch({
        type: "ADD_LIST",
        payload: list,
    });
}

function addCard(dispatch: Dispatch, payload: any) {
    dispatch({
        type: "ADD_CARD",
        payload: payload,
    });
}

function cutCard(dispatch: Dispatch, payload: any) {
    dispatch({
        type: "CUT_CARD",
        payload: payload,
    });
}