import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {

  constructor( @InjectRepository(User) private userRepository: Repository<User> ){}
  
  async create(userDto: CreateUserDto) {
    try {
      // encrypt the user password before saving to DB
      userDto.password = await bcrypt.hash(userDto.password, 10);
      await this.userRepository.save(userDto);
      return 'user registered sucessfully';

    } catch (error) {
      console.error;
      throw error;
    }
  }

    async fetchProfile(req: any) {
    const userProfile = await this.userRepository.findOneBy({id: req.id});

    return userProfile;
  }
  
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      // checks if the user exist
      const user = await this.userRepository.findOneBy({id});
      if(!user) throw new NotFoundException(`user with id ${id} not found`);
      return user

    } catch (error) {
      console.error;
      throw error;
    } 
  }
  
  async findOneByEmail(email: string){
    return await this.userRepository.findOne({
      where: {email},
      select: ['id', 'email', 'password', 'roles']
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      // checks if the user exist
      const user = await this.userRepository.findOneBy({id});
      if(!user) throw new NotFoundException(`user with id ${id} not found`);

      await this.userRepository.update(user.id, updateUserDto);
      return `user with id ${id} updated succesfully`;
      
    } catch (error) {
      console.error;
      throw error;
    }
  }

  async remove(id: number) {
    try {

      const user = await this.userRepository.findOneBy({id});
      if(!user) throw new NotFoundException(`user with id ${id} not found`);

      await this.userRepository.delete(user.id)
      return `user with id ${id} succesfully deleted`;

    } catch (error) {
      console.error;
      throw error;
    }
  }
}
