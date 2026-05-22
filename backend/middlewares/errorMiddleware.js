export const errorHandler =
    (
        error,
        req,
        res,
        next
    ) => {

        console.log(error);

        return res
            .status(500)
            .json({

                error:
                    "Error interno del servidor",

            });

    };