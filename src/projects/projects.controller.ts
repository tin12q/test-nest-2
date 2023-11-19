import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectDto } from './dto/query-project.dto';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { Project } from './entities/project.entity';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { UUID } from 'src/utils/types/uuid';
import { ErrorResponse, OkResponse, OkResponseWithPagination, Response, ResponseWithPagination } from 'src/utils/response-helper';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Projects')
@Controller({
  path: 'projects',
  version: '1',
})
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Response<Project>> {
    //get current user id
    
    return new OkResponse(await this.projectsService.create(createProjectDto)); 
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryProjectDto,
  ): Promise<ResponseWithPagination<Project>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const res = await this.projectsService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
    });
    return new OkResponseWithPagination(
      res,
      res.length === limit
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: UUID): Promise<Response<Project>> {
    const res = await this.projectsService.findOne({ id: id });
    return res? new OkResponse(res) : new ErrorResponse('Project not found', HttpStatus.NOT_FOUND);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: UUID,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Response<Project>> {
    const res = await this.projectsService.update(id, updateProjectDto);
    return res? new OkResponse(res) : new ErrorResponse('Project cannot update', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: UUID): Promise<Response<string>> {
    await this.projectsService.softDelete(id);
    return new OkResponse('Project deleted');
  }
}
