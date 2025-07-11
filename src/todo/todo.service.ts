import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { log } from 'console';

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

  async updateTodo(todoId: number, userId: number, updateTodoDto: UpdateTodoDto) {
    try {
          // find the todo by its id
          const todo = await this.todoRepository.findOne({
            where: {id: todoId},
            relations: ['user']
          })

          // verify that the todo exist
          if (!todo) throw new NotFoundException('Todo not found');

          // verify if the todo belongs to the logged in user
          if (todo.user.id !== userId) {
            throw new ForbiddenException('You are not allowed to update this todo');
          }

          Object.assign(todo, updateTodoDto);
          await this.todoRepository.save(todo);
          return 'todo updated sucessfully'
          
          
        } catch (error) {
          console.error;
          throw error;
        }
  }

  async remove(todoId: number, userId: number) {
    try {
        // find the todo by its id
        const todo = await this.todoRepository.findOne({
          where: {id: todoId},
          relations: ['user']
          })
          // verify if the todo exist
        if (!todo) throw new NotFoundException('Todo not found');

        // verify if the todo belongs to the logged in user
        if (todo.user.id !== userId) {
            throw new ForbiddenException('You are not allowed to delete this todo');
          }

        const deletedTodo = await this.todoRepository.remove(todo)
        return 'todo deleted sucessfully'

    } catch (error) {
      console.error
      throw error
    }
  }
}
