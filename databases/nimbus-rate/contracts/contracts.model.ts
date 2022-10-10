import {
	Column,
	Index,
	DataType,
	Model,
	PrimaryKey, Table
} from 'sequelize-typescript';

@Table({
	tableName: 'contracts',
	timestamps: false
})

export class ContractsModel extends Model<ContractsModel> {
	
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;
	
	@Index('indexContractAddress')
	@Column({
		type: DataType.STRING(100),
		allowNull: false,
		unique: true
	})
	address: string;
	
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
		type: DataType.BOOLEAN,
		allowNull: true,
		defaultValue: false
	})
	active: boolean;
	

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		defaultValue: 0
	})
	type: number;
	
	@Index('indexContractBlockEnd')
	@Column({
		type: DataType.INTEGER,
		allowNull: true
	})
	block_last: number;
	
	
}