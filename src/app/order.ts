export interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    imageUrl?: string;
}

export interface Order {
    id: number;
    username: string;
    dateOrder: string;
    status: string;
    items: OrderItem[];
}