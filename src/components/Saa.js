import { useState, useEffect } from 'react';
import {Typography, Snackbar, Container, Backdrop, CircularProgress } from "@material-ui/core";
import {List, ListItemText, Avatar, ListItemAvatar, ListItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
        container : {
                        background: "linear-gradient(180deg, #0D1114 30%, #242F38 90%)",
                        paddingTop : "30px",
                        color: "white"
                    },
        TuntuuAvatar :   {
                        height: 100,
                        width: 100,
                        backgroundColor: "transparent",
                        fontSize: "1em"
                    },
        CAvatar :   {
                        height: 100,
                        width: 100,
                        backgroundColor: "transparent",
                        fontSize: "2em"
                    },
        SaaIcon :   {
                        height: 100,
                        width: 100
                    },
        listItem :  {
                        paddingLeft : "10%"
                    }
    });

function Saa(props) {

    const tyylit = useStyles();

    const [data, setData] = useState({
        saa : [],
        virhe : null,
        tiedotHaettu : false
    });

    const [IsoPaikkakunta, setIsoPaikkakunta] = useState("")
    const aakkoset = {"ä" : "a", "å" : "a", "ö" : "o"}

    const haeTiedot = async (paikkakunta) => {
        
        try {

            const yhteys = await fetch(`https://so3server.herokuapp.com/saatilanne/${paikkakunta.replace(/[äö]/g, m => aakkoset[m])}`);
            const tiedot = await yhteys.json();

            setIsoPaikkakunta(props.paikkakunta.charAt(0).toUpperCase() + props.paikkakunta.slice(1));

            setData({
            ...data,
            saa : tiedot,
            tiedotHaettu : true
            });

        } catch (e) {

            setData({
            ...data,
            virhe : `Palvelimeen ei saada yhteyttä: ${e.message}`,
            tiedotHaettu : true
            });

        }
    }

    useEffect(() => { 
        haeTiedot(props.paikkakunta); 
    }, [props.paikkakunta]); 

    return (

        <Container>

            {(data.tiedotHaettu)
            ? (data.saa.cod === "404")
                ? <Snackbar
                    open={true}
                    message={`Kaupunkia ${IsoPaikkakunta} ei löydy. :(`}
                />
                : <div className={tyylit.container}> 
                <Typography align="center" color="secondary" variant="h5">{IsoPaikkakunta}</Typography>
                
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={tyylit.SaaIcon} alt="icon" src={`http://openweathermap.org/img/wn/${data.saa.weather[0].icon}@2x.png`}/>
                        </ListItemAvatar>
                        <ListItemText className={tyylit.listItem} primary={data.saa.weather[0].description.charAt(0).toUpperCase() + data.saa.weather[0].description.slice(1)}/>
                        </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={tyylit.CAvatar}>°C</Avatar>
                        </ListItemAvatar>
                        <ListItemText className={tyylit.listItem} primary={data.saa.main["temp"]}/>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={tyylit.TuntuuAvatar}>Tuntuu kuin</Avatar>
                        </ListItemAvatar>
                        <ListItemText className={tyylit.listItem} primary={data.saa.main["feels_like"]}/>
                    </ListItem>
                </List>
            </div> 
            : <Backdrop open={true}>
            <CircularProgress color="inherit"/>
            </Backdrop>
            }

        </Container>
    );

}

export default Saa;