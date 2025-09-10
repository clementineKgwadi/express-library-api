import { Request, Response } from "express";
import { Author } from "../models/author";

let authors: Author[] = [
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
    return res.status(404).send({ error: "Author not Found" })
  }
  res.status(200).json(author)
}

export const addAuthor = (req:Request, res:Response) => {
     const {name} = req.body;
        const newAuthor:Author = {id: authors.length + 1, name}

        authors.push(newAuthor);

        res.status(201).json(newAuthor);
}