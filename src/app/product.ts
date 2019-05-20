export class Product {
    Id: number;
    Name: string;
    Description: string;
    Price: number;

    constructor(id: number, name: string, description: string, price: number){
        this.Id = id;
        this.Name = name;
        this.Description = description;
        this.Price = price;
    }
}
