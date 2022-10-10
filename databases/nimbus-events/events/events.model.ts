import { Column, DataType, Index, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
	tableName: 'events',
	timestamps: false
})

export class EventsModel extends Model<EventsModel> {
	
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;
	
	@Index('dataTextIndex')
	@Column({
		type: DataType.TEXT,
		allowNull: false
	})
	data: string;
	
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
	
	@Index('event_signature')
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	event_signature_id: number;
	
	@Index('event_type_id')
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	event_type_id: number;
	
	@Index('transaction_id')
	@Column({
		type: DataType.INTEGER,
		defaultValue: 0
	})
	transaction_id: number;
}