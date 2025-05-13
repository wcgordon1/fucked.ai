import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-navy text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="text-3xl font-bold font-serif mb-2">F.AI</div>
            <p className="text-gray-400 max-w-md">
              Documenting AI's most spectacular failures since humans decided to 
              trust machines with important decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-yellow transition">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-yellow transition">About</Link></li>
                <li><a href="https://x.com/helloIamWilly" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow transition">Buy this Domain Name</a></li>
                <li><Link to="/" className="text-gray-400 hover:text-yellow transition">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-gray-400 hover:text-yellow transition">Hallucinations</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-yellow transition">Translations</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-yellow transition">Algorithms</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-yellow transition">Images</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow transition">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow transition">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow transition">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Fucked.ai - No AI was harmed in the making of this website
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-sm">
              A satirical project | Not affiliated with any AI company
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
