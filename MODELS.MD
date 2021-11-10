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
date: date,
ratings: [num],
avg_rating: num,
reviews: [rel ids of reviews],
categories: [str],
wishlisted: int of number of users wishlisted
}

REVIEW
{
id: num,
user: rel id of user,
product: rel id of product,
review_text: str,
rating: num,
date: date
}

SELLER
{
id: num,
name: str,  
products: {[ids of products]},
date: date,
logo: str
}

CART
{
user: rel id of usr,
products: [rel id of products],
total_val: int
}

WISHLIST
{
user: rel id of user,
products: [rel id of products]
}
