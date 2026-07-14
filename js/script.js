// Library Array
const library = [];

// Counters of metrics
let totalBooks = 0;
let totalBooksRead = 0;
let totalBooksPending = 0;

// Sample books
const sampleBooks = [
  {
    title: "One Hundred Years of Solitude",
    nameAuthor: "Gabriel",
    surnameAuthor: "García Márquez",
    pages: 471,
    read: true,
  },
  {
    title: "The Shadow of the Wind",
    nameAuthor: "Carlos",
    surnameAuthor: "Ruiz Zafón",
    pages: 576,
    read: true,
  },
  {
    title: "Hopscotch",
    nameAuthor: "Julio",
    surnameAuthor: "Cortázar",
    pages: 736,
    read: false,
  },
  {
    title: "Pedro Páramo",
    nameAuthor: "Juan",
    surnameAuthor: "Rulfo",
    pages: 124,
    read: true,
  },
  {
    title: "Fictions",
    nameAuthor: "Jorge Luis",
    surnameAuthor: "Borges",
    pages: 174,
    read: false,
  },
];

// Book constructor
// The process of indicating the parameters the function needs
// to look for, is called 'destructuring'. Whenever an object is passed
// to the function, it will look for those attributes.
function Book({title, nameAuthor, surnameAuthor, pages, read = false}) {
	this.id = crypto.randomUUID();
	this.title = title;
	this.nameAuthor = nameAuthor;
	this.surnameAuthor = surnameAuthor;
	this.pages = pages;
	this.read = read;
};
// Add toggleRead method to the Book prototype (The parent object).
// This way, all the Book objects have that method in one place
// instead of replicating the same function for every object.
Book.prototype.toggleRead = function() {
	// Invert value of 'read' attribute within the Book object
	this.read = !this.read;
};


// Function to add books

function addBookToLibrary(bookObj) {
	// Instantiate Book object
	const bookToAdd = new Book(bookObj);
	// Push Book to library array
	library.push(bookToAdd);
};


// Function to delete book from the library array

function deleteBook(id) {
	// Get index of book in the library array
	const bookIndex = library.findIndex(element => element.id === id);
	// Use splice to remove element from library array
	library.splice(bookIndex, 1);
	// Re-render DOM
	renderAll();
};


// Function to change read state in Book object and re-render DOM

function changeReadState(book) {
	book.toggleRead();
	renderAll();
};


// Function to count and render metrics

function calculateMetrics() {
	// Reset counters
	totalBooks = 0;
	totalBooksRead = 0;
	totalBooksPending = 0;
	// Count metrics
	for (let book of library) {
		if (book.read === true) {
			totalBooksRead++;
		} else {
			totalBooksPending++;
		};
		totalBooks++;
	};
	// Render metrics
	const totalMetricValue = document.getElementById("totalMetricValue");
	totalMetricValue.textContent = totalBooks;
	const readMetricValue = document.getElementById("readMetricValue");
	readMetricValue.textContent = totalBooksRead;
	const pendingMetricValue = document.getElementById("pendingMetricValue");
	pendingMetricValue.textContent = totalBooksPending;
};


// Function to add book card

function renderBookCard(book) {
	//=== Create elements ===//
	// Get booksList div
	const booksList = document.getElementById("booksList");
	// Add bookCard
	const bookCard = document.createElement("div");
	bookCard.className = "bookCard";
	booksList.appendChild(bookCard);
	// Add bookCardTop
	const bookCardTop = document.createElement("div");
	bookCardTop.className = "bookCardTop";
	bookCard.appendChild(bookCardTop);
	// Add breakLine
	const breakLine = document.createElement("hr");
	breakLine.className= "breakLine";
	bookCard.appendChild(breakLine);
	// Add bookCardBottom
	const bookCardBottom = document.createElement("div");
	bookCardBottom.className = "bookCardBottom";
	bookCard.appendChild(bookCardBottom);
	// Add elements in bookCardTop
	const bookTitleAndAuthor = document.createElement("div");
	bookTitleAndAuthor.className = "bookTitleAndAuthor";
	const bookPagesAndStatus = document.createElement("div");
	bookPagesAndStatus.className = "bookPagesAndStatus";
	bookCardTop.appendChild(bookTitleAndAuthor);
	bookCardTop.appendChild(bookPagesAndStatus);
	// Add elements in bookTitleAndAuthor
	const bookTitle = document.createElement("p");
	bookTitle.className = "bookTitle";
	const bookAuthor = document.createElement("p");
	bookAuthor.className = "bookAuthor";
	const bookPages = document.createElement("p");
	bookPages.className = "bookPages";
	bookTitleAndAuthor.appendChild(bookTitle);
	bookTitleAndAuthor.appendChild(bookAuthor);
	// Add elements in bookPagesAndStatus
	const isRead = document.createElement("p");
	isRead.className = "isRead";
	bookPagesAndStatus.appendChild(bookPages);
	bookPagesAndStatus.appendChild(isRead);
	// Add elements in bookCardBottom
	const buttonRead = document.createElement("button");
	buttonRead.className = "readButton";
	bookCardBottom.appendChild(buttonRead);
	const buttonDelete = document.createElement("button");
	buttonDelete.className = "deleteButton";
	buttonDelete.textContent = "Delete";
	bookCardBottom.appendChild(buttonDelete);
	// Add eventListener to buttonRead
	buttonRead.addEventListener('click', () => changeReadState(book));
	// Add eventListener to buttonDelete
	buttonDelete.addEventListener('click', () => deleteBook(book.id));
	//=== Populate elements with text ===//
	bookTitle.textContent = book.title;
	bookAuthor.textContent = book.nameAuthor + " " + book.surnameAuthor;
	bookPages.textContent = book.pages + " pages";
	//=== Set data attribute (id) in bookCard ===//
	bookCard.dataset.id = book.id;
	if (book.read === true) {
		isRead.textContent = "Read";
		buttonRead.textContent = "Mark as unread";
		isRead.style.padding = "0.05rem 0.4rem";
		isRead.style.backgroundColor = "rgb(5, 41, 5)";
		isRead.style.border = "solid rgb(5, 41, 5)";
		isRead.style.borderRadius = "20px";
		isRead.style.color = "rgb(68, 164, 49)";
	} else {
		isRead.textContent = "Pending";
		buttonRead.textContent = "Mark as read";
		isRead.style.padding = "0.05rem 0.4rem";
		isRead.style.backgroundColor = "rgb(28, 28, 28)";
		isRead.style.border = "solid rgb(28, 28, 28)";
		isRead.style.borderRadius = "20px";
		isRead.style.color = "rgb(163, 162, 162)";
	};
};


// Add sample books
sampleBooks.forEach(addBookToLibrary);


// Render books cards

function renderAll() {
	// Get booksList div
	const booksList = document.getElementById("booksList");
	// Delete booksList content to re-render everything
	booksList.innerHTML = "";
	// Re-render from latest state of library
	library.forEach((book) => renderBookCard(book));
	// Calculate and render metrics
	calculateMetrics();
}

renderAll();