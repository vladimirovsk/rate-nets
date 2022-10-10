import { Column, DataType, Index, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
	tableName: 'event_types',
	timestamps: false
})

export class EventTypeModel extends Model<EventTypeModel> {
	
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;
	
	@Index('dataTitleTextIndex')
	@Column({
		type: DataType.STRING(255),
		allowNull: false
	})
	title: string;
	
	
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
}