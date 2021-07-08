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
    justify-content: center;
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

export const ContentActionSolo = styled.section`
    padding: auto;
`;

export const TextCenter = styled.p`
    text-align: center;
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
    text-align: center;
`;

export const AlertDanger = styled.p`
    background-color: #f8d7d4;
    color: $0f5132;
    margin: 20px 0;
    border: 1px solid #f5c2c7;
    border-radius: 4px;
    padding: 7px;
    text-align: center;
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

export const ButtonAction = styled.section`
    margin: 25px 0;
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
    :hover{
        background-color: #198754;
        color: #fff;
    }
`;

export const ButtonPrimary = styled.button`
    background-color: #fff;
    color: #0d6efd;
    padding: 6px 9px;
    border: 1px solid #0d6efd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    :hover{
        background-color: #0d6efd;
        color: #fff;
    }
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
    :hover{
        background-color: #0dcaf0;
        color: #fff;
    }
`;

export const ButtonWarning = styled.button`
    background-color: #fff;
    color: #ffc107;
    padding: 6px 9px;
    border: 1px solid #ffc107;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    :hover{
        background-color: #ffc107;
        color: #fff;
    }
`;

export const BtnSuccess = styled.button`
    background-color: #fff;
    color: #198754;
    padding: auto;
    border: 1px solid #198754;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    width: 40px;
    height: 40px;
    align-items: center;
    :hover{
        background-color: #198754;
        color: #fff;
    }
`;

export const BtnPrimary = styled.button`
    background-color: #fff;
    color: #0d6efd;
    padding: auto;
    border: 1px solid #0d6efd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    width: 40px;
    height: 40px;
    align-items: center;
    :hover{
        background-color: #0d6efd;
        color: #fff;
    }
`;

export const BtnInfo = styled.button`
    background-color: #fff;
    color: #0dcaf0;
    padding: auto;
    border: 1px solid #0dcaf0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    width: 40px;
    height: 40px;
    align-items: center;
    :hover{
        background-color: #0dcaf0;
        color: #fff;
    }
`;

export const BtnDanger = styled.button`
    background-color: #fff;
    color: #dc3545;
    padding: auto;
    border: 1px solid #dc3545;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    width: 40px;
    height: 40px;
    align-items: center;
    :hover{
        background-color: #dc3545;
        color: #fff;
    }
`;

export const BtnWarning = styled.button`
    background-color: #fff;
    color: #ffc107;
    padding: auto;
    border: 1px solid #ffc107;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    width: 40px;
    height: 40px;
    align-items: center;
    :hover{
        background-color: #ffc107;
        color: #fff;
    }
`;

export const PLg = styled.p`
    font-size: 16px;
`;