class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // Add Book
  static addBookToList(book) {
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
  }
  // Show Alert Messages
  static showAlert(message, className) {
    const alertMessage = document.createElement("h5");
    alertMessage.textContent = message;
    alertMessage.classList.add(className);
    alertMessage.classList.add("alert");
    document.querySelector(".container h1").append(alertMessage);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 1000);
  }
  // Delete a book from the list
  static deleteBook(target) {
    if (target.classList.contains("delete-book")) {
      target.parentElement.parentElement.remove();
      return true;
    }
  }
  // Clear form fields
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

console.log(new UI());

// Event Listener for addbook
document.querySelector("#book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;
  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error Alert
    UI.showAlert("Please fill in all fields", "error");
    e.preventDefault();
    return;
  }
  // Instantiate a book
  const book = new Book(title, author, isbn);
  // Add book to list
  UI.addBookToList(book);
  // Clear the fields
  UI.clearFields();
  // Show Success message
  UI.showAlert("Book Added Succesfully!", "success");
  e.preventDefault();
});

// Event listener for delete book
document.querySelector("#book-list").addEventListener("click", function (e) {
  if (UI.deleteBook(e.target)) {
    // Show Message
    UI.showAlert("Book is removed successfully", "success");
  }
  e.preventDefault();
});
