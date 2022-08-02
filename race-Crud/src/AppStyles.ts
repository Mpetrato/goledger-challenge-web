import styled from "styled-components";

export const Section = styled.div`
    padding: 100px;
`
export const Container = styled.div`
    max-width: 100%;
    box-shadow: rgb(204, 204, 204) 2px 2px 10px 0px;
    padding: 50px;

    & > a {
        font-size: 20px;
        font-weight: 400;
        width: 100px;
        text-align: center;
        border-radius: 5px;

        display: inline-block;
        margin-right: 10px;
        margin-bottom: 20px;
        padding: 6px 12px;
        height: 40px;
        color: white;
        background-color: #1fb6ff;
        text-decoration: none;
    }
`