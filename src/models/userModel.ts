import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  freezeTableName:true,
  tableName: "todo",
})
export class Todos extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type:DataType.STRING,
    allowNull:false, 
  })
  password!:string

}