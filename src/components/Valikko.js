import { useState } from 'react';
import { AppBar, TextField, Toolbar, Typography, Button, Container } from "@material-ui/core";
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    container : {
        background: "#0D1114",
        paddingTop : "2%"
    },

    appbar : {
        background : "transparent"
    },
    button : {
        marginLeft : "30%"
    }

});

function Valikko(props) {

    const tyylit = useStyles();
    const [open, setOpen] = useState(false);
    const [PK, setPK] = useState("");

    const avaaDialog = () => {
        setOpen(true);
      };
    
    const suljeDialog = () => {

    props.setPaikkakunta(PK)
    setOpen(false); 
    };

    return (
        <Container className={tyylit.container}>

            <AppBar className={tyylit.appbar} position="sticky">
                <Toolbar>
                    <Typography variant="h5">Mobiilisää</Typography>
                    <Button className={tyylit.button} onClick={avaaDialog} color="secondary">Vaihda kaupunki</Button>
                </Toolbar>
            </AppBar>

            <Dialog open={open} onClose={suljeDialog} aria-labelledby="title">
                <DialogTitle id="title">Vaihda kaupunki</DialogTitle>
                <DialogContent>
                    <TextField
                    id="kaupunki"
                    label="Kirjoita kaupunki"
                    onChange={(e) => {
                        setPK(e.target.value);
                      }}
                    />
                </DialogContent>
                <DialogActions>
          <Button onClick={suljeDialog} color="primary">
            OK
          </Button>
        </DialogActions>
            </Dialog>

        </Container>

    );

}

export default Valikko;