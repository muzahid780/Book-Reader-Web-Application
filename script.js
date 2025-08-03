// Only runs on reader.html
document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.getElementById("book-title");
  const contentEl = document.getElementById("book-content");

  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("book");

  if (bookId === "1") {
    titleEl.textContent = "The Great Gatsby";
    contentEl.innerHTML = "<p>Chapter 1 content goes here...</p>";
  } else if (bookId === "2") {
    titleEl.textContent = "Moby Dick";
    contentEl.innerHTML = "<p>Call me Ishmael...</p>";
  } else {
    titleEl.textContent = "Book Not Found";
    contentEl.innerHTML = "";
  }
});
