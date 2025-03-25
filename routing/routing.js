// 📦 Zaimportuj moduł odpowiedzialne za routing poszczególnych części aplikacji.
const { homeRouting } = require('./home');
const { productRouting } = require('./product');
const { logoutRouting } = require('./logout');
// 📦 Zaimportuj obiekt STATUS_CODE.
const { STATUS_CODE } = require('../constants/statusCode');

// 🏗 Stwórz tutaj funkcję 'requestRouting', która będzie obsługiwać zapytania HTTP.
const requestRouting = (request, response) => {
    const { method, url } = request;
    const date = new Date().toISOString();

    // 🏗 Tutaj stwórz logowanie do konsoli informacji, mówiące o typie logowania (INFO), dacie, metodzie oraz url żądania.
    console.log(`INFO [${date}]: ${method} - ${url}`);

    // 🏗 Tutaj stwórz podstawowy 'request routing' dla ścieżek '/', zawierającej /product' oraz '/logout'. Przekaż `request` i `routing` do odpowiednio routingu.
    if (url === '/') {
        homeRouting(method, response);
    } else if (url.startsWith('/product')) {
        productRouting(method, url, request, response);
    } else if (url === '/logout') {
        logoutRouting(method, response);
    }

    // 🏗 Obsłuż specjalny przypadek, jeśli użytkownik zostanie przekierowany na ścieżkę /kill, aplikacja się zamknie.
    else if (url === '/kill') {
        console.log(`PROCESS [${date}]: logout. Application will be closed`);
        process.exit(0);
    }
    
    // 🏗 Tutaj stwórz obsługę przypadku, jeśli żądany URL nie istnieje. Zwróć wtedy błąd 404.
    else {
        console.log(`ERROR [${date}]: requested url ${url} doesn't exist`);
        response.statusCode = STATUS_CODE.NOT_FOUND;
        response.setHeader("Content-Type", "text/html");
        response.end(`<h1>404 Not Found</h1><p>The requested URL ${url} was not found on this server.</p>`);
    }
};

// 🔧 Wyeksportuj funkcję 'requestRouting', aby inne moduł mogły jej używać.
module.exports = { requestRouting };