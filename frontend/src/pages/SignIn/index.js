import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Footer from '../../components/support/footer/footer-admin'
import api from "../../services/api";
import { login } from "../../services/auth";
import MaskedInput from 'react-text-mask';
import avatarImage from './brasao.webp';
import "./index.css"

class SignIn extends Component {
  state = {
    cpf: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { cpf, password } = this.state;
    if (!cpf || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      let recebe = JSON.parse(`{"cpf":"${cpf}","password":"${password}"}`)
      try {
        const response = await api.post("/login", recebe);
        login(response.data.token);
        this.props.history.push("/tabulador");
      } catch (err) {
        this.setState({
          error: "Houve um problema com o login, verifique suas credenciais."
        });
      }
    }
  };

  handleClearFields = () => {
    this.setState({ cpf: "", password: "" });
  };

  render() {
    return (
      <Container component="main" maxWidth="xs" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CssBaseline />
        <div className="paper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
          <div className="center">
            <Avatar className="avatar" src={avatarImage} style={{ width: '150px', height: '150px' }} />
            <Typography component="h1" variant="h5">
              Acesso servidores
            </Typography>
          </div>

          <form onSubmit={this.handleSignIn} className="form" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {this.state.error && <p>{this.state.error}</p>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cpf"
              label="CPF"
              name="cpf"
              autoComplete="off"
              autoFocus
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputComponent: MaskedInput,
                inputProps: {
                  mask: [
                    /\d/,
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                  ],
                  placeholderChar: "\u2000",
                  guide: false,
                  showMask: true,
                },
                classes: {
                  input: "textFieldInput",
                },
              }}
              value={this.state.cpf}
              onChange={(e) => this.setState({ cpf: e.target.value })}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                className="submit"
                style={{ width: '100px', marginRight: '8px' }}
                onClick={this.handleClearFields}
              >
                Limpar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submit"
                style={{ width: '100px' }}
              >
                Entrar
              </Button>
            </div>
          </form>
        </div>
        <Footer />
      </Container>
    )
  }
}

export default withRouter(SignIn);
