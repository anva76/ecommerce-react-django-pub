const serverUrl = import.meta.env.VITE_API_SERVER_URL

const filterChoices = [
  { name: "RAM", values: ["all", "8GB", "16GB", "32GB"] },
  { name: "Storage", values: ["all", "64GB", "128GB", "256GB"] },
  { name: "HDD", values: ["all", "1TB", "2TB"] },
  { name: "SSD", values: ["all", "128GB", "256GB", "512GB"] },
  {
    name: "Processor",
    values: ["all", "i3", "i5", "i7", "Arm Cortex", "Snapdragon"],
  },
]

const colorList = [
  "black",
  "gray",
  "blue",
  "brown",
  "green",
  "purple",
  "red",
  "violet",
  "pink",
  "skyblue",
  "yellow",
  "white",
]

const config = {
  apiUrl: serverUrl,
  loginUrl: serverUrl + "/user/token/",
  userInfoUrl: serverUrl + "/user/me/",
  registerUrl: serverUrl + "/user/create/",
  categoryUrl: serverUrl + "/categories/",
  productUrl: serverUrl + "/products/",
  brandUrl: serverUrl + "/brands/",
  orderUrl: serverUrl + "/orders/",

  featuredUrl_: "featured=1",
  //testToken: import.meta.env.VITE_TEST_TOKEN,
  filterChoices: filterChoices,
  colorList: colorList,
}

if (!config.apiUrl) {
  alert("The .env file for Vite is not present or not complete.")
}

export default config
