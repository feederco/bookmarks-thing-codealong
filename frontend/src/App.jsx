import { useCallback, useEffect, useState } from "react";
import HomeScreen from "./HomeScreen";
import { alertError } from "./data/helpers";
import { bookmarkActions } from "./data/bookmarkActions";

function App({ className }) {
  const [articles, setArticles] = useState([]);

  const reloadBookmarks = useCallback(() => {
    bookmarkActions.loadBookmarks()
      .then(articles => setArticles(articles))
      .catch(e => alertError(e))
  }, []);

  useEffect(() => {
    reloadBookmarks();
  }, []);

  return (
    <div>
      <HomeScreen
        articles={articles}
        shouldReload={reloadBookmarks}
      />
    </div>
  );
}

export default App;
