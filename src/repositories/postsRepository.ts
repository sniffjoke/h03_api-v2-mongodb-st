import {PostDBType} from "../types/db.interface";
import {blogCollection, postCollection} from "../db/mongo-db";
import {DeleteResult, ObjectId, UpdateResult} from "mongodb";
import {PostDBTypeResponse} from "../types/db.response.interface";
import {blogsRepository} from "./blogsRepository";
import {Request, Response} from "express";


export const postsRepository = {
    async getAllPosts() {
        const posts = await postCollection.find().toArray()
        return posts.map((post: any) => this.postMapForRender(post))
    },

    async create(newPost: PostDBType): Promise<any> {

        const post = {
            ...newPost,
            blogId: newPost.blogId,
            createdAt: new Date(Date.now()).toISOString()
        }
        await postCollection.insertOne(post)
        return post
    },

    async findPostById(postId: ObjectId) {
        return await postCollection.findOne({_id: postId})
    },

    async updatePostById(postId: ObjectId, post: PostDBType): Promise<UpdateResult> {
        const findedPost = await this.findPostById(postId)
        const updates = {
            $set: {
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
            }
        }
        const updatedPost = await postCollection.updateOne({_id: findedPost?._id}, updates)
        return updatedPost
    },

    async  findBlogNameById (blogId: ObjectId) {
        const blog = await blogCollection.findOne({_id: blogId})
        console.log(blog?.name)
        return blog?.name
    },

    async findPostForRender(postId: ObjectId) {
        const post = await this.findPostById(postId)
        return this.postMapForRender(post as any)
    },

    async postMapForRender(post: PostDBTypeResponse) {
        const {createdAt, title, shortDescription, content, _id, blogId} = post
        const blogName = await this.findBlogNameById(new ObjectId(post.blogId))
        return {
            id: _id,
            title,
            shortDescription,
            content,
            blogId,
            blogName,
            createdAt
        }
    },

    async postDelete(postId: ObjectId): Promise<DeleteResult> {
        return await postCollection.deleteOne({_id: postId})
    }

}
