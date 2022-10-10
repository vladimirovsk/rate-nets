import {
	Column,
	Index,
	DataType,
	Model,
	PrimaryKey, Table
} from 'sequelize-typescript';

@Table({
	tableName: 'lost-blocks',
	timestamps: false
})

export class LostBlocksModel extends Model<LostBlocksModel> {
	
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;
	
	@Column({
		type: DataType.INTEGER,
		allowNull: true
	})
	block_start: number;
	
	@Column({
		type: DataType.INTEGER,
		allowNull: true
	})
	block_end: number;
	
	@Column({
		type: DataType.INTEGER,
		defaultValue: 0
	})
	status: number;
	

	
}