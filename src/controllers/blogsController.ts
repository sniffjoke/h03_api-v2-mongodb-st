import {Request, Response} from 'express';
import {ObjectId} from "mongodb";
import {blogsRepository} from "../repositories/blogsRepository";


export const getController = async (req: Request, res: Response) => {
    const blogs = await blogsRepository.getAllBlogs()
    res.status(200).json(blogs)
}

export const getControllerById = async (req: Request, res: Response) => {
    const blogId = new ObjectId(req.params.id)
    const blog = await blogsRepository.findBlogForRender(blogId)
    res.status(200).json(blog)
}

export const postController = async (req: Request, res: Response) => {
    try {
        const newBlog = await blogsRepository.create(req.body)
        const newBlogMap = await blogsRepository.blogMapForRender(newBlog)
        res.status(201).json(newBlogMap)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const putController = async (req: Request, res: Response) => {
    try {
        const blogId = new ObjectId(req.params.id)
        await blogsRepository.updateBlogById(blogId, req.body)
        res.status(204).send('Обновлено')
    } catch (e) {
        res.status(500).send(e)
    }
}

export const deleteController = async (req: Request, res: Response) => {
    try {
        const blogId = new ObjectId(req.params.id)
        await blogsRepository.deleteBlog(blogId)
        res.status(204).send('Удалено');
    } catch (e) {
        res.status(500).send(e)
    }

}

