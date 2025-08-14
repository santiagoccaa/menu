import Modal from 'react-modal'
import { RiCloseLargeFill } from "react-icons/ri";
import Image from 'next/image';
import React, { useState } from 'react';
import { addOfert, editOfert } from '@/lib/service';
import { Ofert } from '@/types/product';
import { useMenu } from '@/hook/useMenu';

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
    product: {
        id: number;
        name: string;
        image: string;
        cost: number;
        ofert: string;
        type_ofert: string
    } | null;
}

const ModalProduct = ({ product }: ModalProps) => {

    const {openModal, handleClickModal} = useMenu()
    // Input Type
    const [inputType, setInputType] = useState("hidden");
    // Offert save
    const [ofert, setOfert] = useState<number | string>("")
    // Input Value
    const [inputValue, setInputValue] = useState<string | number>("");
    // Type ofert
    const [typeOfert, setTypeOfert] = useState("")

    if (!product) return

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
        addOfert({ id, type, ofert })
    }

    const newPrice =
        inputType === "number" && ofert
            ? product.cost - (product.cost * (Number(ofert) / 100))
            : null;

    return (
        <Modal
            isOpen={openModal}
            style={customStyles}
            contentLabel={product.name}
        >
            <div className='relative w-[28rem] h-auto py-4 bg-gray-900 text-white'>
                <div className='flex justify-between p-2'>
                    <h2 className='text-xl font-bold'>{product.name}</h2>
                    <button className='absolute top-2 right-2 cursor-pointer hover:-rotate-90 transition-all duration-300' onClick={() => {
                        handleClickModal()
                        setOfert("")
                        setInputType("hidden")
                        setInputValue("")
                    }}>
                        <RiCloseLargeFill size={25} />
                    </button>
                </div>
                <div className='flex justify-center items-center w-ful'>
                    <div className='relative w-40'>
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="mx-auto"
                        />

                        {ofert && inputType === "text" &&
                            <div className='absolute w-full bottom-0 left-0 p-2 bg-red-400 text-center text-lg font-bold'>
                                <p>{ofert}</p>
                            </div>
                        }

                    </div>
                </div>
                <div className='w-full text-center'>
                    {inputType === "number" && newPrice ? (
                        <div className="flex gap-2 justify-center items-center">
                            <span className="line-through text-gray-400">${product.cost}</span>
                            <span className="text-green-400 font-bold">
                                ${newPrice.toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        <div className="flex justify-center w-full ">
                            {product.ofert && product.type_ofert === "descuento"
                                ?
                                <>
                                    $<h2 className='line-through text-gray-500 mr-2 text-xl'>{product.cost}</h2>
                                    <span className='text-green-400 text-xl'>${product.cost - (product.cost * (Number(product.ofert) / 100))}</span>
                                </>
                                :
                                product.cost
                            }
                        </div>
                    )}
                </div>
                <div className='absolute top-8 right-8 w-20 h-20 rounded-full bg-white text-red-400 flex justify-center items-center text-2xl font-bold'>
                    {ofert && inputType === "number" || product.type_ofert === "descuento"
                        &&
                        <p>{product.ofert ? product.ofert : ofert}%</p>
                    }
                </div>

                <div className="flex gap-4 mt-4 justify-center items-center">
                    {
                        !product.ofert &&
                        <select
                            className="text-gray-800 bg-white"
                            onChange={handleChange}
                        >
                            <option hidden>Oferta</option>
                            <option value="descuento">Descuento</option>
                            <option value="promocion">Promocion</option>
                        </select>
                    }

                    <input
                        type={inputType}
                        className="rounded-lg bg-white text-gray-800 p-1 w-20"
                        placeholder={inputType === "number" ? "20%" : "2x1"}
                        value={inputValue}
                        onChange={handleInputChange}
                        maxLength={inputType === "text" ? 3 : undefined}
                    />
                </div>
                <div className='flex pt-4 w-full justify-center items-center'>
                    {
                        !product.ofert ?
                            <button
                                className='bg-sky-400 rounded-lg p-2 cursor-pointer'
                                onClick={() => {
                                    handleSaveOfert({ id: product.id, type: typeOfert, ofert })
                                }}
                            >
                                Aplicar
                            </button>

                            :
                            <button
                                className='bg-red-400 rounded-lg p-2 cursor-pointer'
                                onClick={() => editOfert(product.id)}
                            >
                                Elimar Oferta
                            </button>
                    }
                </div>
            </div>
        </Modal>
    );
}

export default ModalProduct