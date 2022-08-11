// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI Constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function (book) {
  const list = document.querySelector("#book-list");
  // create a row
  const row = document.createElement("tr");
  // add book to the row element
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class = "delete-book">X</a></td>
  `;
  list.appendChild(row);
};

// Delete Book from the list
UI.prototype.deleteBook = function (target) {
  if (target.classList.contains("delete-book")) {
    target.parentElement.parentElement.remove();
    return true;
  }
};

// Clear Fields
UI.prototype.clearFields = function () {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

// Show Alert
UI.prototype.showAlert = function (message, className) {
  const alertMessage = document.createElement("h5");
  alertMessage.textContent = message;
  alertMessage.classList.add(className);
  alertMessage.classList.add("alert");
  document.querySelector(".container h1").append(alertMessage);
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 1000);
};

// Event Listener for addbook
document.querySelector("#book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;
  // instantiate UI
  const ui = new UI();
  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error Alert
    ui.showAlert("Please fill in all fields", "error");
    e.preventDefault();
    return;
  }
  // Instantiate a book
  const book = new Book(title, author, isbn);
  // Add book to list
  ui.addBookToList(book);
  // Clear the fields
  ui.clearFields();
  // Show Success message
  ui.showAlert("Book Added Succesfully!", "success");
  e.preventDefault();
});

// Event listener for delete book
document.querySelector("#book-list").addEventListener("click", function (e) {
  const ui = new UI();
  if (ui.deleteBook(e.target)) {
    // Show Message
    ui.showAlert("Book is removed successfully", "success");
  }
  e.preventDefault();
});
