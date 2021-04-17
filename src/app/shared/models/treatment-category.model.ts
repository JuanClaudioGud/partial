import { Resource } from '../interfaces';

export class TreatmentCategory implements Resource {
	constructor(
    public id: number,
		public name: string,
		public description: string,
		public status: boolean
	) { }
}