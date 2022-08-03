import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { axiosService } from "../services/axiosService";
import { TTeam } from "../types";

type TEventListContext = {
    teamList: TTeam[];
    setTeamList: Dispatch<SetStateAction<TTeam[]>>
    setUpdatedTeam: Dispatch<SetStateAction<TTeam | null>>
    updatedTeam: TTeam | null
}

export const teamListContext = createContext<TEventListContext>({} as TEventListContext)

type TTeamListContext = {
    children: JSX.Element;
}

export const TeamListProvider = ({children}: TTeamListContext) => {
    const [teamList, setTeamList] = useState<TTeam[]>([])
    const [updatedTeam, setUpdatedTeam] = useState<TTeam | null>(null)

    const getDriverList = async () => {
        const response = await axiosService.getTeams()
        setTeamList(response)
        console.log(response)
    }

    useEffect(() => {
        getDriverList()
    }, [])


    return (
        <teamListContext.Provider value={{ 
            teamList,
            setTeamList,
            setUpdatedTeam,
            updatedTeam
            }}>
            {children}
        </teamListContext.Provider>
    )
}