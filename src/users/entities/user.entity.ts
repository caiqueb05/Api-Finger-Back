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
  @Column({ type: DataType.NUMBER, defaultValue: DataType.NUMBER })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  nome: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  senha: string;
}
