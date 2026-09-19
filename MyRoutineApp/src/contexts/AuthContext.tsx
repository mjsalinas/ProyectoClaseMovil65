import { createContext, useContext, useState } from "react";
import { supabase } from "../lib/supabase";


//1. Tipado del objeto principal del contexto
type User = {
    email: string;
    pwd?: string;
} | null

type AuthContextType ={
    user: User | null;
    register: (email:string, pwd: string) => Promise<void>;
    login: (email: string, pwd: string) => Promise<void>;
    logout: () => Promise<void>;
}

//2. Creacion del contexto
const AuthContext = createContext<AuthContextType | null> (null);

// 4. hook personalizado: la exposicion de contexto a componentes de la aplicacion
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error ("useAuth debe usarse dentro de AuthProvider");
    return context;
}

//3. Crear el provider: medio por el cual manejamos el estado global
export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    
    const [user, setUser] = useState<User>(null);
    
    const register = async (email:string, pwd:string) => {
        const {error} = await supabase.auth.signUp({email, password: pwd});
        if (error) throw error;
    }
    const login = async (email: string, password: string) =>{
        const {error} = await supabase.auth.signInWithPassword({email, password});
        if (error) throw error;
    };
    const logout = async () =>{
        const {error} = await supabase.auth.signOut();
        if (error) throw error;
    };

    return(
        <AuthContext.Provider value={{user, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
} 