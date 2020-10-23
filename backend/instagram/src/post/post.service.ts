import { ForbiddenException, Injectable } from "@nestjs/common";
import { PostModel, UpdateCaptionDto } from "src/model/post.model";
import { S3Service } from "src/s3/s3.service";
import { PostRepository } from "./post.repository";

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository, private readonly s3Service: S3Service) {}

  async findAll(): Promise<PostModel[]> {
    const posts = await this.postRepository.findAll();
    // return posts;
    return posts.sort((a, b) => b.updatedDate - a.updatedDate);
  }

  async createPost(userId: string, image) {
    return this.postRepository.createPost(userId, image);
  }

  async updateCaption(postId: string, ownerId: string, data: UpdateCaptionDto): Promise<boolean> {
    const post = await this.postRepository.findById(postId);
    if (post._uid !== ownerId) {
      throw new ForbiddenException("You are not post owner");
    }
    return this.postRepository.update(postId, { updatedDate: new Date().getTime(), ...data });
  }

  async findByUserId(uid: string): Promise<PostModel[]> {
    return this.postRepository.findByuserId(uid);
  }

  async toggleLike(postId: string, uid: string) {
    const post: PostModel = await this.postRepository.findById(postId);
    let likeIds;
    if(post.likedBy.includes(uid)) {
      likeIds = post.likedBy.filter((id)=> id!= uid)
    } else {
      likeIds = post.likedBy
      likeIds = likeIds.push(uid)
    }
    return this.postRepository.update(postId, { likeBy: likeIds})
  }
}
