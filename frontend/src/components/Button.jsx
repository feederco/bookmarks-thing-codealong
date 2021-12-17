import styled from "styled-components";

const Button = ({ className, children, onClick, ...props }) => {
  return (
    <ButtonContainer
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div.attrs({ role: "button" })`
  display: flex;
  font-size: 18px;
  font-weight: bold;
  background: rgb(214, 128, 231);
  color: black;
  border: none;
  display: flex;
  padding: 3px 20px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 30px;
  height: 48px;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
    box-shadow: 0 0px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    opacity: 0.6;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`

export default Button;