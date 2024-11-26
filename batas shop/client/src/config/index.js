export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "porduct name",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description of product",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "Baklava", label: "Baklava" },
      { id: "Turkish delight", label: "Turkish delight" },
      { id: "Coffee", label: "Coffee" },
      { id: "Oil", label: "Oil" },
      { id: "Cosmetics", label: "Cosmetics" },
      { id: "Chocolate", label: "Chocolate" },
      { id: "Nuts", label: "Nuts" },
      { id: "Teas", label: "Teas" },
      { id: "Spices", label: "Spices" },
      { id: "Honey", label: "Honey" },
      { id: "Perfumes", label: "Perfumes" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "Sweets",
    label: "Sweets",
    path: "/shop/listing",
  },
  {
    id: "Teas",
    label: "Teas",
    path: "/shop/listing",
  },
  {
    id: "Spices",
    label: "Spices",
    path: "/shop/listing",
  },
  {
    id: "Honey",
    label: "Honey",
    path: "/shop/listing",
  },
  {
    id: "Perfumes",
    label: "Perfumes",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];



export const categoryOptionsMap = {
  Baklava: "Baklava",
  "Turkish delight": "Turkish delight",
  Coffee: "Coffee",
  Oil: "Oil",
  Cosmetics: "Cosmetics",
  Chocolate: "Chocolate",
  Nuts: "Nuts",
  Teas: "Teas",
  Spices: "Spices",
  Honey: "Honey",
  Perfumes: "Perfumes",
};


export const filterOptions = {
  category: [
    { id: "Baklava", label: "Baklava" },
      { id: "Turkish delight", label: "Turkish delight" },
      { id: "Coffee", label: "Coffee" },
      { id: "Oil", label: "Oil" },
      { id: "Cosmetics", label: "Cosmetics" },
      { id: "Chocolate", label: "Chocolate" },
      { id: "Nuts", label: "Nuts" },
      { id: "Teas", label: "Teas" },
      { id: "Spices", label: "Spices" },
      { id: "Honey", label: "Honey" },
      { id: "Perfumes", label: "Perfumes" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];
