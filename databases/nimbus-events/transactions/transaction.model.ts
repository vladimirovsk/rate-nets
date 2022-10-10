import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
	tableName: 'transactions',
	timestamps: false
})

export class TransactionModel extends Model<TransactionModel> {
	
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;
	
	@Column({
		type: DataType.STRING(255),
		allowNull: false
	})
	hash: string;
	
	@Column({
		type: DataType.BIGINT
	})
	block_number: number;
	
	@Column({
		type: DataType.INTEGER
	})
	block_time: number;
	
	@Column({
		type: DataType.INTEGER
	})
	gas: number;
	
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	created_at: number;
	
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	updated_at: number;
	
	@Column({
		type: DataType.INTEGER
	})
	contract_id: number;
	
	@Column({
		type: DataType.INTEGER
	})
	transaction_method_id: number;
}