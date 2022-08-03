import { useContext, useEffect, useState } from 'react';
import { teamListContext } from '../../context/teamListContext';
import { axiosService } from '../../services/axiosService';
import { TTeam } from '../../types';
import * as C from './styles'

type TTeamModal = {
    closeModal: () => void;
}


export const TeamModal = ({closeModal}: TTeamModal) => {
    const { setTeamList, setUpdatedTeam, teamList, updatedTeam} = useContext(teamListContext)

    const [teamName, setTeamName] = useState('');

    const registerTeam = async () => {
        if(updatedTeam !== null) {
            const response = await axiosService.updateTeam(updatedTeam.name, updatedTeam.id)
            const newState = teamList.map((team) => team.id === response.id ? response : team)
            setTeamList(newState)
            setTeamName('');
            setUpdatedTeam(null)
            closeModal();
        }else if(teamName !== '') {
            const response = await axiosService.registerATeam(teamName)
            setTeamList([...teamList, response[0]])
            closeModal();
            setTeamName('');
            setUpdatedTeam(null)
        }else {
            alert('Fill the fields!')
        }
    }


    const clearModal = () => {
        closeModal()
        setTeamName('')
        setUpdatedTeam(null)
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
                        value={updatedTeam?.name ? updatedTeam?.name : teamName}
                        onChange={e => updatedTeam?.name ? setUpdatedTeam({...updatedTeam, name: e.target.value}) : setTeamName(e.target.value)}
                    />
                    <button onClick={registerTeam}>Register</button>
                </C.ModalForm>
            </C.ModalWrapper>
        </C.Container>
    )
}