import { EventsName } from '../../../../../constants/events';
import {
  ResponseEventService,
  ResponseEventServiceDateRows
} from '../../../../../constants/events/events.responce.dto';


export const ConvertEventsByName= (data: ResponseEventService):ResponseEventService => {
  try {
    if (data != null && data != undefined) {
      switch (data.data.title) {
        case EventsName.Register: {
          const dataConvert: ResponseEventServiceDateRows[] = data.data.data.map(row => {
            row.block = row.block_number;
            row.time = row.block_time;
            delete row.data?.['0'];
            delete row.data?.['1'];
            delete row.data?.['2'];
            delete row.data?.['3'];
            delete row.block_number;
            delete row.block_time;
            return row;
          });
          data.data.data = dataConvert;
          return data;
          break;
        }
        
        case EventsName.BuySystemTokenForToken : {
          const dataConvert: ResponseEventServiceDateRows[] = data.data.data.map(row => {
            row.block = row.block_number;
            row.time = row.block_time;
            delete row.data?.['0'];
            delete row.data?.['1'];
            delete row.data?.['2'];
            delete row.data?.['3'];
            delete row.data?.['4'];
            delete row.data?.['5'];
            delete row.block_number;
            delete row.block_time;
            return row;
          });
          data.data.data = dataConvert;
          return data;
          break;
        }
        default: {
          return data;
          break;
        }
      }
    } else {
      return data;
    }
  }catch (err){
    return data;
  }
};