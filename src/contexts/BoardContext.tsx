import React, {Reducer} from "react";
import {List} from "../@types/List";

const initialState: State = {
    lists: [],
}

type State = {
    lists: List[],
}

type Action = {
    type: "ADD_LIST" | "ADD_CARD";
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
            return {lists: [ ...state.lists, action.payload]};
        case "ADD_CARD": {
            const addTemp = [...state.lists]
            addTemp[action.payload.id] = {...state.lists[action.payload.id],
                cards: [...state.lists[action.payload.id].cards, action.payload.card]}
            return {lists: [...addTemp], isCuttingCard: false}
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

export { BoardProvider, useBoardState, useBoardDispatch, addList, addCard };

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