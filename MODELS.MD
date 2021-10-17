USER
{
id: num,
name: str,
email: str,
pass: hashed str,
date: date,
cart: {[ids of products]},
wishlist: {[ids of products]}
}

PRODUCT
{
id: num,
name: str,
price: num,
description: str,
images: {[img1, img2, etc]},
seller: num (relation ID to seller),
date: date
}

SELLER
{
id: num,
name: str,  
 products: {[ids of products]},
date: date
}
