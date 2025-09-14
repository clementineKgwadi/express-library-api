import { NextFunction, Request, Response } from "express";
import { Book } from "../models/books";
import { authors } from "./author";

export let books: Book[] = [
  { id: 1, authorId:1, title: "Introduction to Algorithms", year: 2022 },
  { id: 2, authorId: 2, title: "Javascript:The Good Parts", year: 2008 }
];

export const getAllBooks = (req: Request, res: Response, next:NextFunction) => {
  try {

     res.status(200).json(books);

  } catch (error) {
    next(error);
  }
};

export const getBookById = (req: Request, res: Response, next:NextFunction) => {
  try {
    
  const { id } = req.params;
  const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return next({ status: 404, message: "Book not found" });
  }
  res.status(200).json(book);

  } catch (error) {
    next(error);
    
  }

};

export const addBook = (req: Request, res: Response, next:NextFunction) => {
  try {

  const {authorId, title, year} = req.body;

  if(!authorId || !title || !year) {
    return next({ status:400, message: "authorId, title, and year are required" });
  }

  const authorExists = authors.find(a => a.id === authorId);

  if (!authorExists) {
    return next({ status:400, message:"Invalid authorId: no author found with this ID." });
  }

  const newBook: Book = { id: books.length + 1, authorId, title, year };
  books.push(newBook);

  res.status(201).json(newBook);

  } catch (error) {
    next(error);
  }
};

export const updateBook = (req: Request, res: Response, next:NextFunction) => {
  try {
     
    const {id} = req.params;
    const {authorId, title, year} = req.body;

    const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return next({ status:404, message: "Book not found" });
  }

  if (authorId) {
    const authorExists = authors.find(a => a.id === authorId);

    if (!authorExists) {
      return next({ status: 400, message:"Invalid authorId: no author found with this ID." });
    }

    book.authorId = authorId;
  }

  if (title) book.title = title;
  if (year) book.year = year;

  res.status(200).json(book);
    
  } catch (error) {
    next(error);
  }

};

export const deleteBook = (req: Request, res: Response, next:NextFunction) => {
  try {

   const { id } = req.params;
  const index = books.findIndex(b => b.id === parseInt(id));

  if (index === -1) {
    return next({status:404, message: "Book not found" });
  }

  books.splice(index, 1);
    res.status(200).json({ message: "Book deleted successfully" });

  } catch (error) {
    next(error);
  }
 
};