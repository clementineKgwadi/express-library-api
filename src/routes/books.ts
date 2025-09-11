import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { getAllBooks, getBookById, addBook, updateBook, deleteBook } from "../controllers/books";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);

bookRouter.get(
  "/:id",
  [param("id").isInt().withMessage("ID must be an integer")],

  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    getBookById(req, res);
  }
);


bookRouter.post(
  "/",
  [
    body("authorId").isInt().withMessage("author ID must be an integer"),
    body("title").notEmpty().withMessage("Title is required"),
    body("year").isInt().withMessage("Year is required and must be an integer")
  ],

  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    addBook(req, res);
  }
);


bookRouter.put(
  "/:id",
  [
    param("id").isInt().withMessage("ID must be an integer"),
    body("authorId").optional().isInt().withMessage("author ID must be an integer"),
    body("title").optional().notEmpty().withMessage("Title is required"),
    body("year").optional().isInt().withMessage("Year is required and must be an integer"
),
  ],

  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateBook(req, res);
  }
);


bookRouter.delete(
  "/:id",
  [param("id").isInt().withMessage("ID must be an integer")],

  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    deleteBook(req, res);
  }
);

export default bookRouter;
