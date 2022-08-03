import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { axiosService } from "../services/axiosService";
import { TEvent, TTeam } from "../types";

type TEventListContext = {
    eventList: TEvent[];
    setEventList: Dispatch<SetStateAction<TEvent[]>>
    setUpdatedEvent: Dispatch<SetStateAction<TEvent | null>>
    updatedEvent: TEvent | null
}

export const eventListContext = createContext<TEventListContext>({} as TEventListContext)

type TTeamListContext = {
    children: JSX.Element;
}

export const EventListProvider = ({children}: TTeamListContext) => {
    const [eventList, setEventList] = useState<TEvent[]>([])
    const [updatedEvent, setUpdatedEvent] = useState<TEvent | null>(null)

    const getDriverList = async () => {
        const response = await axiosService.getEvents()
        setEventList(response)
        console.log(response)
    }

    useEffect(() => {
        getDriverList()
    }, [])


    return (
        <eventListContext.Provider value={{ 
            eventList,
            setEventList,
            setUpdatedEvent,
            updatedEvent
            }}>
            {children}
        </eventListContext.Provider>
    )
}