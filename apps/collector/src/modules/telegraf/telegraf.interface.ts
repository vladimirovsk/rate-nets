import {ModuleMetadata} from '@nestjs/common';
import { MiddlewareFn } from 'telegraf';

export interface ITelegrafOptions {
	middlewares: MiddlewareFn<any>[];
	token:string;
}

export interface ITelegrafModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'>{
	useFactory:(...args: any[]) => Promise<ITelegrafOptions> | ITelegrafOptions;
	inject?: any[];
}

