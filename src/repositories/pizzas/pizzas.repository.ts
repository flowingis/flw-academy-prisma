import { IDbContext } from "../../context";
import { IngredientId, PizzaDto, PizzaId } from "../../dtos";
import { Pagination, Sorting } from "../../models";
import { IPizzasRepository } from "./pizzas.repository.model";

export class PizzasRepository implements IPizzasRepository {
  constructor(private readonly dbContext: IDbContext) {}

  async search(opts: {
    query?: string;
    sorting?: Sorting<PizzaDto, "id" | "name">;
    pagination?: Pagination;
  }): Promise<PizzaDto[]> {
    throw new Error("Method not implemented.");
  }

  async add(name: string, ingredients: IngredientId[]): Promise<PizzaDto> {
    throw new Error("Method not implemented.");
  }

  async getById(id: PizzaId): Promise<PizzaDto | null> {
    throw new Error("Method not implemented.");
  }

  delete(id: PizzaId): Promise<PizzaDto | null> {
    throw new Error("Method not implemented.");
  }
}
