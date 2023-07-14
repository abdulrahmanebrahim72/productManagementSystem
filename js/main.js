// get total
// create product
// sava in localstorage
// clear inputs
// read OR dispaly
// count --> number of products
// delete product
// delete all products
// update
// search
// check data
// علامه + اذا كتبت بجانب اي نص تحوله الي رقم



let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');


let mainBtn = 'Create';
let main_I;


let Alert = document.querySelector(".alert");
function validateProductTitle()
{
    var rejex = /^[A-Z][a-z]{3,15}$/;
    if(rejex.test(title.value) == true)
    {
        Alert.style.display = "none";
        title.classList.add("valid")
        title.classList.remove("in-valid")
        return true;
    }
    else
    {
        Alert.style.display = "flex";
        title.classList.add("in-valid")
        title.classList.remove("valid")
        return false;
    }
}

title.addEventListener("keyup" , validateProductTitle);




// get total
function getTotal()
{
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;

        total.innerHTML = result;
        total.style.backgroundColor = 'darkgreen';
    }
    else
    {
        total.innerHTML = '';
        total.style.backgroundColor = '#a50000';
    }
}




// create product - AND - sava in localstorage
let allProducts;

if (localStorage.products == null) {
    allProducts = [];
}
else {
    allProducts = JSON.parse(localStorage.products);
}




create.onclick = function () {
    let newProduct =
    {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    let counter = +count.value;

    if (validateProductTitle() == true && title.value != '' && price.value != '' && count.value <= 100) {
        if (mainBtn == 'Create') {
            if (counter > 1) {
                for (let i = 0; i < counter; i++) {
                    allProducts.push(newProduct);
                }
            }
            else {
                allProducts.push(newProduct);
            }
        }
        else {
            allProducts[main_I] = newProduct;
            mainBtn = 'Create';
            create.innerHTML = 'Create';
            count.style.display = 'block';
        }

        clearInputs();
        title.classList.remove("valid")
    }

    localStorage.setItem("products", JSON.stringify(allProducts));

    dispalyProducts();
}





// clear inputs

function clearInputs()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// read OR dispaly

function dispalyProducts()
{
    let box = ``;

    for(let i=0;i<allProducts.length;i++)
    {
        box +=
            `
        <tr>
            <td>${i+1}</td>
            <td>${allProducts[i].title}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].taxes}</td>
            <td>${allProducts[i].ads}</td>
            <td>${allProducts[i].discount}</td>
            <th>${allProducts[i].total}</th>
            <td>${allProducts[i].category}</td>
            <td> <button onclick="updateProduct(${i})" id="update">update</button> </td>
            <td> <button onclick="deleteProduct(${i})" id="delete">delete</button> </td>
        </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = box;

    // delete alll products
    let btnDeleteAll = document.getElementById('deleteAll');
    if(allProducts.length > 0)
    {
        btnDeleteAll.innerHTML = 
        `
        <button class="deleteAll" onclick="deleteAll()" >delete all (${allProducts.length})</button>
        `;
    }
    else
    {
        btnDeleteAll.innerHTML = ``;
    }

    getTotal();
}
dispalyProducts();



// delete product

function deleteProduct(index)
{
    allProducts.splice(index,1);
    localStorage.setItem("products", JSON.stringify(allProducts));
    dispalyProducts();
}



// delete all products

function deleteAll()
{
    allProducts.splice(0);  // to remove all element in array
    localStorage.clear();
    dispalyProducts();
}



// update product
function updateProduct(index)
{
    title.value = allProducts[index].title;
    price.value = allProducts[index].price;
    taxes.value = allProducts[index].taxes;
    ads.value = allProducts[index].ads;
    discount.value = allProducts[index].discount;
    getTotal();
    count.style.display = 'none';
    category.value = allProducts[index].category;
    mainBtn = 'updata';
    create.innerHTML = 'updata';

    main_I = index;

    scroll({
        top:0,
        behavior:"smooth"
    });
}



// 1-Search
// 2-Search by title    or   Search by category

let mainSearch = 'title';
let search = document.getElementById('search');

function searchProduct(id)
{
   if(id == "searchTitle")
   {
    mainSearch = 'title';
   }
   else
   {
    mainSearch = 'category';
   }

   search.placeholder = `Search by ${mainSearch}`;
   
   search.focus();
   search.value = '';
   dispalyProducts();
}



function searchData(key) {
    let box = ``;

    for (let i = 0; i < allProducts.length; i++) {
        if (mainSearch == "title") {
            if (allProducts[i].title.toLowerCase().includes(key.toLowerCase())) {
                box +=
                    `
            <tr>
            <td>${i + 1}</td>
            <td>${allProducts[i].title}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].taxes}</td>
            <td>${allProducts[i].ads}</td>
            <td>${allProducts[i].discount}</td>
            <th>${allProducts[i].total}</th>
            <td>${allProducts[i].category}</td>
            <td> <button onclick="updateProduct(${i})" id="update">update</button> </td>
            <td> <button onclick="deleteProduct(${i})" id="delete">delete</button> </td>
            </tr>
            `;
            }

        }
        else {
            if (allProducts[i].category.toLowerCase().includes(key.toLowerCase())) {
                box +=
                    `
            <tr>
            <td>${i + 1}</td>
            <td>${allProducts[i].title}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].taxes}</td>
            <td>${allProducts[i].ads}</td>
            <td>${allProducts[i].discount}</td>
            <th>${allProducts[i].total}</th>
            <td>${allProducts[i].category}</td>
            <td> <button onclick="updateProduct(${i})" id="update">update</button> </td>
            <td> <button onclick="deleteProduct(${i})" id="delete">delete</button> </td>
            </tr>
            `;
            }
        }
    }

    document.getElementById('tbody').innerHTML = box;
}

