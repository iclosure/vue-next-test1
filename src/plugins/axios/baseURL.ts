let baseURL = "";

console.log("---", process.env.NODE_ENV);

switch (process.env.NODE_ENV) {
  case "development":
    baseURL = "http://10.211.55.5:2020/";
    break;
  case "production":
    baseURL = "http://localhost:2020/";
    break;
  default:
    break;
}

export default baseURL;
