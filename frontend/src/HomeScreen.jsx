import { useState } from "react";
import styled from "styled-components";
import ArticleReader from "./components/ArticleReader";
import { ArticleLink } from "./components/shared/Article";
import Header from "./components/Header";

const HomeScreen = ({ articles, shouldReload }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  return (
    <Container>
      <Header
        shouldReload={shouldReload}
      />

      <Content>
        <h1>My bookmarks</h1>

        <ArticleViewer>
          <ArticleList>
            {articles.map(article => (
              <ArticleItem
                key={article.id}
                onClick={() => setSelectedArticle(article)}
              >
                <ArticleHeader>{article.title}</ArticleHeader>
                <ArticleLink
                  href={article.link}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                >
                  {article.link}
                </ArticleLink>
                <ArticleContent></ArticleContent>
              </ArticleItem>
            ))}
          </ArticleList>

          {selectedArticle ? (
            <ArticleReader
              article={selectedArticle}
              didDelete={() => {
                setSelectedArticle(null);
                shouldReload();
              }}
            />
          ) : null}
        </ArticleViewer>
      </Content>
    </Container>
  )
}

const Container = styled.div`
`;

const ArticleViewer = styled.div`
  display: flex;
  flex-direction: row;
`

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const ArticleList = styled.div`
  border: 1px solid orange;
  width: 100%;
`

const ArticleItem = styled.div`
  padding: 30px;
  border-bottom: 1px solid orange;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px rgba(110, 187, 245, 0.5);
  }
`

const ArticleHeader = styled.h2`
`


const ArticleContent = styled.div`
`

export default HomeScreen;