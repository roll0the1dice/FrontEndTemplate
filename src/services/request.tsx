import { Configuration, ChartControllerApi, BiUserControllerApi } from "../openapi";

const configuration = new Configuration({
  basePath: "http://localhost:5173/api",
});

const chartControllerApi = new ChartControllerApi(configuration);

const biUserControllerApi = new BiUserControllerApi(configuration);

export { chartControllerApi, biUserControllerApi };
