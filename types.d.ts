type Product = {
    "id": number,
    "attributes": {
        "name": string,
        "quantity": number,
        "createdAt": Date,
        "updatedAt": Date,
        "publishedAt": Date,
        "featured": boolean,
        "price": number,
        "sale": number,
        "description": number,
        "images": any,
        "sizes": {data: Size[]}
    }
}

type Size = {
    "id": number,
    "attributes": {
        "name": string,
    }
}

type Color = {
    "id": number,
    "attributes": {
        "name": string,
        "hex": string,
    }
}
