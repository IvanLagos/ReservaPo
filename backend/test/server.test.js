import request from "supertest";

import app from "../index.js";

describe(
    "API TESTS",
    () => {

        // ROOT
        test(
            "GET / debe responder 200",
            async () => {

                const response =
                    await request(app)
                        .get("/");

                expect(
                    response.statusCode
                ).toBe(200);

            }
        );

        // REGISTER
        test(
            "POST /register debe crear usuario",
            async () => {

                const response =
                    await request(app)
                        .post("/register")
                        .send({

                            name:
                                "Test User",

                            email:
                                `test${Date.now()}@gmail.com`,

                            password:
                                "123456",

                            role:
                                "client",

                        });

                expect(
                    response.statusCode
                ).toBe(201);

                expect(
                    response.body.message
                ).toBe(
                    "Usuario creado correctamente"
                );

            }
        );

        // LOGIN
        test(
            "POST /login debe iniciar sesión",
            async () => {

                // CREATE USER
                const email =
                    `login${Date.now()}@gmail.com`;

                await request(app)
                    .post("/register")
                    .send({

                        name:
                            "Login User",

                        email,

                        password:
                            "123456",

                        role:
                            "client",

                    });

                // LOGIN
                const response =
                    await request(app)
                        .post("/login")
                        .send({

                            email,

                            password:
                                "123456",

                        });

                expect(
                    response.statusCode
                ).toBe(200);

                expect(
                    response.body.token
                ).toBeDefined();

            }
        );

    }
);