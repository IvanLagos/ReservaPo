import { z }
from "zod";

export const professionalSchema =
    z.object({

        business_id:
            z.number(),

        name:
            z.string()
                .min(3),

        specialty:
            z.string()
                .min(3),

        phone:
            z.string()
                .min(6),

        image_url:
            z.string()
                .optional(),

    });