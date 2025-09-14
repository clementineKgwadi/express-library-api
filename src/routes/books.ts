import { Router, Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { getAllBooks, getBookById, addBook, updateBook, deleteBook } from "../controllers/books";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);

bookRouter.get(
  "/:id",
  [param("id").isInt().withMessage("ID must be an integer")],

  (req: Request, res: Response, next:NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    getBookById(req, res, next);
  }
);


bookRouter.post(
  "/",
  [
    body("authorId").isInt().withMessage("author ID must be an integer"),
    body("title").notEmpty().withMessage("Title is required"),
    body("year").isInt().withMessage("Year is required and must be an integer")
  ],

  (req: Request, res: Response, next:NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    addBook(req, res, next);
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

  (req: Request, res: Response, next:NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateBook(req, res, next);
  }
);


bookRouter.delete(
  "/:id",
  [param("id").isInt().withMessage("ID must be an integer")],

  (req: Request, res: Response, next:NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    deleteBook(req, res, next);
  }
);

export default bookRouter;
