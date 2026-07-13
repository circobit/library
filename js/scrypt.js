// Library Array

const library = [];

// Book constructor

function Book(title, nameAuthor, surnameAuthor, pages, read = false) {
	this.id = crypto.randomUUID();
	this.title = title;
	this.nameAuthor = nameAuthor;
	this.surnameAuthor = surnameAuthor;
	this.pages = pages;
	this.read = read;
};

// Function to add books

function addBookToLibrary(title, nameAuthor, surnameAuthor, pages, read) {
	// Instantiate Book object
	const bookToAdd = new Book(title, nameAuthor, surnameAuthor, pages, read);
	// Push Book to library array
	library.push(bookToAdd);
};