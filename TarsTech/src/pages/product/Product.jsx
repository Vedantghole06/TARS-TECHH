import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TarsRobot from '../../components/tarsrobot/TarsRobot';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://tars-tech-backend.vercel.app/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-8 gap-8">
        <div className="lg:w-1/2 space-y-6">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold">Product</h1>
          </div>
          <p className="text-md leading-relaxed">
            TARS Technologies consists of highly skilled enthusiasts who dream of making the world an intelligent and fulfilled place by empowering organizations to gain a competitive edge. Loaded with information technology tools, techniques, and a skilled workforce, we provide customized solutions for all your business processes. Our proficiency lies in developing revolutionary web services for you to meet the challenges of tomorrow&apos;s information age. TARS Tech derives its stronghold in providing IT training and development with services. We want to provide simple IT solutions to clients. We understand the client&apos;s requirements, analyse it and provide the best IT solutions.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img
            src="/caseimg1.svg"
            alt="Two people wearing VR headsets working with a yellow robotic arm"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-8">Our Product&apos;s</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`} // Dynamic route to product detail page
              className="bg-white rounded-lg p-4 relative group cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-1 aspect-h-1 mb-4">
                <img
                  src={`${product.image}`}
                  alt={product.name}
                  className="w-full h-72 object-cover object-center rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-medium text-gray-900">{product.name || 'Product Name'}</h2>
                {/* <p className="text-sm text-gray-500 line-clamp-3">{product.description}</p> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <hr className="w-1/2 border-black mx-auto h-2" />

      <TarsRobot />
    </>
  );
};

export default ProductPage;
