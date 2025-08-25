"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteCategory, EditCategory, EditCategoryProducts } from "@/lib/service";
import AddCategory, { validationSchemaCategory } from "./components/AddCategory";
import { AiFillSetting } from "react-icons/ai";
import { TbEdit, TbLoader2 } from "react-icons/tb";
import { GoTrash } from "react-icons/go";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useMenu } from "@/hook/useMenu";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { TiDelete } from "react-icons/ti";
import { supabase } from "@/lib/client";

/**
 * Page donde se muestran las categorias
 * @returns 
 */

interface CategoryReset {
    _id: string,
    nameCategory: string
    categoriUpdate: string
}
const AdminPage = () => {

    const { handleFectAllCategoryes, AllCategoryes } = useMenu()

    // Selecciona el id de la categoria que quiero EDITAR
    const [settingsCategory, setSettingsCategory] = useState<number | null>(null)
    // Selecciona el id de la categoria que SE VA A EDITAR
    const [editCategory, setEditCategory] = useState<number | null>(null);
    // NUEVO NOMBRE para la categoria
    const [editCategoryName, setEditCategoryName] = useState("")
    // Estado de loading que aparece cuando edito, o elimino una nueva categoria - este solo es para botones
    const [loading, setLoading] = useState(false)
    // Estado que se muestra al momento de ingresar a la pagina, este aparece mientras estan cargando las categorias
    const [loadingCategories, setLoadingCategories] = useState(true);
    // En caso de que una categoria existe este estado me permite salir de la edicion de la categoria
    const [dontEdit, setDotEdit] = useState(false)
    // Almacena el mensaje que se muestra en la alerta
    const [alert, setAlert] = useState("")

    useEffect(() => {
        const fetchCategories = async () => {
            if (AllCategoryes.length === 0) {
                setLoadingCategories(true);
                try {
                    await handleFectAllCategoryes();
                } catch (error) {
                    console.error('Error al cargar categorías:', error);
                } finally {
                    setLoadingCategories(false);
                }
            } else {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, [handleFectAllCategoryes, AllCategoryes.length]);

    const toggleEdit = (idx: number) => {
        setSettingsCategory(prev => (prev === idx ? null : idx))
    }

    // Editar Categoria
    const handleClickEditCategory = async (
        values: CategoryReset,
        { resetForm }: FormikHelpers<CategoryReset>
    ) => {
        setLoading(true)

        const select = await supabase.from("categorias_menu").select("*").eq("name", editCategoryName).maybeSingle()

        if (select.data) {
            setLoading(false)
            setAlert(`la categoria ${editCategoryName} ya existe`)
            setDotEdit(true)
            setTimeout(() => {
                setAlert("")
            }, 1000)
            return
        }

        setDotEdit(false)
        try {
            const editNameCagory = await EditCategory(values._id, editCategoryName.toLowerCase().trim());
            const editNameProductCagory = await EditCategoryProducts(values.categoriUpdate.toLowerCase().trim(), editCategoryName.toLowerCase().trim())

            if (!editNameCagory.success) {
                setLoading(false)
                return;
            }
            if (!editNameProductCagory.success) {
                setLoading(false)
                return;
            }

            await handleFectAllCategoryes();

            setAlert("Categoria Actualizada con exito")
            setEditCategory(null);
            resetForm()

            setTimeout(() => {
                setAlert("")
            }, 1000)

        } catch (error) {
            console.error('Error al editar la categoría:', error);
        } finally {
            setLoading(false)
        }
    }

    // Eliminar Categoria
    const handleClickDeleteCategory = async (id: string) => {
        try {
            await deleteCategory(id)
            await handleFectAllCategoryes();
            setEditCategory(null);
            setSettingsCategory(null)
            setAlert("Categoria ELIMINADA con exito")
            setTimeout(() => {
                setAlert("")
            }, 1000)
        } catch (error) {
            console.log("Error al Eliminar categoria;", error);
        }
    }

    return (
        <div className='mx-4 border-t border-white flex flex-col'>
            <AddCategory />
            {
                alert &&
                <div className="absolute bottom-8 right-6 px-8 py-4 flex justify-center items-center rounded-lg bg-red-500">
                    <span>{alert}</span>
                </div>
            }
            {/* TODO: add filter name and date */}
            <div className="w-full border-t-2 border-white mt-4 px-4">
                {loadingCategories
                    ?
                    (
                        <div className="text-white italic mt-4 items-center gap-2 flex text-center justify-center text-2xl">
                            <TbLoader2 className="animate-spin" size={16} />
                            Cargando categorías...
                        </div>
                    )
                    :
                    AllCategoryes.length === 0 ?
                        (
                            // No hay categorías
                            <p className="text-white text-sm italic mt-4">
                                Aún no tienes categorías registradas, intenta añadir una :D
                            </p>
                        )

                        :
                        (
                            <div className="text-white grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {AllCategoryes.map((category, idx) => (
                                    <div key={idx} className="relative">
                                        {editCategory === idx
                                            ?
                                            <Formik
                                                initialValues={{
                                                    _id: category.id,
                                                    nameCategory: category.name,
                                                    categoriUpdate: category.name
                                                }}
                                                validationSchema={validationSchemaCategory}
                                                onSubmit={handleClickEditCategory}
                                            >
                                                <Form className="p-4 flex gap-2 h-full">
                                                    <Field
                                                        type="text"
                                                        name="nameCategory"
                                                        value={editCategoryName.replace(/_/g, " ")}
                                                        className="bg-white text-gray-800 capitalize h-12"
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            setEditCategoryName(e.target.value)
                                                        }}
                                                    />

                                                    {category.name === editCategoryName || dontEdit
                                                        ?
                                                        <button
                                                            type="button"
                                                            className="w-12 h-12 flex bg-green-500 rounded-full justify-center items-center cursor-pointer z-50 hover:bg-blue-500 "
                                                            onClick={() => {
                                                                setEditCategory(null)
                                                                setDotEdit(false)
                                                            }}
                                                        >
                                                            <TiDelete size={25} />
                                                        </button>
                                                        :
                                                        <button
                                                            type="submit"
                                                            className="w-full h-full flex bg-purple-500 rounded-full justify-center items-center cursor-pointer z-50 hover:bg-blue-500"
                                                            disabled={loading}
                                                        >
                                                            {loading
                                                                ?
                                                                <TbLoader2 size={25} className="animate-spin" />
                                                                :
                                                                <MdOutlineSaveAlt size={25} />}
                                                        </button>
                                                    }

                                                </Form>
                                            </Formik>
                                            :
                                            <Link
                                                href={`/admin/${category.name}`}
                                                className="flex py-2 text-2xl capitalize bg-red-400 h-36 border-b border-white justify-center items-center rounded-lg hover:text-red-400 hover:bg-white transition-all duration-300">
                                                {category.name.replace(/_/g, " ")}
                                            </Link>
                                        }

                                        <div
                                            className={`absolute overflow-hidden bottom-2 right-2 ${settingsCategory === idx ? 'w-48' : 'w-12'} h-12 rounded-full bg-blue-400 transition-all duration-300 z-50 ${editCategory === idx && 'hidden'}`}
                                        >
                                            <div className="relative bg-blue-400 w-full h-12">
                                                <div className="absolute top-0 right-0 rounded-full bg-blue-400 w-12 h-12 border-1">
                                                    <button
                                                        onClick={() => toggleEdit(idx)}
                                                        className='w-full h-full flex justify-center items-center cursor-pointer'
                                                    >
                                                        <AiFillSetting size={24} className={`${settingsCategory === idx ? 'rotate-90' : ''} duration-300`} />

                                                    </button>
                                                </div>
                                                <div className={`flex gap-8 px-8 h-full items-center ${settingsCategory !== idx && 'hidden'}`}>
                                                    <button className='cursor-pointer text-gray-800 hover:scale-110 transition-all duration-300'>
                                                        <TbEdit
                                                            onClick={() => {
                                                                toggleEdit(idx)
                                                                setEditCategoryName(category.name)
                                                                setEditCategory(idx)
                                                            }}
                                                            size={20}
                                                        />
                                                    </button>
                                                    <button
                                                        className='cursor-pointer text-gray-800 hover:scale-110 transition-all duration-300'
                                                        onClick={() => handleClickDeleteCategory(category.id)}>
                                                        <GoTrash size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        )}
            </div>
        </div>
    )
}

export default AdminPage
