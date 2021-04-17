import { Adapter } from '../interfaces';
import { TreatmentCategory } from '../models';

export class TreatmentCategoryAdapter implements Adapter<TreatmentCategory> { 

  constructor() {}

  public deserialize(data: any): TreatmentCategory {
    return new TreatmentCategory(
      data.id,
      data.name,
      data.description,
      data.status
    );
  }

  public serialize(data: TreatmentCategory): any {
    return {
      id: data.id,
      name: data.name, 
      description: data.description,
      status: data.status,
    };
  }

}