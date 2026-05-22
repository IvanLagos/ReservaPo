import { z }
from "zod";

export const businessSchema =
    z.object({

        user_id:
            z.number(),

        name:
            z.string()
                .min(3),

        category:
            z.string()
                .min(3),

        city:
            z.string()
                .min(2),

        description:
            z.string()
                .min(5),

        image_url:
            z.string()
                .optional(),

    });