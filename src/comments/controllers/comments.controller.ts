import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
//import { ApiBearerAuth } from '@nestjs/swagger';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
//import { Auth } from '../../auth/decorators/auth.decorator';
//import { Rol } from '../../utils/enums/rol.enum';
import { Public } from '../../auth/decorators/public.decorator';
import { UserActiveInterface } from '../../utils/interfaces/user-active.interface';
import { UserActive } from '../../utils/decorators/user-active.decorator';
import { Comment } from '../entities/comment.entity';


@Public()
/*
@ApiBearerAuth()
@Auth(Rol.USER)
*/
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  async create(@Body() createCommentDto: CreateCommentDto, @UserActive() userActive: UserActiveInterface): Promise<Comment> {
    return this.commentsService.create(createCommentDto, userActive);
  }

  @Get('all')
  async findAll() {
    return this.commentsService.findAll();
  }

  @Get('allByUser')
  async findAllByUser(@UserActive() userActive: UserActiveInterface): Promise<Comment[]> {
    return this.commentsService.findAllByUser(userActive);
  }

  @Get('search/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commentsService.remove(id);
  }
}
