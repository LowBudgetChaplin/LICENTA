const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Engineering" },
        { name: "Mathematics" },
        { name: "Physics" },
        { name: "Graphics & Design" },
        { name: "Film" },
        { name: "Economy" },
        { name: "Languages" },
        { name: "Medicine & Pharmacy" },
        { name: "History" },
        { name: "Geography" },
        { name: "Social Sciences" },
        { name: "Biology & Agronomy" },
      ]
    });



    console.log("Success");
  } catch (err) {
    console.log("Error seeding the database categories", err);
  } finally {
    await database.$disconnect();
  }
}

main();