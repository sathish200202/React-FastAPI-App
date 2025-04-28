import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-5 mt-10">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">ShopEasy</h2>
          <p className="text-sm">
            Your one-stop shop for all your needs. We deliver happiness at your
            doorstep.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">Cart</li>
            <li className="hover:text-white cursor-pointer">Profile</li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} ShopEasy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
