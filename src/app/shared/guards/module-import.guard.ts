export function throwIfAlreadyLoaded(module: any) {
	if (module) {
    throw new TypeError(`
      ${ module.constructor.name } 
      has already been loaded. Import this module in the AppModule only.
    `);
	}
}