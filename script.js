// Show one section at a time
function showSection(id) {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => section.classList.remove("active"));

  const selected = document.getElementById(id);
  if (selected) selected.classList.add("active");
}

// Load PDF into the iframe
function loadBook(bookId) {
  showSection("reader");

  const titleEl = document.getElementById("book-title");
  const viewer = document.getElementById("pdf-viewer");

  if (bookId === 1) {
    titleEl.textContent = "The Great Gatsby";
    viewer.src = "books/sample.pdf";
  } else if (bookId === 2) {
    titleEl.textContent = "Moby Dick";
    viewer.src = "books/sample.pdf";
  } else {
    titleEl.textContent = "Book Not Found";
    viewer.src = "";
  }
}
