import { PrismaClient } from "@prisma/client";

const ingredients: string[] = [
  "Pomodoro",
  "Mozzarella",
  "Farina",
  "Salamino Piccante",
  "Wustel",
];
const pizzas: Array<{
  name: string;
  ingredients: number[];
}> = [
  {
    name: "Margherita",
    ingredients: [1, 2, 3],
  },
  {
    name: "Salamino Piccante",
    ingredients: [1, 2, 3, 4],
  },
  {
    name: "Wustel",
    ingredients: [1, 2, 3, 5],
  },
];

async function seed(): Promise<void> {
  console.log("Seeding start...");
  const prisma = new PrismaClient();
  await prisma.$connect();

  try {
    if ((await prisma.ingredient.count()) === 0) {
      console.log("Seeding run...");
      await prisma.$transaction(async prisma => {
        for (const ingredient of ingredients) {
          const newIngredient = await prisma.ingredient.create({
            data: {
              name: ingredient,
            },
          });
        }

        for (const pizza of pizzas) {
          const newPizza = await prisma.pizza.create({
            data: {
              name: pizza.name,
              pizzaIngredients: {
                create: pizza.ingredients.map(id => ({ ingredientId: id })),
              },
            },
          });
        }
      });
    } else {
      console.log("Seeding already run...");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
  console.log("Seeding end...");
}

seed().catch(err => {
  console.error(`Error seeding: ${err}`);
});
