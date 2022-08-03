import { useContext, useEffect, useState } from 'react';
import { eventListContext } from '../../context/eventListContext';
import { axiosService } from '../../services/axiosService';
import { TEvent, TTeam } from '../../types';
import * as C from './styles'

type TEventModal = {
    closeModal: () => void;
}


export const EventModal = ({closeModal}: TEventModal) => {
    const { eventList, setEventList, setUpdatedEvent, updatedEvent} = useContext(eventListContext)

    const [eventName, setEventName] = useState('');
    const [prize, setPrize] = useState(0);
    const [eventWinner, setEventWinner] = useState('');
    const [teams, setTeams] = useState<TTeam[]>([])
    const [eventSelect, setEventSelect] = useState<string | 'DEFAULT'>('DEFAULT')

    const registerTeam = async () => {
        if(updatedEvent !== null) {
            const response = await axiosService.updateEvent(updatedEvent.name, updatedEvent.prize, updatedEvent.winner['@key'])
            const newState = eventList.map((event) => event.name === response.name ? response : event)
            setEventList(newState)
            setEventName('');
            setUpdatedEvent(null)
            closeModal();
            setEventSelect('DEFAULT')
        }else if(eventName !== '') {
            const response = await axiosService.registerAEvent(eventName, prize, eventWinner)
            setEventList([...eventList, response[0]])
            closeModal();
            setEventName('');
            setUpdatedEvent(null)
            setEventSelect('DEFAULT')
        }else {
            alert('Fill the fields!')
        }
    }

    useEffect(() => {
        axiosService.getTeams()
        .then(res => setTeams(res))
    }, [])



    const clearModal = () => {
        closeModal()
        setEventName('')
        setUpdatedEvent(null)
        setEventSelect('DEFAULT')
    }

    return (
        <C.Container>
            <C.ModalWrapper>
                <C.Header>
                    Registe a Event  
                    <div onClick={clearModal}>X</div>
                </C.Header>
                <C.ModalForm>
                    <label htmlFor="model-car">Event Name</label>
                    <input 
                        type="text" 
                        id="name-event" 
                        placeholder='Enter Event Name'
                        value={updatedEvent?.name ? updatedEvent?.name : eventName}
                        onChange={e => updatedEvent?.name ? setUpdatedEvent({...updatedEvent, name: e.target.value}) : setEventName(e.target.value)}
                    />
                    <label htmlFor="model-car">Event Prize</label>
                    <input 
                        type="number" 
                        id="prize-event" 
                        placeholder='Enter Event Prize'
                        value={updatedEvent?.prize ? updatedEvent?.prize : prize}
                        onChange={e => updatedEvent?.prize ? setUpdatedEvent({...updatedEvent, prize: +e.target.value}) : setPrize(+e.target.value)}
                    />
                    <label>Select a Winner Team</label>
                    <select 
                        value={updatedEvent?.winner ? updatedEvent?.winner['@key'] : eventWinner} 
                        name={eventSelect} 
                        onChange={e => updatedEvent?.winner ? setUpdatedEvent({...updatedEvent, winner: {...updatedEvent.winner, "@key": e.target.value }}) : setEventWinner(e.target.value)}
                    >
                        <option value="DEFAULT" disabled>Choose a Team</option>
                        {teams.map((item) => (
                            <option key={item.id} value={item['@key']}>{item.name}</option>
                        ))}
                    </select>
                    <button onClick={registerTeam}>Register</button>
                </C.ModalForm>
            </C.ModalWrapper>
        </C.Container>
    )
}