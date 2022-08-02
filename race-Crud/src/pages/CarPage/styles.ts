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
`