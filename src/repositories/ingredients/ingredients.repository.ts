import { IDbContext } from "../../context";
import { IngredientDto, IngredientId } from "../../dtos";
import { Pagination, Sorting } from "../../models";
import { IIngredientsRepository } from "./ingredients.repository.model";

export class IngredientsRepository implements IIngredientsRepository {
  constructor(private readonly dbContext: IDbContext) {}

  search(opts: {
    query?: string;
    sorting?: Sorting<IngredientDto>;
    pagination?: Pagination;
  }): Promise<IngredientDto[]> {
    throw new Error("Method not implemented.");
  }

  add(name: string): Promise<IngredientDto> {
    throw new Error("Method not implemented.");
  }

  async getById(id: IngredientId): Promise<IngredientDto | null> {
    throw new Error("Method not implemented.");
  }

  delete(id: IngredientId): Promise<IngredientDto | null> {
    throw new Error("Method not implemented.");
  }
}
