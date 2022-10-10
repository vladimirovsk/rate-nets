import { EventsName } from '../../../../../constants/events';
import { TokenName } from '../../../../../constants/token';

export interface IContractEventsController {
  getEventByNameAndTitle(name: EventsName, title: TokenName): Promise<any>;
}