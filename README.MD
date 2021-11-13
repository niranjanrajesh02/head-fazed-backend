# CS-1202 E-Commerce Website - HeadFazed

### By Aryaman, Madhav and Niranjan

Frontend repository: https://github.com/niranjanrajesh02/head-fazed-frontend  
Backend repository: https://github.com/niranjanrajesh02/head-fazed-backend

## How to run HeadFazed

1. Clone both the backend and frontend repos into local machine
2. Enter `npm install` in the terminal for **both of the directories**
3. In the directory for the backend, enter `npm start` to initialise the server on `localhost:4000`
4. In the directory for the frontend, enter `npm run dev` to initialise the front-end application on `localhost:3000`
5. Now you should be able to use the frontend app from `localhost:3000` while it communicates with the server on `localhost:4000`

#### Aryaman: Backend Developer

- Implementation of Cart and Wishlist Documents and Routes
- Added routes to wishlist a product (including calculations of interested users for a product)
- Added routes to add product to cart
- Implementation of Ratings and Review system with corresponding routes (including avg_rating calculations)

#### Madhav: Frontend Developer

- Integrated shop pages and single product page to backend using axios
- Feature to create reviews implemented
- Sorting and filtering integrated with the backend
- Landing Page components implemented
- Recommended products connected

#### Niranjan: Fullstack Developer (Frontend + Backend)

##### Backend

- Backend Initialisation of DB Models and Routes
- Implementation of relations between Documents
- Implementation of Product, User and Seller Models and Routes
- Implementation of Recommendation Engine

##### Frontend

- Initialised frontend using Next.js
- Created components for Navbar, Shop Page, Product Pages and Filtering/Sorting, Account Page, Wishlist, Orders and Cart Pages (all are made to be responsive as well)
- Added authentication (+social log in) using Auth-0 + Global User context
- Search Products feature added
