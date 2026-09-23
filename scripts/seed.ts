import mongoose from "mongoose";

import Category from "../models/Category";
import Product from "../models/Product";

const MONGODB_URI =
  process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not defined."
  );
}

const categories = [
  {
    name: "Cakes",
    slug: "cakes",
    image:
      "/images/categories/cakes.webp",
    description:
      "Freshly made cakes for every sweet moment.",
    sortOrder: 1,
    isActive: true,
  },
  {
    name: "Cupcakes",
    slug: "cupcakes",
    image:
      "/images/categories/cupcakes.webp",
    description:
      "Soft and beautifully finished cupcakes.",
    sortOrder: 2,
    isActive: true,
  },
  {
    name: "Cookies",
    slug: "cookies",
    image:
      "/images/categories/cookies.webp",
    description:
      "Freshly baked cookies made for sharing.",
    sortOrder: 3,
    isActive: true,
  },
  {
    name: "Brownies",
    slug: "brownies",
    image:
      "/images/categories/brownies.webp",
    description:
      "Rich and indulgent chocolate brownies.",
    sortOrder: 4,
    isActive: true,
  },
  {
    name: "Dessert Cups",
    slug: "dessert-cups",
    image:
      "/images/categories/dessert-cups.webp",
    description:
      "Beautifully layered individual desserts.",
    sortOrder: 5,
    isActive: true,
  },
  {
    name: "Gift Boxes",
    slug: "gift-boxes",
    image:
      "/images/categories/gift-boxes.webp",
    description:
      "Dessert boxes made for gifting and celebrations.",
    sortOrder: 6,
    isActive: true,
  },
];

async function seed() {
  try {
    const mongoUri = MONGODB_URI;

    if (!mongoUri) {
      throw new Error(
        "MONGODB_URI is not defined."
      );
    }

    await mongoose.connect(
      mongoUri
    );

    console.log(
      "MongoDB connected"
    );

    await Product.deleteMany({});
    await Category.deleteMany({});

    console.log(
      "Existing categories and products cleared"
    );

    const createdCategories =
      await Category.insertMany(
        categories
      );

    console.log(
      `${createdCategories.length} categories created`
    );

    /* categoryMap is created here */

    const categoryMap =
      Object.fromEntries(
        createdCategories.map(
          (category) => [
            category.slug,
            category._id,
          ]
        )
      );

    /* Products MUST be below categoryMap */

    const products = [
      {
        name:
          "Chocolate Dream Cake",
        slug:
          "chocolate-dream-cake",
        category:
          categoryMap["cakes"],

        description:
          "Rich chocolate cake layered with smooth chocolate cream and finished with an indulgent chocolate topping. Freshly prepared for birthdays, celebrations and every sweet moment.",

        price: 120,

        images: [
          "/images/products/chocolate-cake.webp",
        ],

        sizes: [
          {
            label: "Small",
            price: 100,
          },
          {
            label: "Medium",
            price: 120,
          },
          {
            label: "Large",
            price: 150,
          },
        ],

        allowMessage: true,

        details: [
          "Freshly made to order",
          "Prepared with carefully selected ingredients",
          "Perfect for celebrations and gifting",
        ],

        storage:
          "Keep refrigerated. For the best taste and texture, allow the cake to sit at room temperature for a short time before serving.",

        stock: 10,
        featured: true,
        isActive: true,
      },

      {
        name:
          "Strawberry Cupcakes",
        slug:
          "strawberry-cupcakes",
        category:
          categoryMap["cupcakes"],

        description:
          "Soft cupcakes topped with creamy strawberry frosting and a delicate strawberry finish.",

        price: 65,

        images: [
          "/images/products/strawberry-cupcakes.webp",
        ],

        sizes: [],

        allowMessage: false,

        details: [
          "Freshly made",
          "Soft and creamy",
          "Perfect for celebrations",
        ],

        storage:
          "Keep refrigerated and store in a covered container.",

        stock: 15,
        featured: true,
        isActive: true,
      },

      {
        name:
          "Chocolate Brownies",
        slug:
          "chocolate-brownies",
        category:
          categoryMap["brownies"],

        description:
          "Rich and fudgy chocolate brownies with a soft centre and deep chocolate flavour.",

        price: 55,

        images: [
          "/images/products/brownies.webp",
        ],

        sizes: [],

        allowMessage: false,

        details: [
          "Freshly baked",
          "Rich chocolate flavour",
          "Perfect for sharing",
        ],

        storage:
          "Store in a cool, dry place in an airtight container.",

        stock: 20,
        featured: true,
        isActive: true,
      },

      {
        name: "Dessert Box",
        slug: "dessert-box",
        category:
          categoryMap["gift-boxes"],

        description:
          "A carefully prepared dessert selection presented beautifully for gifting, celebrations or simply treating yourself.",

        price: 95,

        images: [
          "/images/products/dessert-box.webp",
        ],

        sizes: [],

        allowMessage: false,

        details: [
          "Beautifully presented",
          "Fresh dessert selection",
          "Perfect for gifting",
        ],

        storage:
          "Storage depends on the desserts included in the box. Keep refrigerated where required.",

        stock: 10,
        featured: true,
        isActive: true,
      },

      {
        name:
          "Lotus Cheesecake",
        slug:
          "lotus-cheesecake",
        category:
          categoryMap["cakes"],

        description:
          "Creamy cheesecake with the unmistakable caramelised flavour of Lotus biscuits and a smooth, indulgent finish.",

        price: 110,

        images: [
          "/images/products/lotus-cheesecake.webp",
        ],

        sizes: [
          {
            label: "Small",
            price: 90,
          },
          {
            label: "Medium",
            price: 110,
          },
          {
            label: "Large",
            price: 140,
          },
        ],

        allowMessage: true,

        details: [
          "Freshly made",
          "Creamy cheesecake filling",
          "Finished with Lotus biscuit flavour",
        ],

        storage:
          "Keep refrigerated until ready to serve.",

        stock: 8,
        featured: true,
        isActive: true,
      },

      {
        name:
          "Chocolate Cookies",
        slug:
          "chocolate-cookies",
        category:
          categoryMap["cookies"],

        description:
          "Freshly baked chocolate cookies with a soft centre and rich chocolate flavour.",

        price: 45,

        images: [
          "/images/products/chocolate-cookies.webp",
        ],

        sizes: [],

        allowMessage: false,

        details: [
          "Freshly baked",
          "Soft centre",
          "Rich chocolate flavour",
        ],

        storage:
          "Store in an airtight container in a cool, dry place.",

        stock: 25,
        featured: true,
        isActive: true,
      },
    ];

    const createdProducts =
      await Product.insertMany(
        products
      );

    console.log(
      `${createdProducts.length} products created`
    );

    console.log(
      "Database seeded successfully"
    );
  } catch (error) {
    console.error(
      "Seed failed:",
      error
    );

    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();

    console.log(
      "MongoDB disconnected"
    );
  }
}

seed();