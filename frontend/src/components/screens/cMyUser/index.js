
import React, { useState, useEffect, useContext } from 'react';
import api from '../../../services/api';
import MenuAdmin from '../../support/menu/menu-admin';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from '../../support/footer/footer-admin';
import useStyles from './make';
import { Context } from './../../../Context/DataContext';

const MyUser = () => {
    const style = useStyles();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [validaEmail, setValidaEmail] = useState(true);
    const [reloadDelete, setRealoadDelete] = useState(false);
    const [upDateUser, setUpDateUser] = useState('');
    const [buttonUpdate, setButtonUpdate] = useState(true);
    const { token } = useContext(Context);

    function mascaraNome(e) {
        let re = e.replace(/(\s{1})(\s)/g, ' ')
            .replace(/[^a-zA-Zà-üÀ-Üª\s]/ig, '');
        setNome(re);
    }

    function mascaraCpf(e) {
        let re = e.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
        setCpf(re);
    }

    function validarEmail(e) {
        var emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        let valid = emailPattern.test(e);
        setValidaEmail(valid);
    }

    useEffect(() => {
        setButtonUpdate(!(nome && email && cpf));
    }, [nome, email, cpf]);

    useEffect(() => {
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            api.get('/getUser', config)
                .then(function (dat) {
                    if (dat.status === 200 || dat.status === 201) {
                        setNome(dat.data.nome);
                        setCpf(dat.data.cpf);
                        setEmail(dat.data.email);
                        setUpDateUser(dat.data.id);
                    }
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    }, [token, reloadDelete]);

    function saudacaoDoDia() {
        const hora = new Date().getHours();
        if (hora >= 6 && hora < 12) {
          return 'Bom dia';
        } else if (hora >= 12 && hora < 18) {
          return 'Boa tarde';
        } else {
          return 'Boa noite';
        }
    }
    function resetPage() {
        window.location.reload();
    }
    function handleUpdate(e) {
        e.preventDefault();
        try {
            if (!nome || !email || !cpf) {
                alert("Preencha todos os campos");
                return;
            }
            const userData = {
                email,
                cpf,
                nome
            };
            api.put(`/updateMyUser/${upDateUser}`, userData)
                .then(function (response) {
                    if (response.status === 200) {
                        alert("Cadastro atualizado!");
                        resetDados();
                    } else {
                        alert("Erro ao atualizar o cadastro");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Erro ao atualizar o cadastro");
                });
        } catch (error) {
            console.log(error);
        }
    }

    function MyBack() {
        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={style.mainContainer}>
                    <form onSubmit={e => handleUpdate(e)}>
                        {/* <Typography variant="h5" color="textSecondary" align="center">{saudacaoDoDia()}, {nome.split(' ')[0]}</Typography> */}
                        <Typography variant="h5" color="textSecondary" align="center">{saudacaoDoDia()}, {nome ? nome.split(' ')[0] : 'Visitante'}</Typography>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="nome"
                            label="Nome"
                            type="text"
                            id="nome"
                            value={nome}
                            autoComplete="off"
                            onChange={e => mascaraNome(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="cpf"
                            label="Cpf"
                            type="text"
                            id="cpf"
                            value={cpf}
                            autoComplete="off"
                            onChange={e => mascaraCpf(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
                            id="email"
                            value={email}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={(e) => validarEmail(e.target.value)}
                        />
                        {(validaEmail) ? null : (<em>Email inválido!</em>)}
                       
                        <div>
                            <em>* Todos os campos são de preenchimento obrigatório</em>
                        </div>
                        <div className={style.divButtons}>
                            <Button
                                type="reset"
                                variant="contained"
                                color="warning"
                                onClick={(e) => resetPage()}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="reset"
                                variant="contained"
                                color="warning"
                                onClick={(e) => resetDados()}
                            >
                                Limpar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={buttonUpdate}
                            >
                                Enviar
                            </Button>

                        </div>
                    </form>
                </div>
            </Container >
        )
    }

    function resetDados() {
        setEmail('');
        setCpf('');
        setNome('');
        setRealoadDelete(true);
        setRealoadDelete(false);
        setButtonUpdate(true);
    }

    return (
        <Container component="main" maxWidth="md">
            <div className={style.mainContainer}>
                <CssBaseline />
                <MenuAdmin view={"Minha conta"} />
            </div>
            <div>
                {MyBack()}
            </div>
            <Box mt={8} ml={8}>
                <Footer />
            </Box>
        </Container>
    )
}

export default MyUser;



// import React, { useState, useEffect, useContext } from 'react';
// import api from '../../../services/api'
// // import MenuAdmin from '../menu/menu-admin';
// import MenuAdmin from '../../support/menu/menu-admin';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Container from '@material-ui/core/Container';
// import Typography from "@material-ui/core/Typography";
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Footer from '../../support/footer/footer-admin';
// import useStyles from './make';
// import { Context } from './../../../Context/DataContext';

// const Person = () => {
//     const style = useStyles();
//     const [nome, setNome] = useState('');
//     const [email, setEmail] = useState('');
//     const [cpf, setCpf] = useState('');
//     const [validaEmail, setValidaEmail] = useState(true);
//     const [reloadDelete, setRealoadDelete] = useState(false);
//     const [upDateUser, setUpDateUser] = useState('');
//     const [buttonUpdate, setButtonUpdate] = useState(true);
//     const { token} = useContext(Context);
//     // const [boolBack, setBoolBack] = useState(false);
//     // const [boolList, setBoolList] = useState(false);
//     // const [buttonSubmit, setButtonSubmit] = useState(true);


//     function mascaraNome(e) {
//         let re = e.replace(/(\s{1})(\s)/g, ' ')
//             .replace(/[^a-zA-Zà-üÀ-Üª\s]/ig, '')
//         return setNome(re)
//     }
//     function mascaraCpf(e) {
//         let re = e.replace(/\D/g, '')
//             .replace(/(\d{3})(\d)/, '$1.$2')
//             .replace(/(\d{3})(\d)/, '$1.$2')
//             .replace(/(\d{3})(\d{1,2})/, '$1-$2')
//             .replace(/(-\d{2})\d+?$/, '$1')
//         return setCpf(re)

//     }
//     function validarEmail(e) {
//         var emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
//         let valid = emailPattern.test(e)
//         setValidaEmail(valid)
//         return validaEmail
//     }
//     useEffect(() => {
//         if (nome !== '' && email !== '' && cpf !== '') {
//             setButtonUpdate(false);
//         } else {
//             setButtonUpdate(true);
//         }
//     }, [nome, email, cpf, buttonUpdate])
//     useEffect(() => {
//         if (token) {
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             };
//             api.get('/getUser', config)
//                 .then(function (dat) {
//                     if (dat.status === 200 || dat.status === 201) {
//                         // setDataPerson(dat.data)
//                         setNome(dat.data.nome);
//                         setCpf(dat.data.cpf);
//                         setEmail(dat.data.email)
//                         setUpDateUser(dat.data.id)
//                     }
//                 })
//                 .catch(function (error) {
//                     // setValidaSenha(false)
//                     console.error(error);
//                 });
//         }
//     }, [token, reloadDelete]);
//     function saudacaoDoDia() {
//         const hora = new Date().getHours();
//         if (hora >= 6 && hora < 12) {
//           return 'Bom dia';
//         } else if (hora >= 12 && hora < 18) {
//           return 'Boa tarde';
//         } else {
//           return 'Boa noite';
//         }
//       }
//     function handleUpdate(e) {
//         e.preventDefault();
//         try {
//             if (!nome || !email || !cpf ) {
//                 alert("Preencha todos os campos");
//             } else {
//                 const userData = {
//                     email,
//                     cpf,
//                     nome
//                 };
    
//                 api.put(`/updateMyUser/${upDateUser}`, userData)
//                     .then(function (response) {
//                         if (response.status === 200) {
//                             alert("Cadastro atualizado!");
//                             resetDados();
//                         } else {
//                             alert("Erro ao atualizar o cadastro");
//                         }
//                     })
//                     .catch(function (error) {
//                         console.log(error);
//                         alert("Erro ao atualizar o cadastro");
//                     });
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     function MyBack() {
//         return (
//             <Container component="main" maxWidth="sm">
//                 <CssBaseline />
//                 <div className={style.mainContainer}>
//                     <form onSubmit={e => handleUpdate(e)}>
//                         {/* <Typography variant="h5" color="textSecondary" align="center">{saudacaoDoDia()}, {nome.split(' ')[0]}</Typography> */}
//                         <Typography variant="h5" color="textSecondary" align="center">{saudacaoDoDia()}, {nome.split(' ')[0]}</Typography>
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="nome"
//                             label="Nome"
//                             type="text"
//                             id="nome"
//                             value={nome}
//                             autoComplete="off"
//                             onChange={e => mascaraNome(e.target.value)}
//                         />
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="cpf"
//                             label="Cpf"
//                             type="text"
//                             id="cpf"
//                             value={cpf}
//                             autoComplete="off"
//                             onChange={e => mascaraCpf(e.target.value)}
//                         />
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="email"
//                             label="Email"
//                             type="email"
//                             id="email"
//                             value={email}
//                             autoComplete="off"
//                             onChange={(e) => setEmail(e.target.value)}
//                             onBlur={(e) => validarEmail(e.target.value)}
//                         />
//                         {(validaEmail) ? null : (<em>Email inválido!</em>)}
                       
//                         <div>
//                             <em>* Todos os campos são de preenchimento obrigatório</em>
//                         </div>
//                         <div className={style.divButtons}>
//                             <Button
//                                 type="reset"
//                                 variant="contained"
//                                 color="warning"
//                                 onClick={(e) => resetDados()}
//                             >
//                                 Cancelar
//                             </Button>
//                             <Button
//                                 type="reset"
//                                 variant="contained"
//                                 color="warning"
//                                 onClick={(e) => resetCampos()}
//                             >
//                                 Limpar
//                             </Button>
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 color="primary"
//                                 disabled={buttonUpdate}
//                             >
//                                 Enviar
//                             </Button>

//                         </div>
//                     </form>
//                 </div>
//             </Container >
//         )
//     }
//     function resetDados() {
//         setEmail('');
//         setCpf('');
//         setNome('');
//         // setButtonSubmit(true);
//         // setBoolList(false);
//         setRealoadDelete(true);
//         setRealoadDelete(false);
//         // setBoolBack(false);
//         setButtonUpdate(true);
//     }
//     function resetCampos() {
//         setEmail('');
//         setCpf('');
//         setNome('');
//         setButtonUpdate(true);
//     }
    
//     return (
//         <Container component="main" maxWidth="md">
//             <div className={style.mainContainer}>
//                 <CssBaseline />
//                 <MenuAdmin view={"Usuário"} />
//             </div>
//             <div>
//                 {MyBack()}
//             </div>
//             <Box mt={8} ml={8}>
//                 <Footer />
//             </Box>
//         </Container>
//     )
// }
// export default Person

