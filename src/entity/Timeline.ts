import { KnownBlock } from "@slack/bolt";
import { ObjectID } from "mongodb";
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ObjectIdColumn,
  BaseEntity,
} from "typeorm";
import { UsersPostEntity } from "./UsersPost";

export interface TimelineConstructorArgs {
  ts: string;
  binedChannelID: string;
  usersPostID: string;
}

@Entity("timeline")
export class TimelineEntity extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    type: "varchar",
    length: 25,
  })
  ts: string;

  @Column({
    type: "varchar",
    length: 10,
  })
  bindedChannelID: string;

  @Column({
    type: "json",
  })
  contents: KnownBlock[];

  @Column({
    type: "string",
  })
  usersPostID: ObjectID;

  @ManyToOne(() => UsersPostEntity, { eager: false })
  @JoinColumn({ name: "usersPostID" })
  usersPosts: UsersPostEntity;

  constructor({ ts, binedChannelID, usersPostID }: TimelineConstructorArgs) {
    super();
    this.ts = ts;
    this.bindedChannelID = binedChannelID;
    this.usersPostID = usersPostID;
  }
}
