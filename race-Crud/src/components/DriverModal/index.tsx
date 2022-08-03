import { useContext, useEffect, useState } from 'react';
import { driverListContext } from '../../context/driverListContex';
import { axiosService } from '../../services/axiosService';
import { TTeam } from '../../types';
import * as C from './styles'

type TDriverModal = {
    closeModal: () => void;
}


export const DriverModal = ({closeModal}: TDriverModal) => {
    const { driverList, setDriverList, setUpdatedDriver, updatedDriver} = useContext(driverListContext)

    const [driverName, setDriverName] = useState('');
    const [teams, setTeams] = useState<TTeam[]>([])
    const [teamSelect, setTeamSelect] = useState<string | 'DEFAULT'>('DEFAULT');

    useEffect(() => {
        axiosService.getTeams()
        .then(res => setTeams(res))
    }, [])

    const registerDriver = async () => {
        if(updatedDriver !== null) {
            const response = await axiosService.updatedDriver(updatedDriver.name, updatedDriver.team['@key'], updatedDriver.id)
            const newState = driverList.map((driver) => driver.id === response.id ? response : driver)
            setDriverList(newState)
            closeModal();
            setTeamSelect('DEFAULT');
            setDriverName('');
        }else if(driverName !== '' && teamSelect !== 'DEFAULT') {
            const response = await axiosService.registerADriver(driverName, teamSelect)
            setDriverList([...driverList, response[0]])
            closeModal();
            setTeamSelect('DEFAULT')
            setDriverName('')
        }else {
            alert('Fill the fields!')
        }
    }


    const clearModal = () => {
        closeModal()
        setDriverName('')
        setTeamSelect('DEFAULT')
        setUpdatedDriver(null)
    }

    return (
        <C.Container>
            <C.ModalWrapper>
                <C.Header>
                    Registe a Car
                    <div onClick={clearModal}>X</div>
                </C.Header>
                <C.ModalForm>
                    <label htmlFor="model-car">Driver Name</label>
                    <input 
                        type="text" 
                        id="name-driver" 
                        placeholder='Enter Driver Name'
                        value={updatedDriver?.name ? updatedDriver?.name : driverName}
                        onChange={e => updatedDriver?.name ? setUpdatedDriver({...updatedDriver, name: e.target.value}) : setDriverName(e.target.value)}
                    />

                    <label>Select a driver</label>
                    <select 
                        value={updatedDriver?.team ? updatedDriver.team['@key'] : teamSelect} 
                        name={teamSelect} 
                        onChange={e => updatedDriver?.team ? setUpdatedDriver({...updatedDriver, team: {...updatedDriver.team, "@key": e.target.value }}) : setTeamSelect(e.target.value)}
                    >
                        <option value="DEFAULT" disabled>Choose a Team</option>
                        {teams.map((item) => (
                            <option key={item.id} value={item['@key']}>{item.name}</option>
                        ))}
                    </select>
                    <button onClick={registerDriver}>Register</button>
                </C.ModalForm>
            </C.ModalWrapper>
        </C.Container>
    )
}