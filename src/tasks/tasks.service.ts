import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDTO } from './dto/tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  //private dataDB: TaskDTO[] = [];
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

  async getAllTasks():Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTask(id: number):Promise<Task | null> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async create(task: TaskDTO): Promise<Task> {
    return this.taskRepository.save(task);
  }
/*
  createDataTask(task: any): any {
    return this.taskRepository.create(task);
  }
*/
  /*
  getAllTasks() {
    return this.dataDB;
  }

  getTask(id: number) {
    console.log(id);
    const data = this.dataDB.find((task) => task.id === id);

    if (!data) {
      return new NotFoundException(`Error no se encontro data con el id ${id}`);
    }
    return data;
  }

  createDataTask(task: any): TaskDTO {

    const data ={
      ...task,
      id: this.dataDB.length + 1,
    }
    this.dataDB.push(data);
    //console.table(task);
    //console.log(task);
    return data
  }
    */
}
