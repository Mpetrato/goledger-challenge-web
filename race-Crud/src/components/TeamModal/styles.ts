import styled from "styled-components";

export const Container = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const ModalWrapper = styled.div`
    width: 500px;
    height: 500px;
    background-color: #FFF;
    box-shadow: 1px 1px 10px #000;
    position: relative;
    `

export const ModalForm = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;


    & > input {
        padding: 10px 12px;
        font-size: 18px;
        outline: none;
        margin-bottom: 40px;
    }
    & > select {
        padding: 10px;
        font-size: 20px;
        margin-bottom: 10px;
    }
    & > button {
        padding: 10px;
        background-color: #13ce66;
        border: none;
        border-radius: 10px;
        font-size: 18px;
        color: white;
        cursor: pointer;
    }
`

export const Header = styled.div`
    padding: 20px;
    text-align: center;
    font-size: 20px;
    width: 100%;
    background-color: #ffba00;
    display: flex;
    justify-content: space-between;
    position: relative;
    font-weight: bold;

    & > div {
        position: absolute;
        right: 0;
        top: 0;
        height: 63px;
        width: 50px;
        line-height: 63px;
        font-weight: bold;
        cursor: pointer;
    }

    & > div:hover {
        background-color: red;
    }
`
