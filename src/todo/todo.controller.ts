import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.USER)
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: any ) {
    const userId = req.user.userId
    return this.todoService.create(createTodoDto, userId);
  }



  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allTodos')
  @Roles(Role.ADMIN)
  findAll() {
    return this.todoService.findAll();
  }


  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allMyTodos')
  @Roles(Role.USER)
  findAllMyTodos(@Req() req: any) {
    const userId = req.user.userId
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
