import { Request, Response } from "express";
import { Book } from "../models/books";
import { authors } from "./author";

let books: Book[] = [
  { id: 1, authorId:1, title: "Introduction to Algorithms", year: 2022 },
  { id: 2, authorId: 2, title: "Javascript:The Good Parts", year: 2008 }
];

export const getAllBooks = (req: Request, res: Response) => {
  res.status(200).json(books);
};

export const getBookById = (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(200).json(book);
};


export const addBook = (req: Request, res: Response) => {
  const {authorId, title, year} = req.body;

  const authorExists = authors.find(a => a.id === authorId);

  if (!authorExists) {
    return res.status(400).json({ error: "Invalid author ID: no author found with this ID." });
  }

  const newBook: Book = { id: books.length + 1, authorId, title, year };
  books.push(newBook);

  res.status(201).json(newBook);
};

export const updateBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const { authorId ,title, year } = req.body;

  const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (authorId) {
    const authorExists = authors.find(a => a.id === authorId);

    if (!authorExists) {
      return res.status(400).json({ error: "Invalid authorId: no author found with this ID." });
    }

    book.authorId = authorId;
  }

  if (title) book.title = title;
  if (year) book.year = year;

  res.status(200).json(book);
};

export const deleteBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = books.findIndex(b => b.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const deletedBook = books.splice(index, 1)[0];
  res.status(200).json({ message: "Book deleted" });
};