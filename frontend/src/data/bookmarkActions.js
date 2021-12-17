export const bookmarkActions = {
  addBookmark(url) {
    return fetch("http://localhost:3003/bookmarks", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        link: url
      }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(response => {
      return response.json();
    });
  },

  deleteBookmark(bookmarkId) {
    return fetch("http://localhost:3003/bookmarks/" + bookmarkId, {
      method: "DELETE",
      mode: "cors",
    }).then(response => {
      return response.json();
    });
  },

  loadBookmarks() {
    return fetch("http://localhost:3003/bookmarks", {
      method: "GET",
      mode: "cors"
    }).then(response => {
      return response.json();
    });
  }
}
