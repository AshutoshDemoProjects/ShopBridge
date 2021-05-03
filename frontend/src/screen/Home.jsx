import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProductsAction } from '../redux/action/productAction';
import {baseUrl} from '../utilConstants';
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        height: '100%'
    },
    media: {
        height: '15vw',
    },
}));
export default function Home() {
    const styles = useStyles();
    const productList = useSelector((state) => state.productList);
    const { products } = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProductsAction());
    }, [dispatch]);
    return (
        <Grid container>
            {products?.length > 0 && products.map((prod) => (
                <Grid key={prod._id} style={{ padding: 10, }} item xs={3} >
                    <Card className={styles.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                className={styles.media}
                                image={baseUrl+prod.image}
                                title={prod.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h3">{prod.name}</Typography>
                                <Typography gutterBottom variant="h6" component="h3">{prod.brand}</Typography>
                                <Typography gutterBottom variant="h6" component="h4">Price: {prod.price}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {prod.description.substring(0, 100) + "..."}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">Add To Cart</Button>
                            <Button size="small" color="primary">Buy</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
