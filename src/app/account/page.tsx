'use client';

import React, { useState } from 'react';

import { Icon } from '@/components/Icon/Icon';
import { TextInput } from '@/components/TextInput/TextInput';
import ConfirmButtons from '@/components/ConfirmButtons/ConfirmButtons';

const MyAccountPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'username' | 'password' | null>(null);
    const [modalValue, setModalValue] = useState('');

    const openModal = (type: 'username' | 'password') => {
        setModalType(type);
        setModalValue('');
        setModalOpen(true);
    };

    const handleSave = () => {
        setModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-start pt-4">
            <div className="w-[800px] h-fit rounded-2xl flex flex-col items-start justify-between relative">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Mi cuenta</h1>

                <div className="mt-20 flex justify-center w-full">
                    <Icon variant="user" width={90} height={90} />
                </div>

                <div className="mt-10 w-full flex flex-col items-center gap-10 mb-4">
                    <div className="transform scale-125 w-full flex justify-center">
                        <ConfirmButtons variant="changeUser" onClick={() => openModal('username')} />
                    </div>
                    <div className="transform scale-125 w-full flex justify-center">
                        <ConfirmButtons variant="changePassword" onClick={() => openModal('password')} />
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-[400px] space-y-4">
                        <h2 className="text-xl font-bold text-center text-blue-800">
                            Cambiar {modalType === 'username' ? 'usuario' : 'contraseña'}
                        </h2>

                        <TextInput
                            value={modalValue}
                            onChange={(e) => setModalValue(e.target.value)}
                            placeholder={`Nuevo ${modalType === 'username' ? 'usuario' : 'contraseña'}`}
                            type={modalType === 'password' ? 'password' : 'text'}
                            showPasswordToggle={modalType === 'password'}
                        />

                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 text-gray-700 hover:underline"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAccountPage;









