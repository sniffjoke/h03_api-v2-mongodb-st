import express from "express";
import {
    deleteController,
    getController,
    getControllerById,
    postController,
    putController
} from "../controllers/blogsController";
import {
    descriptionBlogValidator,
    idBlogValidator,
    nameBlogValidator,
    websiteUrlValidator
} from "../middlewares/blogsValidators";
import {errorMiddleware} from "../middlewares/errorMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";


const router = express.Router();

router.route('/')
    .get(getController)
    .post(
        authMiddleware,
        nameBlogValidator,
        descriptionBlogValidator,
        websiteUrlValidator,
        errorMiddleware,
        postController
    );
router.route('/:id')
    .put(
        authMiddleware,
        idBlogValidator,
        errorMiddleware,
        putController
    )
    .delete(
        authMiddleware,
        idBlogValidator,
        nameBlogValidator,
        websiteUrlValidator,
        descriptionBlogValidator,
        errorMiddleware,
        deleteController
    )
    .get(
        idBlogValidator,
        errorMiddleware,
        getControllerById
    );

export default router
