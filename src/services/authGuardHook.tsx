import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthGuard = (user:boolean) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
            
        }
        
    }, [user]);


};
