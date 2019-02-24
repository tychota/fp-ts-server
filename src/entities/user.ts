import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { TUser } from "validators/user";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ length: 50 })
  public firstName!: string;

  @Column({ length: 50 })
  public lastName!: string;

  @Column("date")
  public birthDate!: Date;

  @Column("date")
  public registrationDate!: Date;

  @Column({ length: 50 })
  public directory!: string;
}

export const createUserEntityFromData = (data: TUser): User => {
  const user = new User();
  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.birthDate = data.birthDate;
  user.registrationDate = data.registrationDate;
  return user;
};
