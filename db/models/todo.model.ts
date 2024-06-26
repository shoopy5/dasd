import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class Todo extends Model<Todo> {
  @Column({
    allowNull: false,
  })
  text: string;

  @Column({
    allowNull: false,
    defaultValue: false,
  })
  isCompleted: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
