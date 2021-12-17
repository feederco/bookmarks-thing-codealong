import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { ArticleLink } from "./shared/Article";
import Button from "./Button";
import { bookmarkActions } from "../data/bookmarkActions";
import { alertError } from "../data/helpers";

const ArticleReader = ({ article, didDelete }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (!content) {
      // loadContent();
    }
  }, [content]);

  const deleteBookmark = useCallback(() => {
    bookmarkActions.deleteBookmark(article._id)
      .then(() => didDelete(article))
      .catch(e => alertError(e));
  }, [article, didDelete]);

  return (
    <Container>
      <h1>{article.title}</h1>
      <ArticleLink href={article.link} target="_blank">
        {article.link}
      </ArticleLink>

      {article.content ? (
        <ArticleContent dangerouslySetInnerHTML={{ __html: article.content }} />
      ) : (
        <LoadingArticle>
          Loading... 👻
        </LoadingArticle>
      )}

      <DeleteButton onClick={deleteBookmark}>
        Delete bookmark
      </DeleteButton>
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid orange;
  margin-left: 30px;
  min-width: 400px;
  padding: 30px;
`

const ArticleContent = styled.div`

`
const LoadingArticle = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DeleteButton = styled(Button)`
  background: red;
`

export default ArticleReader;