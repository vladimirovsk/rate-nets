import { EventsByNameAndTitleDto, EventsByNameAndTitlePeriodDto } from './events.dto';

export interface IContractEventsController {
	getEventByNameAndTitle(dto:EventsByNameAndTitleDto): Promise<any>;
	getEventByNameAndTitleAndPeriod(dto:EventsByNameAndTitlePeriodDto):Promise<any>
}