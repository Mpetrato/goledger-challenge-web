import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { axiosService } from "../services/axiosService";
import { TCar } from "../types";
import { driverListContext } from './driverListContex'

type TCarListContext = {
    carList: TCar[]
    setCarList: Dispatch<SetStateAction<TCar[]>>
    driveNameList: string[]
    isLoading: boolean
    setUpdatedCar: Dispatch<SetStateAction<TCar | null>>
    updatedCar: TCar | null
}

export const CarListContext = createContext<TCarListContext>({} as TCarListContext);

type TCarListProvider = {
    children: ReactNode
}


export const CarListProvider = ({ children }: TCarListProvider) => {

    const [carList, setCarList] = useState<TCar[]>([])
    const [driveNameList, setDriveNameList] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [updatedCar, setUpdatedCar] = useState<TCar | null>(null)

    const getCarList = async () => {
        const response = await axiosService.getCar()
        setCarList(response)
        console.log(response)
        await driveName(response)
        setIsLoading(false)
    }

    const driveName = async (carListDrive: TCar[]) => {
        for await (let car of carListDrive) {
            const response = await axiosService.getDriverName(car.driver['@key'])
            setDriveNameList(currentList => [...currentList, response.name === undefined ? 'Driver not found' : response.name])
        }
    }

    useEffect(() => {
        getCarList()
    }, [])
    


    return (
            <CarListContext.Provider value={{
                carList,
                setCarList,
                driveNameList,
                isLoading,
                setUpdatedCar,
                updatedCar
            }}>
                {children}
            </CarListContext.Provider>
    )
}