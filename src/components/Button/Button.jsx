
import styled from 'styled-components'

function Button({name, icon, onClick, bg, bPad, color, bRad, responsiveStyles}) {
    return (
        <ButtonStyled style={{
            background: bg,
            padding: bPad,
            borderRadius: bRad,
            color: color,
            ...responsiveStyles?.default,
        }}
        responsiveStyles={responsiveStyles} 
        onClick={onClick}>
            {icon}
            {name}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;

     @media (max-width: 768px) {
        ${({ responsiveStyles }) => responsiveStyles?.mobile && `
            background: ${responsiveStyles.mobile.bg || 'var(--primary-color)'};
            padding: ${responsiveStyles.mobile.bPad || '0.1rem'};
            border-radius: ${responsiveStyles.mobile.bRad || '10px'};
            color: ${responsiveStyles.mobile.color || '#fff'};
            font-size: ${responsiveStyles.mobile.fontSize || '0.9rem'};
        `}
    }

     @media (max-width: 480px) {
        ${({ responsiveStyles }) => responsiveStyles?.small && `
            padding: ${responsiveStyles.small.bPad || '0.1rem'};
            font-size: ${responsiveStyles.small.fontSize || '0.8rem'};
        `}
    }
`;


export default Button