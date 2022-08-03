import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Table = styled.table`
    width: 100%;
`

export const TableTh = styled.th`
    height: 50px;
    background-color: #ffba00;
    padding-left: 20px;
    font-size: 20px;
`

export const TableTr = styled.tr`
    &:hover {
        background-color: #ffba0040;
    }
`

export const TableTd = styled.td`
    height: 50px;
    padding-left: 20px;
    font-size: 18px;
    margin-top: 10px;

    &:last-child {
        display: flex;
        justify-content: center;
    }
`

export const RegisterButton = styled.button`
    padding: 20px;
    background-color: #1fb6ff;
    border: 0;
    border-radius: 10px;
    margin-top: 40px;
    color: #FFF;
    font-size: 20px;
    cursor: pointer;
`

type TButtons = {
    primary?: boolean
}

export const Buttons = styled.button<TButtons>`
    padding: 5px 20px;
    border-radius: 10px;
    color: #FFF;
    font-size: 16px;
    border: 0;
    background-color: ${props => props.primary ? "#13ce66" : "#ff4949"};
    cursor: pointer;

    &:last-child {
        margin-left: 20px;
    }
`

type TWrapperModal = {
    active: boolean
}

export const WrapperModal = styled.div<TWrapperModal>`
    position: fixed;
    bottom: 0;
    display: ${props => props.active ? 'block' : 'none'};
`