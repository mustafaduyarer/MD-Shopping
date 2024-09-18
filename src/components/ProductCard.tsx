import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ProductType } from '../types/Types'

interface ProductCardProps{
    product : ProductType
}

function ProductCard(props: ProductCardProps) {
    const { id, title, price, description, category, image, rating } = props.product;
  return (
    <Card sx={{cursor:'pointer',boxShadow:'1px 5px 5px lightgrey', width:'330px', height:'660px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center', margin:'60px 10px'}}>
    <img src={image} width={230} height={230} />
    <CardContent sx={{height:'250px'}}>
      <Typography gutterBottom variant="h5" component="div">
        {title.substring(1,200)}...
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {description.substring(1,200)}...
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" variant='outlined' color='info'>Detail</Button>
     
    </CardActions>
  </Card>
  )
}

export default ProductCard