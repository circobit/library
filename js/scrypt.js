// Library Array

const library = [];

// Book constructor

function Book(title, nameAuthor, surnameAuthor, pages) {
	this.id = crypto.randomUUID();
	this.title = title;
	this.nameAuthor = nameAuthor;
	this.surnameAuthor = surnameAuthor;
	this.pages = pages;
}

// 