import { useContext, useEffect, useState } from 'react'
import { EventModal } from '../../components/EventModal'
import { eventListContext } from '../../context/eventListContext'
import { axiosService } from '../../services/axiosService'
import { TEvent } from '../../types'
import * as C from './styles'

export const EventPage = () => {
    const { eventList, setEventList, setUpdatedEvent, updatedEvent} = useContext(eventListContext)
 
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [newState, setNewSate] = useState<TEvent[]>(eventList)



    useEffect(() => {
        setNewSate(eventList)
    }, [eventList])

    const openModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    const updateDriver = async (item: TEvent) => {
        setIsOpenModal(true)
        setUpdatedEvent(item)
    }

    const deleteEvent = async (key: number) => {
        if(window.confirm('Would you like to erase the event?')) {
            const response = await axiosService.deleteEvent(key)
            setNewSate(newState.filter((item) => item.name !== response.name))
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
                        <C.TableTh>Date</C.TableTh>
                        <C.TableTh>Prize</C.TableTh>
                        <C.TableTh>Winner</C.TableTh>
                        <C.TableTh>Action</C.TableTh>
                    </tr>
                </thead>
                <tbody>
                {eventList.map((item, index) => (
                            <C.TableTr key={item.name}>
                                <C.TableTd>event</C.TableTd>
                                <C.TableTd>{item.name}</C.TableTd>
                                <C.TableTd>{item.date.toString()}</C.TableTd>
                                <C.TableTd>{item.prize}</C.TableTd>
                                <C.TableTd>{item.winner['@key']}</C.TableTd>
                                <C.TableTd>
                                    <C.Buttons primary onClick={() => updateDriver(item)}>
                                        Edit
                                    </C.Buttons>
                                    <C.Buttons onClick={(e) => deleteEvent(+item['@key'])}>
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
                    <EventModal closeModal={closeModal}/>
            </C.WrapperModal>
        </C.Container>
    )
}