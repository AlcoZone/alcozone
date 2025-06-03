'use client';

import React, { useState } from 'react';

import { Icon } from '@/components/Icon/Icon';
import { TextInput } from '@/components/TextInput/TextInput';
import ConfirmButtons from '@/components/ConfirmButtons/ConfirmButtons';

import { putUpdateDisplayName } from '@/services/update/putUpdateDisplayName';
import { putUpdatePassword } from '@/services/update/putUpdatePassword';

import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/providers/AuthProvider';

import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const MyAccountPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'username' | 'password' | null>(null);
    const [modalValue, setModalValue] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const { role, email, user, updateDisplayName } = useAuth();

    const openModal = (type: 'username' | 'password') => {
        setModalType(type);
        setModalValue('');
        setCurrentPassword('');
        setModalOpen(true);
    };

    const handleSave = async () => {
        try {
            if (modalType === 'username') {
                await putUpdateDisplayName(modalValue);
                updateDisplayName(modalValue);
                alert('Nombre de usuario actualizado correctamente.');
            } else if (modalType === 'password') {
                if (!currentPassword) {
                    alert('Por favor, ingresa tu contraseña actual para continuar.');
                    return;
                }

                if (!user || !email) {
                    alert('Usuario no autenticado.');
                    return;
                }

                const credential = EmailAuthProvider.credential(email, currentPassword);
                await reauthenticateWithCredential(user, credential);

                await putUpdatePassword(modalValue);
                alert('Contraseña actualizada correctamente.');
            }
            setModalOpen(false);
        } catch (error: any) {
            if (error.code === 'auth/wrong-password') {
                alert('La contraseña actual es incorrecta.');
            } else if (error.code === 'auth/requires-recent-login') {
                alert('Por seguridad, necesitas volver a iniciar sesión para cambiar tu contraseña.');
            } else {
                alert('Error al actualizar. Por favor intenta de nuevo.');
            }
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-[80vw] relative mt-10">
            <Card className="w-[600px] h-[600px]  rounded-2xl justify-center">
                <CardContent className="flex flex-col items-center text-center">

                    <div className="bg-[#F2F2F2] w-[140px] h-[140px] rounded-full flex justify-center items-start">
                        <div className="p-4">
                            <Icon variant="user" width={90} height={90} />
                        </div>
                    </div>



                    <h2 className="text-4xl font-bold text-black-800 mb-6 p-4">
                        Bienvenido, {user?.displayName}
                    </h2>


                    <div className="bg-[#F2F2F2] rounded-lg p-4 w-[60%] mb-4">
                        <p className="font-bold text-black-800">Correo: {email}</p>
                    </div>

                    <div className="bg-[#F2F2F2] rounded-lg p-4 w-[60%] mb-4">
                        <p className="font-bold text-black-800">Rol: {role}</p>
                    </div>

                    <div className="mt-10 w-full flex justify-center gap-8 mb-4">
                        <ConfirmButtons variant="changeUser" onClick={() => openModal('username')} />
                        <ConfirmButtons variant="changePassword" onClick={() => openModal('password')} />
                    </div>
                </CardContent>
            </Card>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.80)' }}>
                    <div className="bg-white rounded-xl shadow-lg p-8 w-[300px] space-y-4">
                        <h2 className="text-xl font-bold text-center text-blue-800">
                            Cambiar {modalType === 'username' ? 'usuario' : 'contraseña'}
                        </h2>

                        {modalType === 'password' && (
                            <TextInput
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Contraseña actual"
                                type="password"
                                showPasswordToggle
                            />
                        )}

                        <TextInput
                            value={modalValue}
                            onChange={(e) => setModalValue(e.target.value)}
                            placeholder={modalType === 'username' ? 'Nuevo usuario' : 'Nueva contraseña'}
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











