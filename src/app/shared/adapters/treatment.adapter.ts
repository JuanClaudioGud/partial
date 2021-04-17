import { Adapter } from '../interfaces';
import { Treatment } from '../models';
import { TreatmentCategoryAdapter } from './treatment-category.adapter';

export class TreatmentAdapter implements Adapter<Treatment> {

  constructor() {}

  public deserialize(data: any): Treatment {
    return new Treatment(
      data.id,
      data.name,
      data.duration,
      data.price,
      new TreatmentCategoryAdapter().deserialize(data.category),
      data.status,
    );
  }

  public serialize(data: Treatment): any {
    return {
      id: data.id,
      name: data.name,
      duration: data.duration,
      price: data.price,
      category: data.category.id,
      status: data.status,
    };
  }

}