import Modal from 'react-modal'
import { RiCloseLargeFill } from "react-icons/ri";
import Image from 'next/image';
import React, { useState } from 'react';

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
        backgroundColor: 'rgba(0, 0, 0, 0.05)', // bg-black bg-opacity-5
        backdropFilter: 'blur(2px)',            // backdrop-blur-[2px]
        WebkitBackdropFilter: 'blur(2px)',      // para Safari
    },
};


Modal.setAppElement('#root');

interface ModalProps {
    closeModal: () => void
    openModal: boolean
    product: {
        id: number;
        name: string;
        image: string;
        cost: number;
    } | null;
}

const ModalProduct = ({ closeModal, openModal, product }: ModalProps) => {
    // Input Type
    const [inputType, setInputType] = useState("hidden");
    // Offert save
    const [ofert, setOfert] = useState<number | string | null>(null)
    // Input Value
    const [inputValue, setInputValue] = useState<string | number>("");

    if (!product) return

    const { id, name, image, cost } = product
    console.log(id);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "promocion") {
            setInputType("text");
        } else if (value === "descuento") {
            setInputType("number");
        }
    };

    const handleSaveOfert = () => {
        setOfert(inputValue)
    }

    const newPrice =
        inputType === "number" && ofert
            ? cost - (cost * (Number(ofert) / 100))
            : null;

    return (
        <Modal
            isOpen={openModal}
            style={customStyles}
            contentLabel={name}
        >
            <div className='relative w-[28rem] h-auto py-4 bg-gray-900 text-white'>
                <div className='flex justify-between p-2'>
                    <h2 className='text-xl font-bold'>{name}</h2>
                    <button className='absolute top-2 right-2 cursor-pointer hover:-rotate-90 transition-all duration-300' onClick={() => {
                        closeModal()
                        setOfert("")
                        setInputType("hidden")
                    }}>
                        <RiCloseLargeFill size={25} />
                    </button>
                </div>
                <div className='flex justify-center items-center w-ful'>
                    <div className='relative w-40'>
                        <Image
                            src={image}
                            alt={name}
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
                            <span className="line-through text-gray-400">${cost}</span>
                            <span className="text-green-400 font-bold">
                                ${newPrice.toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        <h2 className="text-white">${cost}</h2>
                    )}
                </div>
                <div className='absolute top-8 right-8 w-20 h-20 rounded-full bg-white text-red-400 flex justify-center items-center text-2xl font-bold'>
                    {ofert && inputType === "number"
                        ?
                        <p>{ofert}%</p>
                        :
                        <p>{ofert}</p>
                    }
                </div>

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
                        onChange={(e) => {
                            const value = e.target.value
                            setInputValue(inputType === "number" ? Number(value) : value)
                        }}
                    />
                </div>
                <div className='flex pt-4 w-full justify-center items-center'>
                    <button
                        className='bg-red-400 rounded-lg p-2'
                        onClick={handleSaveOfert}
                    >
                        Aplicar
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalProduct