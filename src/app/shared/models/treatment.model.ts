import { Resource } from '../interfaces';
import { TreatmentCategory } from './treatment-category.model';

export class Treatment implements Resource {
	constructor(
    public id: number,
		public name: string,
		public duration: number,
		public price: number,
		public category: TreatmentCategory,
		public status: boolean,
	) { }
}