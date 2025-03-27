import * as React from 'react';
import {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid2";
import Card from "../Card/Card";
import {fetchGoods} from "../../app/redux/slices/productsSlice";
import {Box} from "@mui/material";
import Button from '../Button/Button';
import './CartPopUp.scss';


const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function CartPopUp({open, handleClose}) {
    const dispatch = useDispatch();
    const allGoods = useSelector((state) => state.goods.goods);
    const goodsStatus = useSelector((state) => state.goods.status); // Fetch status for goods
    const cartGoodsIds = useSelector((state) => state.cart.cartItems);

    useEffect(() => {
//         // Fetch all goods if not already loaded
        if (goodsStatus === "idle") {
            dispatch(fetchGoods());
        }
    }, [dispatch, goodsStatus]);

    // Filter goods based on updated Redux favorite IDs
    const cartGoods = allGoods.filter((good) => cartGoodsIds.includes(good.id));

    return (
        <React.Fragment>
            <BootstrapDialog
                fullWidth = 'true'
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth= '1250px'
            >
                <DialogTitle sx={{margin: '24px', textAlign: 'left', p: 0}} id="customized-dialog-title">
                    Cart
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box sx={{maxWidth: '878px', width: '70%'}}>
                            {cartGoods.length === 0 ?
                                (<p>Please add goods to your cart.</p>
                                ) : (
                                    <Grid container spacing={1} direction="column">
                                        {cartGoods.map((product) => (
                                            <Grid item key={product.id}>
                                                <Box sx={{display: 'flex', borderBottom: '1px solid black', padding: '24px', width: '878px'}}>
                                                    <Card product={product}></Card>
                                                    <div className='cart_product-name'>{product.name}</div>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                        </Box>

                        <Box sx={{display: 'flex', flexDirection: 'column', maxWidth: '315px', minWidth: '315px', width: '30%', padding: '24px', marginLeft: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black'}}>
                                <div>Order price</div>
                                <div>0</div>
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>Total price</div>
                                <div>0</div>
                            </Box>
                            <Button text={'Checkout'} />
                        </Box>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}

export default CartPopUp;