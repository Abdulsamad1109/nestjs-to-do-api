import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: any ) {
    const userId = req.user.id
    return this.todoService.create(createTodoDto, userId);
  }

  @Get('allTodos')
  findAll() {
    return this.todoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('allMyTodos')
  findAllMyTodos(@Req() req: any) {
    const userId = req.user.id
    return this.todoService.findAllMyTodos(userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
  //   return this.todoService.update(+id, updateTodoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.todoService.remove(+id);
  // }
}
