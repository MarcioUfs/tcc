const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../database/db');
const tratarCpf = require('../functions/tratarCpf')

async function create(req, res) {
    await database.select().table('users')
        .where({ cpf: req.body.cpf })
        .orWhere({ email: req.body.email })
        .then(data => {
            if (data.length >= 1) {
                return res.status(409).json({ 'msg': 'Email ou CPF já cadastrado!' })
            } else {
                bcryptjs.genSalt(10, function (err, salt) {
                    bcryptjs.hash(req.body.password, salt, async function (err, hash) {
                        const user = {
                            email: req.body.email, password: hash, cpf: req.body.cpf,
                            nome: req.body.nome, admin: req.body.admin, role: req.body.role
                        }
                        try {
                            if (
                                user.email === '' || user.password === '' || user.cpf === '' ||
                                user.nome === '' || user.admin === '' || user.role === '') {
                                return res.status(403).json({ "msg": "Falta algum dado!" })
                            }
                            await database.insert(user).into('users').then(data => {
                                return res.status(200).json({ "msg": "Cadastrado com sucesso!" })
                            }).catch(err => {
                                return res.status(500).json({ "msg": "Erro interno do servidor" })
                            })
                        } catch (error) {
                            console.log(error)
                        }
                    })
                })
            }
        })
        .catch(err => {
            return res.status(500).json({ "msg": "Erro do servidor" })
        })
}

function login(req, res) {
    let saida = tratarCpf(req.body.cpf);
    if (saida === 0) {
        return res.status(401).send({ "msg": "Credencial inválida!" })
    }
    database.select().table('users')
        .where({ cpf: saida })
        .then(data => {
            if (data.length <= 0) {
                return res.status(401).send({ "msg": "Credencial inválida!" })
            } else {
                bcryptjs.compare(req.body.password, data[0].password, function (err, result) {
                    if (result) {
                        const token = jwt.sign({
                            email: data[0].email,
                            id_user: data[0].id_user,
                            admin: data[0].admin,
                            role: data[0].role
                        }, process.env.SECRET, { expiresIn: '6h' }, function (err, token) {
                            return res.status(200).json({
                                "msg": "Autenticação com sucesso!",
                                "nome": data[0].nome,
                                "id": data[0].id_user,
                                token: token,
                            });
                        });
                    } else {
                        return res.status(401).json({ "msg": "Dados inválidos!!!" })
                    }
                });
            }
        }).catch(error => {
            // console.log(error)
            // console.log({ "msg": "Erro do servidor!", "erro":`"${error}"` })
            return res.status(500).json({ "msg": "Erro do servidor!" })
        })
}
async function confirmAdmin(req, res) {
    if (req.body.password) {
        return res.status(200).json({ "msg": "Admin" })
    } else {
        return res.status(401).send({ "msg": "Não autorizado" })
    }
}
async function allUsers(req, res) {
    await database.select().table('users').orderBy('nome')
        .then(data => {
            const arrayDados = []
            if (data.length > 0) {
                for (element of data) {
                    arrayDados.push(JSON.parse(`{
                        "nome":"${element.nome}",
                        "cpf":"${element.cpf}",
                        "email":"${element.email}",
                        "role":"${element.role}",
                        "id":"${element.id_user}"
                    }`))
                }
                return res.status(200).json(arrayDados);
            }
        })
        .catch(error => {
            return res.status(500).json({ "msg": "Erro do servidor!" })
        })
}
async function deleteUser(req, res) {
    await database.table('users').where({ id_user: req.body.id }).del()
        .then(data => {
            return res.status(200).json({ "msg": "Usuário deletado" });
        })
        .catch(error => {
            return res.status(500).json({ "msg": "Erro do servidor!" })
        })
}
async function updateUser(req, res) {
    if (isNaN(req.params.id)) {
        return res.status(404).send({ "msg": "Usuário não encontrado" })
    }
    if (req.body.nome === '' || req.body.cpf === '' || req.body.email === '' || req.body.password === '') {
        return res.status(403).send({ "msg": "Dados incompletos!" })
    } else {
        bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(req.body.password, salt, async function (err, hash) {
                const user = {
                    email: req.body.email, password: hash, cpf: req.body.cpf, nome: req.body.nome
                }
                try {
                    if (
                        user.email === '' || user.password === '' || user.cpf === '' || user.nome === '') {
                        return res.status(403).json({ "msg": "Falta algum dado!" })
                    }
                    await database
                        .table('users')
                        .where({ id_user: req.params.id })
                        .update(user)
                        .then(data => {
                            return res.status(200).json({ "msg": "Cadastrado com sucesso!" })
                        }).catch(err => {
                            return res.status(500).json({ "msg": "Erro interno do servidor" })
                        })
                } catch (error) {
                    console.log(error)
                }
            })
        })
    }
}
async function catchUser(req, res) {
    await database.table('users').where({ id_user: req.body.id })
        .then(data => {
            if (data.length <= 0) {
                return res.status(404).send({ "msg": "Usuário não encontrado" })
            } else {
                let result = JSON.parse(`{
                "nome":"${data[0].nome}",
                "cpf":"${data[0].cpf}",
                "email":"${data[0].email}",
                "role":"${data[0].role}",
                "id":"${data[0].id_user}"
            }`)
                return res.status(200).send(result)
            }
        })
        .catch(error => {
            return res.status(500).json({ "msg": `"Erro do servidor ${error}"` })
        })
}
module.exports = {
    create: create,
    login: login,
    confirmAdmin: confirmAdmin,
    allUsers: allUsers,
    deleteUser: deleteUser,
    updateUser: updateUser,
    catchUser: catchUser,
}