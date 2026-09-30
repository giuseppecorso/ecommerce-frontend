export interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    username: string;
    dateOrder: string;
    status: string;
    items: OrderItem[];
}