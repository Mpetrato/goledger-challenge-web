import { useEffect, useState } from 'react'
import { axiosService } from '../../services/axiosService'
import { TCar } from '../../types'
import * as C from './styles'

export const CarPage = () => {

    const [carList, setCarList] = useState<TCar[]>([] as TCar[]);
    const [driveNameList, setDriveNameList] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    
    const getCarInfo = async () => {
        const response = await axiosService.getCar()
        setCarList(response) 
        await driveName(response)
        setIsLoading(false)
    }

    const driveName = async (carListDrive: TCar[]) => {
        for(let car of carListDrive) {
            const response = await axiosService.getDriverName(car.driver['@key'])
            setDriveNameList(currentList => [...currentList, response.name === undefined ? 'Driver not found' : response.name])
        }
    }


    useEffect(() => {
        getCarInfo();
    }, [])

    return (
        <C.Container>
            {isLoading && (
                <div>Loading Cars...</div>
            )}
            {!isLoading && (
                <>
                <C.Table>
                    <thead>
                        <tr>
                            <C.TableTh>Type</C.TableTh>
                            <C.TableTh>Model</C.TableTh>
                            <C.TableTh>Driver</C.TableTh>
                            <C.TableTh>Action</C.TableTh>
                        </tr>
                    </thead>
                    <tbody>
                        {carList.map((item, index) => (
                            <C.TableTr key={item.id}>
                                <C.TableTd>{item['@assetType']}</C.TableTd>
                                <C.TableTd>{item.model}</C.TableTd>
                                <C.TableTd>{driveNameList[index]}</C.TableTd>
                                <C.TableTd>
                                    <button>Apagar</button>
                                    <button>Editar</button>
                                </C.TableTd>
                            </C.TableTr>
                        ))}
                    </tbody>
                </C.Table>
                <button>Register a Car</button>
                </>
            )}
        </C.Container>
    )
}