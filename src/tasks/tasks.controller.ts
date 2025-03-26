import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDTO } from './dto/tasks.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  //TODO:este contructor es muy parecido al de laravel this.tasksService
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  //TODO: el ParseIntPipe es para que el id sea un numero
  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTask(id);
  }

  @Post()
  async createTask(@Body() task: TaskDTO): Promise<Task> {
    return this.tasksService.create(task);
  }
  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.remove(id);
  }

}
