import { Column, DataType, Index, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
	tableName: 'black_data_events_blocks',
	timestamps: true
})

export class DataEventsBlockModel extends Model<DataEventsBlockModel> {
	
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;
	
	@Index('contractNameIndex')
	@Column({
		type: DataType.STRING(255),
		allowNull: false
	})
	contractName: string;
	
	@Column({
		type: DataType.BIGINT,
	})
	blockNumber: number;
	
	@Column({
		type: DataType.INTEGER,
	})
	blockTime: number;
	
	@Column({
		type: DataType.STRING(255),
	})
	event: string;
	
	@Column({
		type: DataType.JSON,
	})
	data: string;
	
	@Column({
		type: DataType.BOOLEAN,
	})
	processingStatus: boolean;
	
	@Column({
		type: DataType.BOOLEAN,
	})
	isAddedToEventUpdateTable: boolean;
	
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	processingTime: number;
}