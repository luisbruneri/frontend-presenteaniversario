import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './api';
import './style.css';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from '@material-ui/core';


import DialogActions from '@material-ui/core/DialogActions';




function App() {
    const [lista, setLista] = useState([]);
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [idPresente, setIdPresente] = useState('');
    const [destinatario, setDestinatario] = useState('');
    const [clickEditar, setClickEditar] = useState(false);
    const [clickAdicionar, setClickAdicionar] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [subtitulo, setSubtitulo] = useState('');
    
    
    function listaPresentes() {
        api.get('/presente').then((response) => {
            const itens = response.data;
            setLista(itens);
            setNome('');
            setValor('');
            setDestinatario('');
            setIdPresente('');
        })
    }


    useEffect(() => {
        listaPresentes();
    }, [])

    function openModal() {
        setTitulo('Novo Presente');
        setSubtitulo('Adicionar Presente');
        setClickEditar(false);
        setClickAdicionar(true);
        setOpen(true);
    };

    function closeModal() {
        setOpen(false);
    };

    function addPresente() {
        const nome_presente = nome;
        const valor_presente = valor;
        const destinatario_presente = destinatario;

        api.post('/presente', { nome_produto: nome_presente, valor: valor_presente, destinatario: destinatario_presente }).then((response) => {
            setOpen(false);
            listaPresentes();
        });
    }

    function deletar(id) {
        api.delete(`/presente/${id}`).then((response) => {
            listaPresentes();
        });
    }

    function openEdicao(id,nome,valor,destinatario){
        setClickEditar(true);
        setClickAdicionar(false);
        setTitulo('Editar Presente');
        setSubtitulo('Digite as novas informações');
        setOpen(true);
        setNome(nome);
        setValor(valor);
        setIdPresente(id);
        setDestinatario(destinatario);
    }

    function editar(){
        api.put(`/presente/${idPresente}`, { nome_produto: nome, valor: valor, destinatario: destinatario }).then((response) => {
            setOpen(false);
            listaPresentes();
        });
    }

    return (
        <>
            <div>
                <Container maxWidth="lg" className="container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> Código </TableCell>
                                <TableCell> Presente </TableCell>
                                <TableCell> Valor </TableCell>
                                <TableCell> Destinatário </TableCell>
                                <TableCell> # </TableCell>
                                <TableCell> # </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                lista.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.nome_produto}</TableCell>
                                        <TableCell>{item.valor}</TableCell>
                                        <TableCell>{item.destinatario}</TableCell>
                                        <TableCell>
                                             <Button 
                                                onClick={() => deletar(item.id)}
                                                variant="outlined" 
                                                size="small" 
                                                color="secondary">Apagar
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button 
                                                onClick={() => openEdicao(item.id,item.nome_produto,item.valor,item.destinatario)}
                                                variant="outlined" 
                                                size="small" 
                                                color="primary">Editar
                                            </Button>
                                        </TableCell>
                                    </TableRow>))
                            }
                        </TableBody>
                    </Table>
                    <Button
                        onClick={openModal}
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}>
                        Adicionar Presente
            </Button>
                </Container>
                <Dialog open={open} onClose={closeModal} maxWidth="md">
                    <DialogTitle id="form-dialog-title">{titulo}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {subtitulo}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="nome_produto"
                            label="Qual o presente?"
                            autoComplete="off"
                            type="text"
                            fullWidth
                            value={nome != '' ? nome : ''}
                            onChange={e => setNome(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="valor"
                            label="Qual o valor deste presente?"
                            autoComplete="off"
                            type="number"
                            fullWidth
                            value={valor != '' ? valor : ''}
                            onChange={e => setValor(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="destinatario"
                            autoComplete="off"
                            label="Para quem é o presente?"
                            type="text"
                            fullWidth
                            value={destinatario != '' ? destinatario : ''}
                            onChange={e => setDestinatario(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={clickEditar ? editar : addPresente} color="primary">
                            Salvar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

export default App;
