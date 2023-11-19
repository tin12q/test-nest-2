import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { Task } from "src/tasks/entities/task.entity";
import { EntityHelper } from "src/utils/entity-helper";
import { UUID } from "src/utils/types/uuid";
import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
@Entity('review')
export class Review extends EntityHelper{
    @Allow()
    @ApiProperty()
    @Column()
    objectId?: UUID;

    @Allow()
    @ApiProperty()
    @Column()
    objectType?: UUID;

    @Allow()
    @ApiProperty()
    @Column()
    title?: string;

    @Allow()
    @ApiProperty()
    @Column()
    description?: string;
    
    @Allow()
    @ApiProperty()
    @Column()
    attachment?: string;

    @Allow()
    @ApiProperty()
    @Column()
    status?: string;

    @ManyToOne(() => Task, (task) => task.reviews)
    task?: Task;
}