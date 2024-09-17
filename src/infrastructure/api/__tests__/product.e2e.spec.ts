import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product API",
        price: 25.00
      });

    expect(response.status).toBe(201);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product not created",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product API",
        price: 25.00
      });
    expect(response.status).toBe(201);
    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product 2 API",
        price: 5.00
      });
    expect(response2.status).toBe(201);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product API");
    expect(product.price).toBe(25.00);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product 2 API");
    expect(product2.price).toBe(5.00);
  });
});
