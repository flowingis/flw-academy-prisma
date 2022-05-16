import { Prisma } from "@prisma/client";
import { IDbContext } from "../../context";
import { IngredientId, PizzaDto, PizzaId } from "../../dtos";
import { Pagination, Sorting } from "../../models";
import { IPizzasRepository } from "./pizzas.repository.model";

const PIZZA_SELECT = {
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
} as const;

const mapPizza = (
  pizza: Prisma.PizzaGetPayload<typeof PIZZA_SELECT>
): PizzaDto => ({
  id: pizza.id,
  name: pizza.name,
  ingredients: pizza.pizzaIngredients.map(({ ingredient }) => ingredient),
});

export class PizzasRepository implements IPizzasRepository {
  constructor(private readonly dbContext: IDbContext) {}

  async search(opts: {
    query?: string;
    sorting?: Sorting<PizzaDto, "id" | "name">;
    pagination?: Pagination;
  }): Promise<PizzaDto[]> {
    const results = await this.dbContext.prisma.pizza.findMany({
      where: opts.query
        ? {
            OR: [
              {
                name: {
                  contains: opts.query,
                },
              },
              {
                pizzaIngredients: {
                  some: {
                    ingredient: {
                      name: {
                        contains: opts.query,
                      },
                    },
                  },
                },
              },
            ],
          }
        : undefined,
      skip: opts.pagination?.offset,
      take: opts.pagination?.limit,
      orderBy: opts.sorting?.map(([field, direction]) => ({
        [field]: direction,
      })),
      ...PIZZA_SELECT,
    });

    return results.map(mapPizza);
  }

  async add(name: string, ingredients: IngredientId[]): Promise<PizzaDto> {
    const newPizza = await this.dbContext.prisma.pizza.create({
      data: {
        name,
        pizzaIngredients: {
          create: ingredients.map(ingredientId => ({ ingredientId })),
        },
      },
      ...PIZZA_SELECT,
    });

    return mapPizza(newPizza);
  }

  async getById(id: PizzaId): Promise<PizzaDto | null> {
    throw new Error("Method not implemented.");
  }

  delete(id: PizzaId): Promise<PizzaDto | null> {
    throw new Error("Method not implemented.");
  }
}
