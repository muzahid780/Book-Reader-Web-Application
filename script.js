// Sample book data
const books = [
  { id: 1, title: "Parents..", src: "books/sample1.pdf" },
  { id: 2, title: "Paradoxical-Sazid2..", src: "books/sample2.pdf" },
  { id: 3, title: "Paradoxical-Sazid..", src: "books/sample3.pdf" },
  { id: 4, title: "Four Steps to Forgiveness..", src: "books/sample4.pdf" },
  { id: 5, title: "The Divine Reality..", src: "books/sample5.pdf" },
];

let cart = [];
let walletBalance = 5;

function showSection(id) {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  if (id === "admin") renderAdminBookList();
  if (id === "cart") renderCart();
}

function renderBookList(filter = "") {
  const list = document.getElementById("book-list");
  list.innerHTML = "";

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredBooks.length === 0) {
    list.innerHTML = "<li>No books found.</li>";
    return;
  }

  filteredBooks.forEach((book) => {
    const li = document.createElement("li");

    const readBtn = document.createElement("button");
    readBtn.textContent = book.title;
    readBtn.onclick = () => loadBook(book.id);

    const cartBtn = document.createElement("button");
    cartBtn.textContent = "📥 Add to Cart";
    cartBtn.classList.add("add-to-cart");
    cartBtn.onclick = () => addToCart(book);

    li.appendChild(readBtn);
    li.appendChild(cartBtn);
    list.appendChild(li);
  });
}

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

function filterBooks() {
  const input = document.getElementById("search-input");
  renderBookList(input.value);
}

function renderAdminBookList() {
  const list = document.getElementById("admin-book-list");
  list.innerHTML = "";

  books.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = book.title;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌ Remove";
    removeBtn.onclick = () => removeBook(book.id);

    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

function removeBook(bookId) {
  const index = books.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    renderBookList();
    renderAdminBookList();
  }
}

document
  .getElementById("add-book-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("new-title").value;
    const src = document.getElementById("new-src").value;
    const newBook = {
      id: Date.now(),
      title,
      src,
    };
    books.push(newBook);
    renderBookList();
    renderAdminBookList();
    this.reset();
  });

function addToCart(book) {
  if (!cart.find((b) => b.id === book.id)) {
    cart.push(book);
    alert(`"${book.title}" added to cart.`);
    renderCart();
  } else {
    alert("Book is already in cart.");
  }
}

function renderCart() {
  const list = document.getElementById("cart-list");
  const balanceDisplay = document.getElementById("wallet-balance");
  list.innerHTML = "";

  balanceDisplay.textContent = walletBalance;

  if (cart.length === 0) {
    list.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  cart.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = book.title;

    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "⬇️ Download";
    downloadBtn.onclick = () => downloadBook(book);

    li.appendChild(downloadBtn);
    list.appendChild(li);
  });
}

function downloadBook(book) {
  if (walletBalance <= 0) {
    alert("Insufficient wallet balance to download.");
    return;
  }

  walletBalance--;
  document.getElementById("wallet-balance").textContent = walletBalance;

  const link = document.createElement("a");
  link.href = book.src;
  link.download = book.title + ".pdf";
  link.click();
}

document.addEventListener("DOMContentLoaded", () => {
  renderBookList();
  renderCart();
  showSection("home");
});

// handling login
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const status = document.getElementById("login-status");

  // Check credentials
  if (username === "admin@gmail.com" && password === "1234") {
    status.style.color = "blue";
    status.textContent = "Login Successful!";

    //  Now redirect to admin
    showSection("admin");
  } else {
    status.style.color = "blue";
    status.textContent = "Opps! --> Communicate to Admin..";
  }
});
