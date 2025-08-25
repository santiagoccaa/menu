"use client"

import { useMenu } from "@/hook/useMenu";
import { saveCategory } from "@/lib/service";
import { preGenerateId } from "@/utils/utils";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import * as Yup from "yup";

export const validationSchemaCategory = Yup.object({
    nameCategory: Yup.string()
        .required("El nombre de la categoría es requerido")
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no puede tener más de 50 caracteres")
        .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/, "Solo se permiten letras y espacios")
});

const AddCategory = () => {

    const initialValues = {
        nameCategory: ""
    };

    const { handleFectAllCategoryes } = useMenu();
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (
        values: typeof initialValues,
        { resetForm }: FormikHelpers<typeof initialValues>
    ) => {
        setIsLoading(true);

        try {
            const sanitized = values.nameCategory.toLowerCase().trim().replace(/\s+/g, "_");
            await saveCategory({ id: preGenerateId(), name: sanitized });
            resetForm();
            setTimeout(() => {
                handleFectAllCategoryes();
                setIsLoading(false);
            }, 500);

        } catch (err) {
            console.error("Error al guardar categoría:", err);
            setIsLoading(false);
        }
    };

    return (
        <div className="py-8 flex justify-center w-full">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchemaCategory}
                onSubmit={handleFormSubmit}
            >
                {({ isValid, dirty }) => (
                    <Form className="flex gap-4 items-center">
                        <div className="flex flex-col">
                            <Field
                                type="text"
                                name="nameCategory"
                                className="border-white border-1 rounded-lg p-2"
                                placeholder="Nombre de la Categoría"
                                disabled={isLoading}
                            />
                            <ErrorMessage
                                name="nameCategory"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 w-20 h-10 rounded-lg cursor-pointer p-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
                            disabled={isLoading || !isValid || !dirty}
                        >
                            {isLoading ? (
                                <TbLoader2 className="animate-spin" />
                            ) : (
                                "Guardar"
                            )}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddCategory;