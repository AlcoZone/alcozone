'use client';

import React, { useState } from 'react';  
import { Banner } from '@/components/Banner/Banner'; 
import { Menu } from '@/components/Menu/Menu';
import { Icon } from '@/components/Icon/Icon';
import { TextInput } from '@/components/TextInput/TextInput';
import ConfirmButtons from '@/components/ConfirmButtons/ConfirmButtons';

const MyAccountPage = () => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');

    return (
        <Menu>
            
            <div className="flex flex-col items-center justify-start min-h-screen bg-#F2F2F2">
                
           

                <div className="w-[800px] h-[500px] bg-white border border-gray-400 rounded-2xl shadow-lg p-8 flex flex-col items-start justify-start mt-10 relative">
                    <h1 className="text-3xl font-bold text-blue-800 mb-6">Mi cuenta</h1>

                    <div className="mb-6 flex items-start justify-center w-full">
                        <Icon variant="user" width={64} height={64} />
                    </div>

                    <div className="w-full space-y-6 mb-8 text-lg [&_input]:h-14 [&_input]:w-full [&_input]:text-lg">
                        <TextInput
                            value={input1}
                            onChange={(e) => setInput1(e.target.value)}
                            placeholder="Cambiar usuario"
                        />

                        <TextInput
                            value={input2}
                            onChange={(e) => setInput2(e.target.value)}
                            placeholder="Cambiar correo electrónico"
                        />

                        <TextInput
                            value={input3}
                            onChange={(e) => setInput3(e.target.value)}
                            placeholder="Cambiar contraseña"
                            type="password"
                            showPasswordToggle={true} 
                        />
                    </div> 

                    <div className="w-full flex justify-center">
                        <ConfirmButtons
                            variant="save"
                            onClick={() => console.log('Cambios guardados')}
                            
                        />
                    </div>
                </div>
            </div>
            <Banner />
        </Menu>

        
    );
};

export default MyAccountPage;






