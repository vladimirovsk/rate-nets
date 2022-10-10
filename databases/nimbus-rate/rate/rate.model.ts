import { Column, DataType, Index, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
	tableName: 'rate',
	timestamps: false
})

export class RateModel extends Model<RateModel> {
	
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;
	
	@Index('indexSymbol')
	@Column({
		type: DataType.STRING(15),
		allowNull: false
	})
	symbol: string;
	
	@Column({
		type: DataType.STRING(29),
		allowNull: false
	})
	rate: string;
	
	@Index('indexRateTime')
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	time: number;
	
	@Index('indexRateBlockStart')
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	block_start: number;
	
	@Column({
		type: DataType.INTEGER,
		defaultValue: 0
	})
	block_end: number;
	
	@Column({
		type: DataType.INTEGER,
		defaultValue: 0
	})
	block_last: number;
	
	@Column({
		type: DataType.INTEGER,
		defaultValue: 0
	})
	status: number;
}