// Book data
const books = [
  {
    id: 1,
    title: "Parents..",
    src: "books/sample1.pdf",
  },
  {
    id: 2,
    title: "Paradoxical-Sazid2..",
    src: "books/sample2.pdf",
  },
  {
    id: 3,
    title: "Paradoxical-Sazid..",
    src: "books/sample3.pdf",
  },
  {
    id: 4,
    title: "Four Steps to Forgiveness..",
    src: "books/sample4.pdf",
  },
  {
    id: 5,
    title: "The Divine Reality..",
    src: "books/sample5.pdf",
  },
];

//  Show only the selected section (but ignore the banner)
function showSection(id) {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    // Skip the banner section – keep it always visible
    if (section.id === "banner") return;

    if (section.id === id) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

// Render the book list dynamically
function renderBookList(filter = "") {
  const list = document.getElementById("book-list");
  list.innerHTML = ""; // clear existing

  // Filter books by title (case insensitive)
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredBooks.length === 0) {
    list.innerHTML = "<li>No books found.</li>";
    return;
  }

  filteredBooks.forEach((book) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = book.title;
    btn.onclick = () => loadBook(book.id);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

//  Load PDF into iframe
function loadBook(bookId) {
  showSection("reader");

  const book = books.find((b) => b.id === bookId);
  const titleEl = document.getElementById("book-title");
  const viewer = document.getElementById("pdf-viewer");

  if (book) {
    titleEl.textContent = book.title;
    viewer.src = book.src;
  } else {
    titleEl.textContent = "Book Not Found";
    viewer.src = "";
  }
}

//  Filter books on search input
function filterBooks() {
  const input = document.getElementById("search-input");
  renderBookList(input.value);
}

//  Initial setup on page load
document.addEventListener("DOMContentLoaded", () => {
  renderBookList();
  showSection("home");
});
