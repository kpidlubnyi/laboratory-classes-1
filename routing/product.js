// 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.
const fs = require('fs');
const { STATUS_CODE } = require('../constants/statusCode');

// 🏗 Stwórz funkcję 'productRouting', która obsłuży żądania dotyczące produktów.
const productRouting = (method, url, request, response) => {
    // 🏗 Stwórz funkcję 'renderAddProductPage', która wyrenderuje stronę dodawania produktu.
    const renderAddProductPage = () => {
        response.setHeader("Content-Type", "text/html");
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Shop - Add product</title>
</head>
<body>
    <h1>Add product</h1>
    <form method="POST" action="/product/add">
        <input type="text" name="name" placeholder="Product Name" required>
        <textarea name="description" placeholder="Product Description" required></textarea>
        <button type="submit">Add Product</button>
    </form>
    <nav>
        <a href="/">Home</a>
        <a href="/product/new">Newest product</a>
        <a href="/logout">Logout</a>
    </nav>
</body>
</html>
        `;
        response.statusCode = 200;
        response.end(htmlContent);
    };

    // 🏗 Stwórz funkcję 'renderNewProductPage', która wyświetli najnowszy produkt z pliku 'product.txt'.
    const renderNewProductPage = () => {
        response.setHeader("Content-Type", "text/html");
        
        fs.readFile('product.txt', 'utf8', (err, data) => {
            let productContent = 'Brak nowych produktów';
            
            if (!err && data) {
                const product = JSON.parse(data);
                productContent = `
                    <h2>Newest Product</h2>
                    <p>Name: ${product.name}</p>
                    <p>Description: ${product.description}
                `;
            }

            const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Shop - Newest product</title>
</head>
<body>
    <h1>Newest product</h1>
    ${productContent}
    <nav>
        <a href="/">Home</a>
        <a href="/product/add">Add product</a>
        <a href="/logout">Logout</a>
    </nav>
</body>
</html>
            `;
            response.statusCode = 200;
            response.end(htmlContent);
        });
    };

    // 🏗 Stwórz funkcję 'addNewProduct', która obsłuży dodawanie nowego produktu, zapisywanie go do pliku 'product.txt' oraz przeniesie użytkownika na stronę '/product/new'.
    const addNewProduct = (request, response) => {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        
        request.on('end', () => {
            const productData = Object.fromEntries(new URLSearchParams(body));
            
            // Zapisz dane do pliku
            fs.writeFile('product.txt', JSON.stringify(productData), (err) => {
                if (err) {
                    response.statusCode = 500;
                    return response.end('Error saving product');
                }
                
                // 🏗 Przenieś użytkownika na stronę '/product/new'
                response.setHeader("Location", "/product/new");
                response.statusCode = STATUS_CODE.FOUND;
                response.end();
            });
        });
    };

    // Routing dla różnych ścieżek produktów
    if (url === '/product/add' && method === 'GET') {
        renderAddProductPage();
    } else if (url === '/product/add' && method === 'POST') {
        addNewProduct(request, response);
    } else if (url === '/product/new') {
        renderNewProductPage();
    } else {
        console.warn(`ERROR: requested url ${url} doesn't exist.`);
    }
};

// 🔧 Wyeksportuj funkcję 'productRouting', aby inne moduł mogły jej używać.
module.exports = { productRouting };