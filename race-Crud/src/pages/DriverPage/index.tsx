import { useContext, useEffect, useState } from 'react'
import { DriverModal } from '../../components/DriverModal'
import { driverListContext } from '../../context/driverListContex'
import { axiosService } from '../../services/axiosService'
import { TDriver } from '../../types'
import * as C from './styles'

export const DriverPage = () => {
    const {driverList, teamNameList, setUpdatedDriver} = useContext(driverListContext)

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [newState, setNewSate] = useState<TDriver[]>(driverList)


    useEffect(() => {
        setNewSate(driverList)
    }, [driverList])

    const openModal = () => {
        setIsOpenModal(true)
        console.log(teamNameList, driverList)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    const deleteDrive = async (key: number) => {
        if(window.confirm('Would you like to erase the driver?')) {
            const response = await axiosService.deleteDriver(key)
            setNewSate(newState.filter((driver) => driver.id !== response.id))
            console.log(response)
        }
    }

    const updateDriver = async (item: TDriver) => {
        setIsOpenModal(true)
        setUpdatedDriver(item)
    }

    return (
        <C.Container>
            <C.Table>
                <thead>
                    <tr>
                        <C.TableTh>Type</C.TableTh>
                        <C.TableTh>Driver</C.TableTh>
                        <C.TableTh>Team</C.TableTh>
                        <C.TableTh>Action</C.TableTh>
                    </tr>
                </thead>
                <tbody>
                {newState.map((item, index) => (
                            <C.TableTr key={item.id}>
                                <C.TableTd>{item['@assetType']}</C.TableTd>
                                <C.TableTd>{item.name}</C.TableTd>
                                <C.TableTd>{teamNameList[index] ? teamNameList[index] : 'Team not found'}</C.TableTd>
                                <C.TableTd>
                                    <C.Buttons primary onClick={() => updateDriver(item)}>
                                        Edit
                                    </C.Buttons>
                                    <C.Buttons onClick={() => deleteDrive(item.id)}>
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
                Register a Driver</C.RegisterButton>
            <C.WrapperModal active={isOpenModal}>
                    <DriverModal closeModal={closeModal}/>
            </C.WrapperModal>
        </C.Container>
    )
}