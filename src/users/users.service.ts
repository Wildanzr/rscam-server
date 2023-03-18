import { InjectRepository, Repository } from '@blendedbot/nest-couchdb';
import { BadRequestException, Injectable } from '@nestjs/common';
import nano from 'nano';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async checkUsernameAndEmail(
    username: string,
    email: string,
  ): Promise<boolean> {
    const user = await this.userRepository
      .find({
        selector: {
          username,
          email,
        },
      })
      .then((res) => {
        return res.docs[0];
      });

    if (user) {
      throw new BadRequestException('Username or email is already taken');
    }

    return false;
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<nano.DocumentInsertResponse> {
    const user = await this.userRepository.insert({
      fullname: createUserDto.fullname,
      email: createUserDto.email,
      username: createUserDto.username,
      password: createUserDto.password,
      role: createUserDto.role,
      status: true,
      picture: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      _id: `${new Date().getTime()}`,
    });

    return user;
  }

  findAll(): any {
    const result = this.userRepository
      .list({ include_docs: true })
      .then((res) => {
        return res.rows.map((row) => row.doc);
      });

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
