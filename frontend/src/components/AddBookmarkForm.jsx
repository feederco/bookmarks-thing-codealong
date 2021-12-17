import { useState, useCallback } from "react";
import styled from "styled-components";
import { bookmarkActions } from "../data/bookmarkActions";
import { alertError } from "../data/helpers";
import Button from "./Button";

const AddBookmarkForm = ({ didAdd, shouldClose }) => {
  const [link, setLink] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const save = useCallback(() => {
    setIsSaving(true);
    bookmarkActions.addBookmark(link)
      .then(() => {
        didAdd();
      })
      .catch(e => alertError(e))
      .finally(() => {
        setIsSaving(false);
      });
  }, [link, didAdd]);

  return (
    <Container>
      <FormHeader>Add bookmark</FormHeader>

      <LinkInput
        value={link}
        onChange={e => setLink(e.target.value)}
      />

      <FormButtons>
        <FormCancel onClick={shouldClose}>
          Cancel
        </FormCancel>
        <FormSave onClick={isSaving ? () => {} : save}>
          {isSaving ? "Saving..." : "Save"}
        </FormSave>
      </FormButtons>
    </Container>
  )
}

const Container = styled.div`
`

const FormHeader = styled.h2`
`

const LinkInput = styled.input`
  font-size: 28px;
  border: 1px solid orange;
  padding: 5px;
  margin-bottom: 10px;
`

const FormButtons = styled.div`
  display: flex;
  flex-direction: row;
`

const FormCancel = styled(Button)`
  margin-right: auto;

`

const FormSave = styled(Button)`
`

export default AddBookmarkForm;