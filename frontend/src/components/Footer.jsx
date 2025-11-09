import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: TbBrandMeta, url: "https://www.facebook.com", label: "Facebook" },
  { icon: IoLogoInstagram, url: "https://www.instagram.com", label: "Instagram" },
  { icon: RiTwitterXLine, url: "https://www.twitter.com", label: "Twitter" },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border border-gray-700/40 bg-gray-800/30 rounded-2xl p-10 backdrop-blur-md shadow-lg">
        
        {/* Newsletter */}
        <div>
          <h3 className="uppercase font-semibold tracking-widest mb-4 text-sm text-indigo-400">
            Stay Connected
          </h3>
          <p className="text-gray-400 mb-6 text-sm">
            Subscribe for the latest articles, tips & resources.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-l-lg px-4 py-2 w-full text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="rounded-r-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row md:pl-6 gap-10">
          <div>
            <h3 className="uppercase font-semibold tracking-widest mb-4 text-sm text-indigo-400">
              About
            </h3>
            <ul className="space-y-2 text-sm">
              {["Our Story", "Authors", "Blog Policy", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="uppercase font-semibold tracking-widest mb-4 text-sm text-indigo-400">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              {["Help Center", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="uppercase font-semibold tracking-widest mb-4 text-sm text-indigo-400">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, url, label }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 bg-gray-700 hover:bg-indigo-600 rounded-full text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-indigo-400">Gym Zone</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;