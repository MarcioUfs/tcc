import React, { useState, useEffect } from "react";
import api from '../../../services/api'
// import MenuAdmin from '../menu/menu-admin';
import MenuAdmin from '../../support/menu/menu-admin';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from '../../support/footer/footer-admin';
import useStyles from './make';
const Person = () => {
    const style = useStyles();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validaEmail, setValidaEmail] = useState(true);
    const [autorizacao, setAutorizacao] = useState('');
    const [boolAut, setBoolAut] = useState(true);
    const [validaSenha, setValidaSenha] = useState(true);
    const [confirmPass, setConfirmPass] = useState(true);
    const [buttonSubmit, setButtonSubmit] = useState(true);
    const [dataPerson, setDataPerson] = useState([]);
    const [reloadDelete, setRealoadDelete] = useState(false);
    const [boolList, setBoolList] = useState(false);
    const [upDateUser, setUpDateUser] = useState('');
    const [boolBack, setBoolBack] = useState(false);
    const [buttonUpdate, setButtonUpdate] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        try {
            let tamanho = cpf.length;
            if (tamanho < 14 || tamanho > 15) {
                return setCpf('')
            }
            if (!nome || !email || !password || !confirmPassword || !cpf) {
                alert("Preencha os dados faltante para continuar")
            } else {
                const envio = JSON.parse(`{
                    "email":"${email}",
                    "password":"${password}",
                    "cpf":"${cpf}",
                    "nome":"${nome}",
                    "admin":"false",
                    "role":"user"
                }`)
                api.post('/sign-up', envio)
                    .then(function (dat) {
                        if (dat.status === 200) {
                            alert("Cadastro efetuado!")
                            resetDados()
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }
        } catch (error) {
            console.log(error)
        }
    }
    function mascaraNome(e) {
        let re = e.replace(/(\s{1})(\s)/g, ' ')
            .replace(/[^a-zA-Zà-üÀ-Üª\s]/ig, '')
        return setNome(re)
    }
    function mascaraCpf(e) {
        let re = e.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')


        return setCpf(re)

    }
    function validarEmail(e) {
        var emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        let valid = emailPattern.test(e)
        setValidaEmail(valid)
        return validaEmail
    }
    useEffect(() => {
        function validarSenha(pass, confirm) {
            if (pass !== '' && confirm !== '') {
                if (pass !== confirm) {
                    setConfirmPass(false)
                } else {
                    setConfirmPass(true)
                }
            }
        }
        validarSenha(password, confirmPassword);
    }, [password, confirmPassword])
    useEffect(() => {
        if (nome !== '' && email !== '' && password !== '' && confirmPassword !== '' && cpf !== '') {
            if (password === confirmPassword) {
                setButtonSubmit(false);
            }
        }
    }, [nome, email, password, confirmPassword, cpf, buttonSubmit])
    useEffect(() => {
        if (nome !== '' && email !== '' && cpf !== '' && password !== '' && confirmPassword !== '') {
            if (password === confirmPassword) {
                setButtonUpdate(false);
            } else {
                setButtonUpdate(true);
            }
        }
    }, [nome, email, cpf, buttonUpdate, password, confirmPassword])
    useEffect(() => {
        api.get('/allusers')
            .then(function (dat) {
                if (dat.status === 200 || dat.status === 201) {
                    setDataPerson(dat.data)
                }
            })
            .catch(function (error) {
                // setValidaSenha(false)
                console.error(error);
            })
    }, [autorizacao, reloadDelete])
    function confirmAdmin(e) {
        e.preventDefault();
        if (!autorizacao || autorizacao === '') {
            alert("Insira um valor válido!");
        } else {
            let envio = JSON.parse(`{"password":"${autorizacao}"}`)
            api.post('/confirm', envio)
                .then(function (dat) {
                    if (dat.status === 200 || dat.status === 201) {
                        setBoolAut(false)
                    }
                })
                .catch(function (error) {
                    setValidaSenha(false)
                    console.error(error);
                })
                .finally(function () {
                    setAutorizacao('')
                })
        }
        return
    }
    function deleteUser(id) {
        let envio = JSON.parse(`{"id":"${id}"}`)
        api.post('/deleteuser', envio)
            .then(function (dat) {
                if (dat.status === 200 || dat.status === 201) {
                    setRealoadDelete(true);
                    alert('deletado!!!')
                }
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                setRealoadDelete(false);
                resetDados();
            })
    }
    function handleUpdate(e) {
        e.preventDefault();
        try {
            if (!nome || !email || !cpf || !confirmPassword || !password) {
                alert("Preencha os dados faltante")
            } else {
                const envio = JSON.parse(`{
                    "email":"${email}",
                    "cpf":"${cpf}",
                    "password":"${password}",
                    "nome":"${nome}",
                    "admin":"false",
                    "role":"user"
                }`)
                api.put(`/updateuser/${upDateUser}`, envio)
                    .then(function (dat) {
                        if (dat.status === 200) {
                            alert("Cadastro atualizado!")
                            resetDados()
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }
        } catch (error) {
            console.log(error)
        }
    }
    // useEffect(() => { console.log(upDateUser) })
    function pegarUsuario(id) {
        let envio = JSON.parse(`{"id":"${id}"}`)
        api.post('/catchuser', envio)
            .then(function (dat) {
                if (dat.status === 200 || dat.status === 201) {
                    setBoolList(false);
                    setBoolBack(true);
                    setNome(dat.data.nome);
                    setCpf(dat.data.cpf);
                    setEmail(dat.data.email)
                    setUpDateUser(dat.data.id)
                }
            })
            .catch(function (error) {
                console.error(error);
            })
        return
    }
    function MyForm() {
        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={style.mainContainer}>
                    <form onSubmit={e => handleSubmit(e)}>
                        <Typography variant="h5" color="textSecondary" align="center">Formulário de cadastro de usuários</Typography>
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            value={password}
                            autoComplete="off"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirme a Senha"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            autoComplete="off"
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <div>
                            {(confirmPass) ? null : (<em>As senha não conferem!</em>)}
                        </div>
                        <div>
                            <em>* Todos os campos são de preenchimento obrigatório</em>
                        </div>
                        <div className={style.divButtons}>
                            <Button
                                type="reset"
                                variant="contained"
                                color="warning"
                                onClick={(e) => resetDados()}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="reset"
                                variant="contained"
                                color="warning"
                                onClick={(e) => resetCampos()}
                            >
                                Limpar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={buttonSubmit}
                            >
                                Enviar
                            </Button>

                        </div>
                    </form>
                </div>
            </Container >
        )
    }
    function MyBack() {
        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={style.mainContainer}>
                    <form onSubmit={e => handleUpdate(e)}>
                        <Typography variant="h5" color="textSecondary" align="center">Formulário de edição de usuários</Typography>
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            value={password}
                            autoComplete="off"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirme a Senha"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            autoComplete="off"
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <div>
                            {(confirmPass) ? null : (<em>As senha não conferem!</em>)}
                        </div>
                        <div>
                            <em>* Todos os campos são de preenchimento obrigatório</em>
                        </div>
                        <div className={style.divButtons}>
                            <Button
                                type="reset"
                                variant="contained"
                                color="warning"
                                onClick={(e) => resetDados()}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="reset"
                                variant="contained"
                                color="warning"
                                onClick={(e) => resetCampos()}
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
        setPassword('');
        setCpf('');
        setNome('');
        setConfirmPassword('');
        setButtonSubmit(true);
        setBoolList(false);
        setRealoadDelete(true);
        setRealoadDelete(false);
        setBoolBack(false);
        setButtonUpdate(true);
    }
    function resetCampos() {
        setEmail('');
        setPassword('');
        setCpf('');
        setNome('');
        setConfirmPassword('');
        setButtonUpdate(true);
    }
    function chamadaNovo() {
        setEmail('');
        setPassword('');
        setCpf('');
        setNome('');
        setConfirmPassword('');
        setBoolList(true);
        setBoolBack(false);
    }
    return (
        <Container component="main" maxWidth="md">
            <div className={style.mainContainer}>
                <CssBaseline />
                <MenuAdmin view={"Usuários"} />
                {boolAut ? (
                    <form onSubmit={e => confirmAdmin(e)} >
                        <Typography variant="h6" color="textSecondary" align="center">Insira sua senha de administrador</Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="autorizacao"
                            label="Autorização"
                            type="password"
                            id="autorizacao"
                            value={autorizacao}
                            autoComplete="off"
                            onChange={e => setAutorizacao(e.target.value)}
                            onMouseLeave={(e) => setValidaSenha(true)}
                        />
                        <div>
                            {(validaSenha) ? null : (<em>Senha inválida!</em>)}
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Enviar
                        </Button>
                    </form>
                ) : (
                    <>
                        <div>
                            <Typography variant="h5" color="textSecondary" align="center">Lista de usuários</Typography>
                            <div>
                                <Button
                                    title="Adicionar"
                                    alt="Opção Adicionar"
                                    type="text"
                                    variant="contained"
                                    color="primary"
                                    ml={8}
                                    onClick={(e) => chamadaNovo()}
                                >
                                    Novo usuário
                                </Button>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Ordem</th>
                                        <th>Nome</th>
                                        <th>Cpf</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Editar</th>
                                        <th>Excluir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPerson.map((pessoa, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{pessoa.nome}</td>
                                                <td>{pessoa.cpf}</td>
                                                <td>{pessoa.email}</td>
                                                <td>{pessoa.role}</td>
                                                <td>{<Button
                                                    title="Editar"
                                                    alt="Opção editar"
                                                    type="text"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={(e) => pegarUsuario(pessoa.id)}
                                                >
                                                    Editar
                                                </Button>}
                                                </td>
                                                <td>{<Button
                                                    title="Excluir"
                                                    alt="Opção excluir"
                                                    type="text"
                                                    variant="contained"
                                                    color="error"
                                                    onClick={(e) => deleteUser(pessoa.id)}
                                                >
                                                    Excluir
                                                </Button>}
                                                </td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
            <div>
                {boolList && MyForm()}
                {boolBack && MyBack()}
            </div>
            <Box mt={8} ml={8}>
                <Footer />
            </Box>
        </Container>
    )
}
export default Person