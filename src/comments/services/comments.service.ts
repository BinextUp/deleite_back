import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/services/users.service';
import { UserActiveInterface } from '../../utils/interfaces/user-active.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly usersService: UsersService,
  ) {}
  async create(createCommentDto: CreateCommentDto,userActive: UserActiveInterface): Promise<Comment> {
    await this.usersService.getUser(userActive.id);
    createCommentDto.user_id = userActive.id;
    return this.commentsRepository.save(createCommentDto);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find();
  }
  async findAllByUser(userActive: UserActiveInterface): Promise<Comment[]> {
    return this.commentsRepository.find({ where: { user_id: userActive.id } });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new BadRequestException('Comentario no encontrado');
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);
    return this.commentsRepository.update(id, updateCommentDto).then(() => this.findOne(id));
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);
    await this.commentsRepository.delete(id);
  }
}
