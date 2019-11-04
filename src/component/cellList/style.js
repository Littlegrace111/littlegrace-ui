import styled from 'styled-components';

export const CellListWrapper = styled.div `
    padding-bottom: 60px;

    h2 {
        font-weight: 600;
        font-size: 30px;
        text-transform: uppercase;
        color: #94A4BA;
        text-align: center;
    }
`

export const CellListGroup = styled.div `
    max-width: 800px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 640px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

export const CellGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 375px;
`

export const CellImage = styled.div`
    width: 60px;
    height: 60px;
    ${'' /* background: #212c4f;  */}
    border-radius: 10px;
    background-image: url(${props => props.image});
    background-size: 60px 60px;
    padding: 10px;
`

export const CellTitle = styled.div`
    flex: auto;
    font-size: 20px;
    border-bottom: 1px solid rgba(0,0,0, 0.1);
    padding: 30px 10px;
`