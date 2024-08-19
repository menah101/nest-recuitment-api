import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from 'src/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schema/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { ADMIN_ROLE } from 'src/databases/sample';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const { name, description, isActive, permissions } = createRoleDto;

    const isExist = await this.roleModel.findOne({ name });
    if (isExist)
      throw new BadRequestException(`Permission with name=${name} is exist`);

    const newRole = await this.roleModel.create({
      name,
      description,
      isActive,
      permissions,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });

    return {
      _id: newRole?._id,
      createdAt: newRole?.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.roleModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.roleModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('not found permission');
    }
    return (await this.roleModel.findById(id)).populate({
      path: 'permissions',
      select: { _id: 1, apiPath: 1, name: 1, description: 1, module: 1 },
    });
  }

  async update(_id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    const { name, description, isActive, permissions } = updateRoleDto;

    const updated = await this.roleModel.updateOne(
      { _id },
      {
        description,
        isActive,
        name,
        permissions,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );

    return updated;
  }

  async remove(_id: string, user: IUser) {
    const foundRole = await this.roleModel.findById(_id);
    if (foundRole.name === ADMIN_ROLE) {
      throw new BadRequestException('cannot be deleted account admin');
    }

    await this.roleModel.updateOne(
      { _id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.roleModel.softDelete({ _id });
  }
}
