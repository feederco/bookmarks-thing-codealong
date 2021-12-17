import { useState } from "react";
import styled from "styled-components";
import logo from "../images/logo.png";
import Button from "./Button";
import AddBookmarkForm from "./AddBookmarkForm";

const Header = ({ shouldReload }) => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <HeaderContainer>
      <HeaderLogo src={logo} />

      <Button onClick={() => { setShowAdd(true) }}>
        Add bookmark 🦄
      </Button>

      {showAdd ? (
        <ModalOverlay>
          <ModalContent>
            <AddBookmarkForm
              shouldClose={() => { setShowAdd(false) }}
              didAdd={() => {
                setShowAdd(false);
                shouldReload();
              }}
            />
          </ModalContent>
        </ModalOverlay>
      ) : null}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  padding: 0px 20px;
  align-items: center;
`

const HeaderLogo = styled.img`
  width: 200px;
  margin-right: auto;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
`

export default Header;