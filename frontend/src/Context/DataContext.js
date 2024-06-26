
import React, { createContext, useState, useEffect } from "react";
import api from '../services/api';

const Context = createContext();

function DadosProvider({ children }) {
    const [val, setVal] = useState({ nome: '' });
    const [resultadoBack, setResultadoBack] = useState({});
    const [munic, setMunic] = useState([]);
    const [parent, setParent] = useState([]);
    const [tokenSource, setTokenSource] = useState(null); 
    const [token, setToken] = useState('');
    const [headers, setHeaders] = useState({}); 

    useEffect(() => {
        let token;
        let source;

        
        if (localStorage.getItem('@cadunico-Token')) {
            token = localStorage.getItem('@cadunico-Token');
            source = 'localStorage';
        }
        
        else if (sessionStorage.getItem('@cadunico-Token')) {
            token = sessionStorage.getItem('@cadunico-Token');
            source = 'sessionStorage';
        }

        
        if (token) {
            setToken(token);
            setTokenSource(source);
        }

        
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        setHeaders(header);
    }, [munic, parent]);

    useEffect(() => {
        api.get('/list/municipios', headers)
            .then(function (dat) {
                setMunic(dat.data)
            })
            .catch(function (err) {
                console.log(err)
                
                window.location.href = "/";
            })
    }, []);

    useEffect(() => {
        api.get('/list/parente', headers)
            .then(function (dat) {
                setParent(dat.data)
            })
            .catch(function (err) {
                console.log(err)
                
                window.location.href = "/";
            })
    }, []);

    
    function receDat(dados) {
        return setVal(dados)
    }

    function receBack(back) {
        return setResultadoBack(back)
    }

    function receTok(tok) {
        return setToken(tok)
    }

    return (
        <Context.Provider
            value={{ val, resultadoBack, 
            receDat, receBack, receTok, 
            token, tokenSource, munic, 
            parent, headers }}>
            {children}
        </Context.Provider>
    )
}

export { Context, DadosProvider }


// import React, { createContext, useState, useEffect } from "react";
// import api from '../services/api'
// const Context = createContext();

// function DadosProvider({ children }) {
//     const [val, setVal] = useState({ nome: '' });
//     const [resultadoBack, setResultadoBack] = useState({})
//     const [munic, setMunic] = useState([]);
//     const [parent, setParent] = useState([]);
//     const [recebeToken, setRecebeToken] = useState({});
//     const [headers, setHeaders] = useState({});
//     useEffect(() => {
//         let token
//         if (localStorage.length > 1) {
//             token = localStorage.getItem('@cadunico-Token');
//         } else {
//             token = sessionStorage.getItem('@cadunico-Token')
//         }

//         const header = {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }
//         setHeaders(header)
//     }, [munic, parent])
//     useEffect(() => {
//         api.get('/list/municipios', headers)
//             .then(function (dat) {
//                 setMunic(dat.data)
//             })
//             .catch(function (err) {
//                 console.log(err)
//                 // alert("Sessão expirada, efetue novo login!")
//                 window.location.href = "/";
//             })
//     }, [])
//     useEffect(() => {
//         api.get('/list/parente', headers)
//             .then(function (dat) {
//                 setParent(dat.data)
//             })
//             .catch(function (err) {
//                 console.log(err)
//                 // alert("Sessão expirada, efetue novo login!")
//                 window.location.href = "/";
//             })
//     }, [])
//     // const user = { name: 'Gustavo' }
//     function receDat(dados) {
//         return setVal(dados)
//     }
//     function receBack(back) {
//         return setResultadoBack(back)
//     }
//     function receTok(tok) {
//         return setRecebeToken(tok)
//     }
//     return (
//         <Context.Provider
//             value={{ val, resultadoBack, 
//             receDat, receBack, receTok, 
//             recebeToken, munic, parent, 
//             headers }}>
//             {children}
//         </Context.Provider>
//     )
// }

// export { Context, DadosProvider }
