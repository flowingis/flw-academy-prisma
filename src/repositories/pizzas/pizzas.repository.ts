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
    const newPizza = await this.dbContext.prisma.pizza.create({
      data: {
        name,
        pizzaIngredients: {
          create: ingredients.map(ingredientId => ({ ingredientId })),
        },
      },
      select: {
        id: true,
        name: true,
        pizzaIngredients: {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      id: newPizza.id,
      name: newPizza.name,
      ingredients: newPizza.pizzaIngredients.map(
        ({ ingredient }) => ingredient
      ),
    };
  }

  async getById(id: PizzaId): Promise<PizzaDto | null> {
    throw new Error("Method not implemented.");
  }

  delete(id: PizzaId): Promise<PizzaDto | null> {
    throw new Error("Method not implemented.");
  }
}
