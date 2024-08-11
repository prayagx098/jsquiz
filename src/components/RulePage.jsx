import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RulePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/index');
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return (
        <div>
            <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4"></div>
                    <h2 className="text-lg font-semibold">Loading...</h2>
                    <p className="text-gray-500">Question are Loading Get Ready....</p>
                </div>

                <style>
                    {`
                    .loader {
                        border-top-color: #3490dc;
                        animation: spin 1s infinite linear;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    `}
                </style>
            </div>
        </div>
    );
}

export default RulePage;