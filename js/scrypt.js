// Library Array

const library = [];

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
// The process of indicating the parameters the functions needs
// to look for is called 'destructuring'. Whenever an object is passed
// to the function, it will look for those parameters.
function Book({title, nameAuthor, surnameAuthor, pages, read = false}) {
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