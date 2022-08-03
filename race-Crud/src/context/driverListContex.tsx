import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { axiosService } from "../services/axiosService";
import { TDriver } from "../types";

type TDriverListContext = {
    driverList: TDriver[];
    teamNameList: string[];
    setDriverList: Dispatch<SetStateAction<TDriver[]>>
    setUpdatedDriver: Dispatch<SetStateAction<TDriver | null>>
    updatedDriver: TDriver | null
}

export const driverListContext = createContext<TDriverListContext>({} as TDriverListContext)

type TDriverListProvider = {
    children: JSX.Element;
}

export const DriverListProvider = ({children}: TDriverListProvider) => {
    const [driverList, setDriverList] = useState<TDriver[]>([])
    const [teamNameList, setTeamNameList] = useState<string[]>([])
    const [updatedDriver, setUpdatedDriver] = useState<TDriver | null>(null)

    const getDriverList = async () => {
        const response = await axiosService.getDrivers()
        setDriverList(response)
        teamName(response)
        console.log(response)
    }

    const teamName = async (teamListDrive: TDriver[]) => {
        for await (let team of teamListDrive) {
            const response = await axiosService.getTeamName(team.team["@key"])
            setTeamNameList(currentList => [...currentList, response.name === undefined ? 'Team not found' : response.name])
        }
    }

    useEffect(() => {
        getDriverList()
    }, [])


    return (
        <driverListContext.Provider value={{ 
            driverList, 
            teamNameList,
            setDriverList,
            setUpdatedDriver,
            updatedDriver
            }}>
            {children}
        </driverListContext.Provider>
    )
}