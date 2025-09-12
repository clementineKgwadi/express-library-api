import { Request, Response } from "express";
import { Author } from "../models/author";
import { books } from "./books";

export let authors: Author[] = [
  { id: 1, name: "Rachel Hollis" },
  { id: 2, name: "Rhonda Byrne" }
];

export const getAllAuthors = (req:Request, res:Response) => {
  res.status(200).json(authors);
}

export const getAuthorById = (req:Request, res:Response) => {
  const {id} = req.params;

  const author = authors.find((author) => {
    return author.id === parseInt(id);
  })

  if(!author){
    return res.status(404).json({ error: "Author not Found" })
  }
  res.status(200).json(author)
}

export const addAuthor = (req:Request, res:Response) => {
     const {name} = req.body;
        const newAuthor:Author = {id: authors.length + 1, name}

        authors.push(newAuthor);

        res.status(201).json(newAuthor);
}

export const updateAuthor = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const author = authors.find(u => u.id === parseInt(id));

  if (!author) {
    return res.status(404).json({ error: "Author not Found" });
  }

  if (name) author.name = name;

  res.status(200).json(author);
};

export const deleteAuthor = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = authors.findIndex(a => a.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Author not found" });
  }

  const deletedAuthor = authors.splice(index, 1);

  res.status(200).json({ message: "Author successfully deleted"});
};

export const getBooksByAuthor = (req: Request, res: Response) => {
  const { id } = req.params;
  const authorId = parseInt(id);

  const author = authors.find(a => a.id === authorId);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const authorBooks = books.filter(b => b.authorId === authorId);
  res.status(200).json({ author, books: authorBooks });
};