import { useContext, useEffect, useState } from 'react'
import { CarModal } from '../../components/CarModal'
import { CarListContext } from '../../context/carListContext'
import { axiosService } from '../../services/axiosService'
import { TCar } from '../../types'
import * as C from './styles'

export const CarPage = () => {
    const {carList, driveNameList, isLoading, setUpdatedCar} = useContext(CarListContext)

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [newState, setNewSate] = useState<TCar[]>(carList)

    useEffect(() => {
        setNewSate(carList)
    }, [carList])
    


    const openModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    const deleteCar = async (key: number) => {
        if(window.confirm('Would you like to erase the car?')) {
            const response = await axiosService.deleteCar(key)
            setNewSate(newState.filter((car) => car.id !== response.id))
            console.log(response)
        }
    }
    
    const updateCar = async (item: TCar) => {
        setIsOpenModal(true)
        setUpdatedCar(item)
    }

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
                        {newState.map((item, index) => (
                            <C.TableTr key={item.id}>
                                <C.TableTd>{item['@assetType']}</C.TableTd>
                                <C.TableTd>{item.model}</C.TableTd>
                                <C.TableTd>{driveNameList[index] ? driveNameList[index] : 'Driver not found'}</C.TableTd>
                                <C.TableTd>
                                    <C.Buttons primary onClick={() => updateCar(item)}>
                                        Edit
                                    </C.Buttons>
                                    <C.Buttons onClick={() => deleteCar(item.id)}>
                                        Delete
                                    </C.Buttons>
                                </C.TableTd>
                            </C.TableTr>
                        ))}
                    </tbody>
                </C.Table>
                <C.RegisterButton
                    onClick={openModal}
                >
                    Register a Car
                </C.RegisterButton>
                <C.WrapperModal active={isOpenModal}>
                    <CarModal closeModal={closeModal}/>
                </C.WrapperModal>
                </>
            )}
        </C.Container>
    )
}