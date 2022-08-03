import { useContext, useEffect, useState } from 'react'
import { CarListContext } from '../../context/carListContext';
import { axiosService } from '../../services/axiosService'
import { TCar, TDriver } from '../../types';
import * as C from './styles'

type TCarModel = {
    closeModal: () => void;
}


export const CarModal = ({closeModal}: TCarModel) => {
    const {setCarList, carList, updatedCar, setUpdatedCar} = useContext(CarListContext)

    const [drivers, setDrivers] = useState<TDriver[]>([]);
    const [driverSelect, setDriverSelect] = useState<string | 'DEFAULT'>('DEFAULT')
    const [carModel, setCarModel] = useState('')


    useEffect(() => {
        axiosService.getDrivers()
        .then((res) => setDrivers(res))
    }, [])

    const registerCar = async () => {
        if(updatedCar !== null) {
            const response = await axiosService.updateCar(updatedCar.model, updatedCar.driver['@key'], updatedCar.id)
            const newState = carList.map((car) => car.id === response.id ? response : car)
            setCarList(newState)
            closeModal();
            setDriverSelect('DEFAULT');
            setCarModel('');
        }else if(carModel !== '' && driverSelect !== 'DEFAULT') {
            const response = await axiosService.registerACar(carModel, driverSelect)
            setCarList([...carList, response[0]])
            closeModal();
            setDriverSelect('DEFAULT')
            setCarModel('')
        }else {
            alert('Fill the fields!')
        }
    }

    const clearModal = () => {
        closeModal()
        setCarModel('')
        setDriverSelect('DEFAULT')
        setUpdatedCar(null)
    }

    return (
        <C.Container>
            <C.ModalWrapper>
                <C.Header>
                    Registe a Car
                    <div onClick={clearModal}>X</div>
                </C.Header>
                <C.ModalForm>
                    <label htmlFor="model-car">Car Model</label>
                    <input 
                        type="text" 
                        id="model-car" 
                        placeholder='Enter Car model'
                        value={updatedCar?.model ? updatedCar?.model : carModel}
                        onChange={e => updatedCar?.model ? setUpdatedCar({...updatedCar, model: e.target.value}) : setCarModel(e.target.value)}
                    />

                    <label>Select a driver</label>
                    <select 
                        value={updatedCar?.driver ? updatedCar.driver['@key'] : driverSelect} 
                        name={driverSelect} 
                        onChange={e => updatedCar?.driver ? setUpdatedCar({...updatedCar, driver: {...updatedCar.driver, "@key": e.target.value }}) : setDriverSelect(e.target.value)}
                    >
                        <option value="DEFAULT" disabled>Choose a driver</option>
                        {drivers.map((item) => (
                            <option key={item.id} value={item['@key']}>{item.name}</option>
                        ))}
                    </select>
                    <button onClick={registerCar}>Register</button>
                </C.ModalForm>
            </C.ModalWrapper>
        </C.Container>
    )
}