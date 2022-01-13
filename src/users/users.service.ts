import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { EmptyResultError } from 'sequelize';
import sequelize from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) {
      throw new HttpException(
        'Esse usuário já existe!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const hash = await bcrypt.hash(createUserDto.senha, 10);
      createUserDto.senha = hash;
      return this.userModel.create(createUserDto);
    }
  }

  async getByEmail(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'Não existe usuário com esse email',
      HttpStatus.BAD_REQUEST,
    );
  }

  async logar(createUserDto: CreateUserDto) {
    await this.getByEmail(createUserDto);
    const user = await this.userModel.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    const isPasswordMatching = await bcrypt.compareSync(
      createUserDto.senha,
      user.senha,
    );
    if (!isPasswordMatching) {
      throw new HttpException('Senha incorreta', HttpStatus.BAD_REQUEST);
    } else {
      return this.userModel.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    }
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findOne({
      where: {
        id,
      },
      rejectOnEmpty: new EmptyResultError('Id não encontrado'),
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const users = await this.findOne(id);
    return users.update(updateUserDto);
  }

  async remove(id: number) {
    const users = await this.findOne(id);
    users.destroy();
    return 'Usuário deletado com sucesso!';
  }
}
