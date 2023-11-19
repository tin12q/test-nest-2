/* eslint-disable prettier/prettier */
import {
  Column,
  AfterLoad,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../statuses/entities/status.entity';
import { FileEntity } from '../../files/entities/file.entity';
import bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { Exclude, Expose } from 'class-transformer';
import { UserToTask } from 'src/tasks/entities/user-to-task.entity';
import { TeamToUser } from 'src/teams/entities/team-to-user.entity';
import { RoomToUser } from 'src/chat/entities/room-to-user.entity';
import { CustomerToUser } from 'src/customers/entities/customer-to-user.entity';

@Entity()
export class User extends EntityHelper {

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null;

  @ManyToOne(() => Role, {
    eager: true,
  })
  role?: Role | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @OneToMany(() => UserToTask, (userToTask) => userToTask.user,{nullable: true})
  userToTask?: UserToTask[];

  @OneToMany(() => TeamToUser, (teamToUser) => teamToUser.user,{nullable: true})
  teamToUser?: TeamToUser[];

  @OneToMany(() => RoomToUser, (roomToUser) => roomToUser.user,{nullable: true})
  roomToUser?: RoomToUser[];

  @OneToMany(() => CustomerToUser, (customerToUser) => customerToUser.user,{nullable: true})
  customerToUsers?: CustomerToUser[];
  @DeleteDateColumn()
  deletedAt: Date;
}
