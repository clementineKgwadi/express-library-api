import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { getAllAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor, getBooksByAuthor } from "../controllers/author";

const router = Router();

router.get("/", getAllAuthors);

router.get("/:id", 
    [param("id").isInt().withMessage("Id must be an integer")],
    (req:Request, res:Response) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        getAuthorById(req, res);
    }
);

router.post("/",
    [body("name").notEmpty().withMessage("Author name is required")],
    (req:Request, res:Response) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json( {errors: errors.array()} )
        }

        addAuthor(req, res);
    }
);

router.put(
  "/:id",
  [
    param("id").isInt().withMessage("ID must be an integer"),
    body("name").optional().notEmpty().withMessage("Author name is required")
  ],

  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateAuthor(req, res);
  }
);

router.delete(
  "/:id",
  [param("id").isInt().withMessage("ID must be an integer")],

  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    deleteAuthor(req, res);
  }
);

router.get(
  "/:id/books",
  [param("id").isInt().withMessage("ID must be an integer")],

  (req: Request, res: Response) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    getBooksByAuthor(req, res);
  }
);

export default router;