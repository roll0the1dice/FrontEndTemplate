import { Configuration, SaTokenInfo, UsersControllerApi } from "../openapi";

function getCongiguration() {
  const _saTokenInfo: SaTokenInfo = JSON.parse(
    localStorage.getItem("saTokenInfo") as string
  );
  var header: any = {};

  if (_saTokenInfo != undefined) {
    const { tokenName, tokenValue } = _saTokenInfo;

    if (tokenName != undefined && tokenName != "") {
      header[tokenName] = tokenValue;
      header["Authorization"] = tokenValue;
    }
  }

  const configuration = new Configuration({
    basePath: "http://localhost:5173/api",
    baseOptions: {
      headers: {
        ...header
      }
    },
  });
  return configuration;
}

// const usersControllerApi = () => {
//   const configuration = getCongiguration();

//   return new UsersControllerApi(configuration);
// };
const configuration = getCongiguration();

const usersControllerApi = new UsersControllerApi(configuration);

export { usersControllerApi };
