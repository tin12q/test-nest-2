import { Project } from 'src/projects/entities/project.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { UserToTask } from 'src/tasks/entities/user-to-task.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@Entity('task')
export class Task extends EntityHelper {
  @Column()
  name?: string;
  @Column({ nullable: true})
  description?: string;

  @Column()
  status?: string;

  @OneToMany(() => UserToTask, (userToTask) => userToTask.task, {cascade: true,nullable: true})
  userToTask?: UserToTask[];

  @ManyToOne(() => Project, (project) => project.tasks, {cascade: true,nullable: true})
  project?: Project;

  @OneToMany(() => Review, (review) => review.task, {cascade: true,nullable: true})
  reviews?: Review[];
}
