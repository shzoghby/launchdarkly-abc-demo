import './App.css';
import { productList } from './config';

interface ProductsProps {
    newLogo?: any;
}

function Products({ newLogo }: ProductsProps) {
    return (

        <div className="product-container">
            <div className="product-list">
                <p className='productText'>Product Catalog</p>
                <ul>
                    {productList.map((product) => (
                        <li key={product.id} style={{ marginBottom: '10px', listStyle: 'none' }}>
                            <strong>{product.name}</strong> - ${product.price}
                            <br />
                            <small>Category: {product.category}</small>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Products;