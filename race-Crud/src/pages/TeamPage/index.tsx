import { useContext, useEffect, useState } from 'react'
import { TeamModal } from '../../components/TeamModal'
import { teamListContext } from '../../context/teamListContext'
import { axiosService } from '../../services/axiosService'
import { TTeam } from '../../types'
import * as C from './styles'

export const TeamPage = () => {

    const { teamList, setUpdatedTeam} = useContext(teamListContext)

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [newState, setNewSate] = useState<TTeam[]>(teamList)


    useEffect(() => {
        setNewSate(teamList)
    }, [teamList])

    const openModal = () => {
        setIsOpenModal(true)
        console.log(teamList)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    const updateDriver = async (item: TTeam) => {
        setIsOpenModal(true)
        setUpdatedTeam(item)
    }

    const deleteTeam = async (key: number) => {
        if(window.confirm('Would you like to erase the car?')) {
            const response = await axiosService.deleteTeam(key)
            setNewSate(newState.filter((car) => car.id !== response.id))
            console.log(response)
        }
    }


    return (
        <C.Container>
            <C.Table>
                <thead>
                    <tr>
                        <C.TableTh>Type</C.TableTh>
                        <C.TableTh>Name</C.TableTh>
                        <C.TableTh>Action</C.TableTh>
                    </tr>
                </thead>
                <tbody>
                {newState.map((item, index) => (
                            <C.TableTr key={item.id}>
                                <C.TableTd>{item['@assetType']}</C.TableTd>
                                <C.TableTd>{item.name}</C.TableTd>
                                <C.TableTd>
                                    <C.Buttons primary onClick={() => updateDriver(item)}>
                                        Edit
                                    </C.Buttons>
                                    <C.Buttons onClick={(e) => deleteTeam(item.id)}>
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
                    <TeamModal closeModal={closeModal}/>
            </C.WrapperModal>
        </C.Container>
    )
}