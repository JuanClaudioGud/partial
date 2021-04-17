import { Injector } from '@angular/core';

export class AppInjector {

	private static _instance: Injector;

	constructor() { }

	public static get instance() {
		return AppInjector._instance;
	}

	public static set instance(injectorRef: Injector) {
		AppInjector._instance = injectorRef;
	}

}