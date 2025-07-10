import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TodoService {

  constructor(@InjectRepository(Todo) 
  private todoRepository: Repository<Todo>,

  @InjectRepository(User)
  private userRepository: Repository<User>
){}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    try {
      const user = await this.userRepository.findOneBy({id: userId})
      if(!user) throw new NotFoundException('user not found')
      const newTodo = {
        ...createTodoDto,
        user,
      }
      await this.todoRepository.save(newTodo)

      return 'todo created successfully'

    } catch (error) {
      console.error(error)
    }
  }


  async findAll() {
    const todos = await this.todoRepository.find({ relations: ['user'] });
    return todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      userId: todo.user.id,
    }));
  }


  async findAllMyTodos(userId: number) {
    return await this.todoRepository.find({where: {user: {id: userId}}})

  }

  // async update(id: string, updateTodoDto: UpdateTodoDto) {
  //   try {
  //         // checks if the user exist
  //         const user = await this.todoRepository.findOneBy({id});
  //         if(!user) throw new NotFoundException(`user with id ${id} not found`);
    
  //         await this.todoRepository.update(user.id, updateTodoDto);
  //         return `user with id ${id} updated succesfully`;
          
  //       } catch (error) {
  //         console.error;
  //         throw error;
  //       }
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} todo`;
  // }
}
