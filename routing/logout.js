// 🏗 Stwórz funkcję 'logoutRouting', która obsłuży stronę wylogowania.
const logoutRouting = (method, response) => {
    // 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
    response.setHeader("Content-Type", "text/html");

    // Generowanie treści strony wylogowania
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Shop - Logout</title>
</head>
<body>
    <h1>Logout</h1>
    <nav>
        <a href="/">Home</a>
        <a href="/kill">Logout from application</a>
    </nav>
</body>
</html>
    `;

    // 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
    response.statusCode = 200;
    response.end(htmlContent);
};

// 🔧 Wyeksportuj funkcję 'logoutRouting', aby inne moduł mogły jej używać.
module.exports = { logoutRouting };