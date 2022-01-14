import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Users extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  nome: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  senha: string;
}

export default Users;
