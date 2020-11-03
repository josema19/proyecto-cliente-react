// Importar librerías
import React, { useReducer } from 'react';

// Importar context
import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';

// Importar configuraciones
import axiosClient from '../../config/axios';

const ProductState = ({ children }) => {
    // Definir state inicial
    const initialState = {
        message: null,
        products: [],
        product: null,
        loading: true,
    };

    // Definir reducer
    const [state, dispatch] = useReducer(ProductReducer, initialState);

    // Definir funciones

    // Renderizar componente
    return (
        <ProductContext.Provider
            value={{
                loading: state.loading,
                message: state.message,
                products: state.users,
                product: state.product,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export default ProductState;
