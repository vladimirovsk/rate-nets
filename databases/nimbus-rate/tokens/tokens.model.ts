import { Column, DataType, Index, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
	tableName: 'tokens',
	timestamps: false
})

export class TokensModel extends Model<TokensModel> {
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;
	
	@Column({
		type: DataType.STRING(50),
		allowNull: false
	})
	address: string;
	
	@Column({
		type: DataType.STRING(50),
		allowNull: false
	})
	address_src: string;
	
	@Column({
		type: DataType.STRING(50),
		allowNull: false
	})
	address_dst: string;
	
	
	@Index('indexTokenSymbol')
	@Column({
		type: DataType.STRING(15),
		allowNull: false
	})
	symbol: string;
	
	@Column({
		type: DataType.STRING(29),
		allowNull: false
	})
	current_rate: string;
	
	@Column({
		type: DataType.INTEGER,
	})
	current_block: number;
	
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		defaultValue: 18,
	})
	decimal: number;
	
	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	})
	active: boolean;
}