export interface Product {
	id: number;
	name: string;
	price: number;
	images: string[];
	description: string;
	category: string;
}

export const categories = ['Audio', 'Wearables', 'Fotografía', 'Computación', 'Gaming'];

const products: Product[] = [
	{
		id: 1,
		name: 'Auriculares Bluetooth',
		price: 59.99,
		images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&h=700&fit=crop'],
		description: 'Auriculares inalámbricos con cancelación de ruido para disfrutar un audio claro durante todo el día.',
		category: 'Audio',
	},
	{
		id: 2,
		name: 'Reloj Inteligente',
		price: 129.99,
		images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=700&fit=crop'],
		description: 'Smartwatch con monitor de salud, GPS y notificaciones para acompañar tu ritmo diario.',
		category: 'Wearables',
	},
	{
		id: 3,
		name: 'Cámara Fotográfica',
		price: 899.99,
		images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&h=700&fit=crop'],
		description: 'Cámara digital de alta resolución para capturar tus momentos con gran nivel de detalle.',
		category: 'Fotografía',
	},
	{
		id: 4,
		name: 'Altavoz Portátil',
		price: 45.99,
		images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900&h=700&fit=crop'],
		description: 'Altavoz resistente al agua con gran sonido y autonomía para llevar tu música a cualquier lugar.',
		category: 'Audio',
	},
	{
		id: 5,
		name: 'Tablet 10 pulgadas',
		price: 349.99,
		images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&h=700&fit=crop'],
		description: 'Tablet con pantalla Full HD y gran rendimiento para trabajar, estudiar y entretenerte.',
		category: 'Computación',
	},
	{
		id: 6,
		name: 'Teclado Mecánico',
		price: 79.99,
		images: ['https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=900&h=700&fit=crop'],
		description: 'Teclado mecánico RGB con respuesta precisa para gaming y largas sesiones de trabajo.',
		category: 'Gaming',
	},
];

export const getProducts = (): Product[] => products;

export const getProductById = (id: number): Product | undefined =>
	products.find((product) => product.id === id);

export const getRelatedProducts = (product: Product): Product[] => {
	const related = products.filter(
		(candidate) => candidate.id !== product.id && candidate.category === product.category,
	);

	return related.length ? related : getSuggestedProducts(product.id);
};

export const getSuggestedProducts = (productId?: number): Product[] => {
	const available = products.filter((product) => product.id !== productId);
	return [...available].sort(() => Math.random() - 0.5).slice(0, 3);
};
