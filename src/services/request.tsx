import { Configuration, UsersControllerApi } from "../openapi";

const configuration = new Configuration({
  basePath: "http://localhost:5173/api",
});

const usersControllerApi = new UsersControllerApi(configuration);

export { usersControllerApi };
