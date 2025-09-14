import { Router, Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { getAllAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor, getBooksByAuthor } from "../controllers/author";

const router = Router();

router.get("/", getAllAuthors);

router.get("/:id", 
    [param("id").isInt().withMessage("ID must be an integer")],
    (req:Request, res:Response, next:NextFunction) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        getAuthorById(req, res, next);
    }
);

router.post("/",
    [body("name").notEmpty().withMessage("Author name is required")],
    (req:Request, res:Response, next:NextFunction) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json( {errors: errors.array()} )
        }

        addAuthor(req, res, next);
    }
);

router.put(
  "/:id",
  [
    param("id").isInt().withMessage("ID must be an integer"),
    body("name").optional().notEmpty().withMessage("Author name is required")
  ],

  (req: Request, res: Response, next:NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateAuthor(req, res, next);
  }
);

router.delete(
  "/:id",
  [param("id").isInt().withMessage("ID must be an integer")],

  (req: Request, res: Response, next:NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    deleteAuthor(req, res, next);
  }
);

router.get(
  "/:id/books",
  [param("id").isInt().withMessage("ID must be an integer")],

  (req: Request, res: Response, next:NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    getBooksByAuthor(req, res, next);
  }
);

export default router;