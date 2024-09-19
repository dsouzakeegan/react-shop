import { createContext, useContext, useReducer } from "react"
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "./Reducer";

const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {

  const products = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.avatarGitHub(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]), // [0, 3, 5, 6, 7]
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5])
  }))
  // Create a product object
  // const products = {
  //   id: faker.string.uuid(),
  //   name: faker.commerce.productName(),
  //   description: faker.commerce.productDescription(),
  //   price: faker.commerce.price(),
  //   image: faker.image.avatar(),
  //   category: faker.commerce.department(),
  //   rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  //   reviews: faker.helpers.arrayElements([faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()]),
  //   // Add more properties as needed
  // };
  console.log(products);

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  })

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  })

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>{ children }</Cart.Provider>
  )
}

export default Context

export const CartState = () => {
  return useContext(Cart) // useState
}