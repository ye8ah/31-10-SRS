"use strict";

// СРС №7.1
// Мини-проект: каталог товаров средствами DOM.
// Новых тем в этой работе нет: используются массивы, объекты, методы массивов и DOM.
// Заполните участки TODO. Имена функций и объект window.domSrs не изменяйте.

const products = [
    { id: 1, name: "Ноутбук", price: 350000, category: "Техника", inStock: true },
    { id: 2, name: "Мышь", price: 7000, category: "Аксессуары", inStock: true },
    { id: 3, name: "Монитор", price: 120000, category: "Техника", inStock: false },
    { id: 4, name: "Клавиатура", price: 15000, category: "Аксессуары", inStock: true },
    { id: 5, name: "Наушники", price: 28000, category: "Аудио", inStock: true },
    { id: 6, name: "Микрофон", price: 45000, category: "Аудио", inStock: false },
];

// Создайте DOM-карточку одного товара.
// Требуемая структура:
// article.product-card
//   h3.product-card__title
//   p.product-card__category   -> "Категория: ..."
//   p.product-card__price      -> "Цена: ... ₸"
//   p.product-card__stock      -> "В наличии" / "Нет в наличии"
// Для отсутствующего товара добавьте карточке класс product-card--out.
function createProductCard(product) {
    const card = document.createElement("article");
    card.classList.add("product-card");
    if (!product.inStock) {
        card.classList.add("product-card--out");
    }

    const title = document.createElement("h3");
    title.classList.add("product-card__title");
    title.textContent = product.name;

    const category = document.createElement("p");
    category.classList.add("product-card__category");
    category.textContent = "Категория: " + product.category;

    const price = document.createElement("p");
    price.classList.add("product-card__price");
    price.textContent = "Цена: " + product.price + " ₸";

    const stock = document.createElement("p");
    stock.classList.add("product-card__stock");
    stock.textContent = product.inStock ? "В наличии" : "Нет в наличии";

    card.append(title, category, price, stock);
    return card;
}

// Верните объект статистики:
// { count, availableCount, totalPrice, mostExpensive }
// mostExpensive — исходный объект самого дорогого товара или null для пустого массива.
function calculateStats(items) {
    let availableCount = 0;
    let totalPrice = 0;
    let mostExpensive = null;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.inStock) {
            availableCount++;
        }
        totalPrice += item.price;
        if (mostExpensive === null || item.price > mostExpensive.price) {
            mostExpensive = item;
        }
    }

    return {
        count: items.length,
        availableCount: availableCount,
        totalPrice: totalPrice,
        mostExpensive: mostExpensive,
    };
}

// Верните объект вида { "Техника": 2, "Аксессуары": 2, ... }.
function countByCategory(items) {
    const result = {};
    for (let i = 0; i < items.length; i++) {
        const category = items[i].category;
        if (result[category] === undefined) {
            result[category] = 1;
        } else {
            result[category]++;
        }
    }
    return result;
}

// Главная функция мини-проекта.
// 1. Очистите #catalog и добавьте карточки всех товаров.
// 2. Заполните #product-count, #available-count, #total-price, #most-expensive.
// 3. Очистите #category-stats и добавьте по одному li для каждой категории
//    в формате "Категория: количество".
// 4. Верните количество отрисованных карточек.
function renderCatalog(items) {
    const catalog = document.querySelector("#catalog");
    catalog.replaceChildren();

    for (let i = 0; i < items.length; i++) {
        catalog.append(createProductCard(items[i]));
    }

    const stats = calculateStats(items);

    document.querySelector("#product-count").textContent = stats.count;
    document.querySelector("#available-count").textContent = stats.availableCount;
    document.querySelector("#total-price").textContent = stats.totalPrice + " ₸";
    document.querySelector("#most-expensive").textContent =
        stats.mostExpensive === null
            ? "—"
            : stats.mostExpensive.name + " — " + stats.mostExpensive.price + " ₸";

    const categoryStats = document.querySelector("#category-stats");
    categoryStats.replaceChildren();

    const byCategory = countByCategory(items);
    const entries = Object.entries(byCategory);
    for (let i = 0; i < entries.length; i++) {
        const li = document.createElement("li");
        li.textContent = entries[i][0] + ": " + entries[i][1];
        categoryStats.append(li);
    }

    return catalog.children.length;
}

window.domSrs = {
    products,
    createProductCard,
    calculateStats,
    countByCategory,
    renderCatalog,
};

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#catalog")) {
        renderCatalog(products);
    }
});