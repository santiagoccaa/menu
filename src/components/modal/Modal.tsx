import Modal from 'react-modal'
import { RiCloseLargeFill } from "react-icons/ri";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { addOfert, editOfert } from '@/lib/service';
import { Ofert, Product } from '@/types/product';
import { useMenu } from '@/hook/useMenu';
import { supabase } from '@/lib/client';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
    },
};

Modal.setAppElement('#root');

interface ModalProps {
    _id: number
    categoria: string
}

const ModalProduct = ({ _id, categoria }: ModalProps) => {

    const { handleFetchProducts } = useMenu()

    const { openModal, handleClickModal } = useMenu()
    // Input Type
    const [inputType, setInputType] = useState("hidden");
    // Offert save
    const [ofert, setOfert] = useState<number | string>("")
    // Input Value
    const [inputValue, setInputValue] = useState<string | number>("");
    // Type ofert
    const [typeOfert, setTypeOfert] = useState("")

    const [productoOfert, setProductoOfert] = useState<Product | null>(null)

    const [hasOfert, setHasOfert] = useState(false)

    useEffect(() => {
        if (openModal && _id) {
            const fetchProductoOferta = async () => {
                const { data } = await supabase
                    .from("productos")
                    .select("*")
                    .eq("id", _id)
                    .single()

                setProductoOfert(data)
                setHasOfert(!!data?.oferta) // 👈 true si ya tiene oferta
                console.log("que", data.oferta);

            }
            fetchProductoOferta()
        }
    }, [_id, openModal])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "promocion") {
            setInputType("text");
            setInputValue("");
            setOfert("")
            setTypeOfert("promocion")
        } else if (value === "descuento") {
            setInputType("number");
            setInputValue("");
            setOfert("")
            setTypeOfert("descuento")
        }
    };

    const formatTextInput = (value: string, previousValue: string): string => {
        const isDeleting = value.length < previousValue.length;
        const numbersOnly = value.replace(/[^0-9]/g, '');

        if (numbersOnly.length === 0) return '';

        if (isDeleting && numbersOnly.length === 1) {
            if (previousValue.length === 3) {
                return numbersOnly + 'x';
            }
            return numbersOnly;
        }
        if (numbersOnly.length === 1) return numbersOnly + 'x';
        if (numbersOnly.length >= 2) return numbersOnly[0] + 'x' + numbersOnly[1];

        return numbersOnly;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (inputType === "text") {
            const currentValue = String(inputValue);
            const formattedValue = formatTextInput(value, currentValue);
            setInputValue(formattedValue);
            setOfert(formattedValue); // actualizar el estado ofert
        } else if (inputType === "number") {
            const numValue = Number(value);
            setInputValue(isNaN(numValue) ? "" : numValue);
            setOfert(isNaN(numValue) ? "" : numValue); // actualizar ofert
        }
    };

    const handleSaveOfert = async ({ id, type, ofert }: Ofert) => {
        setOfert(inputValue)
        await addOfert({ id, type, ofert })
        setHasOfert(true)
        handleFetchProducts(categoria)
    }

    const handleEditOfert = async (id: number) => {
        editOfert(id)
        handleFetchProducts(categoria)
        setHasOfert(false)
    }

    if (!productoOfert) return null

    const newPrice =
        inputType === "number" && ofert
            ? productoOfert.cost - (productoOfert.cost * (Number(ofert) / 100))
            : null;

    return (
        <Modal
            isOpen={openModal}
            style={customStyles}
            contentLabel={productoOfert.name}
        >
            <div className='relative w-[28rem] h-auto py-4 bg-gray-900 text-white'>
                <div className='flex justify-between p-2'>
                    <h2 className='text-xl font-bold'>{productoOfert.name}</h2>
                    <button className='absolute top-2 right-2 cursor-pointer hover:-rotate-90 transition-all duration-300' onClick={() => {
                        handleClickModal()
                        setOfert("")
                        setInputType("hidden")
                        setInputValue("")
                        setProductoOfert(null)
                        setHasOfert(false)
                        handleFetchProducts(categoria)
                    }}>
                        <RiCloseLargeFill size={25} />
                    </button>
                </div>
                <div className='flex justify-center items-center w-full'>
                    <div className='relative w-40'>
                        <Image
                            src={`${productoOfert.image}`}
                            alt={productoOfert.name}
                            width={200}
                            height={200}
                            className="mx-auto"
                        />

                        {hasOfert && inputType === "text" &&
                            <div className='absolute w-full bottom-0 left-0 p-2 bg-red-400 text-center text-lg font-bold'>
                                <p>{ofert}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className='w-full text-center'>
                    {inputType === "number" && newPrice && hasOfert ? (
                        <div className="flex gap-2 justify-center items-center">
                            <span className="line-through text-gray-400">${productoOfert.cost}</span>
                            <span className="text-green-400 font-bold">
                                ${newPrice.toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        <div className="flex justify-center w-full ">
                            {!hasOfert && productoOfert.tipo_oferta === "descuento"
                                ?
                                <>
                                    $<h2 className='line-through text-gray-500 mr-2 text-xl'>{productoOfert.cost}</h2>
                                    <span className='text-green-400 text-xl'>${productoOfert.cost - (productoOfert.cost * (Number(productoOfert.oferta) / 100))}</span>
                                </>
                                :
                                productoOfert.cost
                            }
                        </div>
                    )}
                </div>
                <div className='absolute top-8 right-8 w-20 h-20 rounded-full bg-white text-red-400 flex justify-center items-center text-2xl font-bold'>
                    {((hasOfert && inputType === "number") || productoOfert.tipo_oferta === "descuento") && (
                        <p>{productoOfert.oferta ? productoOfert.oferta : ofert}%</p>
                    )}
                </div>
                {
                    !hasOfert &&
                    <div className="flex gap-4 mt-4 justify-center items-center">

                        <select
                            className="text-gray-800 bg-white"
                            onChange={handleChange}
                        >
                            <option hidden>Oferta</option>
                            <option value="descuento">Descuento</option>
                            <option value="promocion">Promocion</option>
                        </select>


                        <input
                            type={inputType}
                            className="rounded-lg bg-white text-gray-800 p-1 w-20"
                            placeholder={inputType === "number" ? "20%" : "2x1"}
                            value={inputValue}
                            onChange={handleInputChange}
                            maxLength={inputType === "text" ? 3 : undefined}
                        />
                    </div>
                }
                <div className='flex pt-4 w-full justify-center items-center'>
                    {
                        !hasOfert ?
                            <button
                                className='bg-sky-400 rounded-lg p-2 cursor-pointer'
                                onClick={() => {
                                    handleSaveOfert({ id: _id, type: typeOfert, ofert })
                                }}
                            >
                                Aplicar
                            </button>

                            :
                            <button
                                className='bg-red-400 rounded-lg p-2 cursor-pointer'
                                onClick={() => handleEditOfert(_id)}
                            >
                                Eliminar Oferta
                            </button>
                    }
                </div>
            </div>
        </Modal>
    );
}

export default ModalProduct