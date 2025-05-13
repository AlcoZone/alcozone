'use client';

import React, { useState } from 'react';
import { getAuth, updateProfile, updatePassword } from '@firebase/auth';

import { Banner } from '@/components/Banner/Banner';
import { Menu } from '@/components/Menu/Menu';
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

    const handleSave = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error("No hay un usuario autenticado");
            return;
        }

        try {
            if (modalType === 'username') {
                await updateProfile(user, {
                    displayName: modalValue
                });
                console.log("Nombre de usuario actualizado:", modalValue);
            } else if (modalType === 'password') {
                await updatePassword(user, modalValue);
                console.log("Contraseña actualizada");
            }

            setModalOpen(false);
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
        }
    };

    return (
        <Menu>
            <div className="flex flex-col items-center justify-start min-h-screen bg-[#F2F2F2]">
                <div className="w-[800px] h-[500px] bg-white border border-gray-400 rounded-2xl shadow-lg p-8 flex flex-col items-start justify-between mt-10 relative">
                    <h1 className="text-3xl font-bold text-blue-800 mb-6">Mi cuenta</h1>

                    <div className="mb-6 flex justify-center w-full">
                        <Icon variant="user" width={64} height={64} />
                    </div>

                    <div className="flex flex-col items-center justify-center mb-6 w-full">
                        <p className="text-2xl font-bold text-blue-800">Mariana Fernández</p>
                        <p className="text-xl text-gray-600">Contraseña: ·······</p>
                    </div>

                    <div className="w-full flex justify-center gap-4 mb-4">
                        <ConfirmButtons variant="changeUser" onClick={() => openModal('username')} />
                        <ConfirmButtons variant="changePassword" onClick={() => openModal('password')} />
                    </div>
                </div>
            </div>

            <Banner />

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
        </Menu>
    );
};

export default MyAccountPage;






