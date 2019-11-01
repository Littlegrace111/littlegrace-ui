import styled from 'styled-components';

export const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0px 50px 0px;

    h2 {
        text-align: center;
        font-size: 60px;
        margin: 50px 20px;
        background: linear-gradient(90deg,  #050A27 0%, #4A548C 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    ${'' /* iphone 375  */}
    @media (max-width: 640px) {
        h2 {
            font-size: 40px;
        }
    }
`

export const Group = styled.div `
    display: flex;
    flex-wrap: wrap;
    max-width: 1360px;
    justify-content: flex-start;
    align-items: center;
    ${'' /* padding: 0px 40px 40px 40px; */}
    text-align: center;
`

export const Card = styled.div `
    width: 300px;
    height: 200px;
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px;
    cursor: pointer;
    box-shadow: 0 20px 40px rgba(0,0,0, 0.25);
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    

    img {
        position: absolute;
        top: 0;
        height: 110%;
        z-index: -1;
        transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    &:hover {
        transform: scale(1.08, 1.08);
        box-shadow: 0 30px 60px rgba(0,0,0, 0.5);
    }

    &:hover img {
        transform: translateY(-20px);
    }

    h3 {
        color: white;
        font-size: 30px;
        margin: 20px 0 0 20px;
    }

    p {
        color: rgba(255, 255, 255, 0.8);
        text-transform: uppercase;
        font-weight: 600;
        font-size: 18px;
        margin: 0px 0 20px 20px;
    }
`