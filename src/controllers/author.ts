import { NextFunction, Request, Response } from "express";
import { Author } from "../models/author";
import { books } from "./books";

export let authors: Author[] = [
  { id: 1, name: "Rachel Hollis" },
  { id: 2, name: "Rhonda Byrne" }
];

export const getAllAuthors = (req:Request, res:Response, next:NextFunction) => {
 try {

   res.status(200).json(authors);

 } catch (error) {
   next(error);

 }
}

export const getAuthorById = (req:Request, res:Response, next:NextFunction) => {
  try {
    
    const {id} = req.params;

    const author = authors.find((author) => {
    return author.id === parseInt(id);
  });

    if(!author){
    return next({ status: 404, message: "Author not found" })

  }

  res.status(200).json(author)

  } catch (error) {
    next(error)
  }
};


export const addAuthor = (req:Request, res:Response, next:NextFunction) => {
  try {

     const {name} = req.body;

       if (authors.find(a => a.name === name)) {
      return next({ status: 409, message: "Author already exists" });
       }

       const newAuthor:Author = {id: authors.length + 1, name}
        authors.push(newAuthor);

        res.status(201).json(newAuthor);

  } catch (error) {
    next(error);
  }
};
    

export const updateAuthor = (req: Request, res: Response, next:NextFunction) => {
  try {
  const { id } = req.params;
  const { name } = req.body;

  const author = authors.find(u => u.id === parseInt(id));

   if (!author) {
    return next({ status: 404, message: "Author not found" });

  }

  if (name) author.name = name;

  res.status(200).json(author);
    
  } catch (error) {
    next(error);
  }
};


export const deleteAuthor = (req: Request, res: Response, next:NextFunction) => {
try {
  
  const { id } = req.params;
  const index = authors.findIndex(a => a.id === parseInt(id));

  if (index === -1) {
    return next({ status: 404, message: "Author not found" });
  }

  authors.splice(index, 1);

  res.status(200).json({ message: "Author successfully deleted"});

} catch (error) {
  next(error);
}
};

export const getBooksByAuthor = (req: Request, res: Response, next:NextFunction) => {
 
  try {

  const { id } = req.params;
  const authorId = parseInt(id);

    const author = authors.find(a => a.id === authorId);

  if (!author) {
    return next({ status: 404, message: "Author not found" });
  }
  
  const authorBooks = books.filter(b => b.authorId === authorId);
  res.status(200).json({ author, books: authorBooks });
    
  } catch (error) {
    next(error);
  }
};