import styled from 'styled-components';

export const Container = styled.section`
    max-width: 960px;
    margin: 20px auto;
    box-shadow: 0 0 1em #6c757d;
    padding: 0px 20px 20px;
`;

export const Titulo = styled.h1`
    font-size: 23px;
`;

export const Table = styled.table`
    width: 100%;
    text-align: center;
    th{
        background-color: darkcyan;
        color: white;
        padding: 10px;
    }
    td{
        background-color: gainsboro;
        padding: 8px;
    }
`;

export const ContentTitulo = styled.section`
    display: flex;
    justify-content: space-between;
`;

export const Form = styled.form`
    margin: 0 auto;
`;

export const AlertSuccess = styled.p`
    background-color: #d1e7dd;
    color: $0f5132;
    margin: 20px 0;
    border: 1px solid #badbcc;
    border-radius: 4px;
    padding: 7px;
`;

export const AlertDanger = styled.p`
    background-color: #f8d7d4;
    color: $0f5132;
    margin: 20px 0;
    border: 1px solid #f5c2c7;
    border-radius: 4px;
    padding: 7px;
`;

export const Label = styled.label`
    width: 100%;
    padding: 12px;
    margin-top: 6px;
    margin-bottom: 16px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
`;

export const InputRadio = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
`;

export const ButtonSuccess = styled.button`
    background-color: #fff;
    color: #198754;
    padding: 8px 12px;
    border: 1px solid #198754;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    min-width: 100px;
    min-height: 40px;
    :hover{
        background-color: #198754;
        color: #fff;
    }
`;

export const ButtonAction = styled.section`
    margin: 25px 0;
`;

export const ButtonInfo = styled.button`
    background-color: #fff;
    color: #0dcaf0;
    padding: 6px 9px;
    border: 1px solid #0dcaf0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    min-width: 100px;
    min-height: 40px;
    :hover{
        background-color: #0dcaf0;
        color: #fff;
    }
`;