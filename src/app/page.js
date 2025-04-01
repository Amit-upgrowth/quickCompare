// pages/index.js
"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import appStore from "../assets/images/appstore.png";
import playStore from "../assets/images/playstore.png";
import searchIcon from "../assets/images/search.svg";
import shareIcon from "../assets/images/share.svg";
import downArrow from "../assets/images/downArrow.svg";
import whatsApp from "../assets/images/whatsapp.svg";
import quickLogo from "../assets/images/quickLogo.png";
import { fetchHomeData } from '../services/apiService';
import { useCallback } from "react";

export default function Home() {
  const [data, setData] = useState({
    eta: [],
    trendingItems: [],
    meta: {}
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this app!",
        text: "I found this awesome app. Check it out!",
        url: window.location.href, // Dynamically shares the current page URL
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Your browser does not support the Web Share API.");
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiData = await fetchHomeData();
        setData(apiData);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 w-[60%] m-auto bg-white">
      <Head>
        <title>Quick Commerce</title>
        <meta name="description" content="Quick commerce platform" />
      </Head>

      <main className="container mx-auto px-4 py-6">
        {/* Delivery Address */}
        <div className="mb-6">
          <div className='flex'>
          <h2 className="text-sm font-medium text-gray-500">Delivering to</h2>
          <Image className='w-[18px]' src={downArrow}/>

          </div>
          <p className="text-lg font-semibold">H83R+72W, Plot No 308</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
  <input
    type="text"
    placeholder="Search to compare prices, availability"
    className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Image 
      src={searchIcon} 
      alt="Search icon"
      width={20}
      height={20}
      className="text-gray-400"
    />
  </div>
</div>

        {/* Delivery Options */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 mb-2">Delivering in</h2>
  
        </div>

        {/* Service Icons */}
        <div className="mb-8 grid grid-cols-7 gap-8 cursor-pointer">
          {data.eta.map((service, index) => (
            <a href={service.url}>
            <div key={index} className="flex flex-col items-center bg-blue-50 gap-[6px] rounded-[8px] shadow-lg">
              <span className="text-sm font-medium">{service.eta || 'N/A'}</span>
              <div className="flex items-center justify-center">
                <img 
                  src={service.image} 
                  alt={service.platform} 
                  className="w-full object-contain"
                />
              </div>
            </div>
            </a>
          ))}
        </div>

        {/* Trending Items */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Trending Items</h2>
          <div className="grid grid-cols-7 gap-8">
            {data.trendingItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                  />
                </div>
                <span className="text-xs text-center">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* App Download Banner */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
  {/* Download App Section */}
  <div className="mb-8">
    <h3 className="text-[18px] font-medium mb-4 text-gray-700">For better experience, Download the app now</h3>
    <div className="flex justify-center gap-4">
      <a href="https://apple.co/40RjcWh"><Image 
        src={appStore} 
        alt="Download on the App Store" 
        width={120}
        height={40}
        className="cursor-pointer hover:opacity-90 transition-opacity"
      /></a>
      
      <a href="https://play.google.com/store/apps/details?id=com.quickcompare.app&hl=en"><Image 
        src={playStore} 
        alt="Download on the App Store" 
        width={120}
        height={40}
        className="cursor-pointer hover:opacity-90 transition-opacity"
      /></a>
    </div>
  </div>

  {/* Footer Section */}
  <div className="flex flex-col items-center gap-4 pt-4 border-t border-blue-100">
    <Image 
      src={quickLogo} 
      alt="Quick Compare Logo" 
      width={120}
      height={40}
      className="opacity-90"
    />
    
    <p className="text-[16px] font-medium text-gray-700">© 2025 Quick Compare App. All rights reserved.</p>
    
    <button 
      onClick={handleShare} 
      className="flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
    >
      <Image 
        src={shareIcon} 
        alt="Share icon" 
        className='w-[20px]'
      />
      <span className="text-[20px] font-medium text-[#017D70]">Share App</span>
    </button>
  </div>
</div>
<div className="fixed bottom-4 right-4">
  <Image 
    className="bg-[#017D70] p-[15px] rounded-[50%]" 
    src={whatsApp} 
    alt="WhatsApp Icon"
    width={70} 
    height={70} 
  />
</div>

      </main>

      <style jsx global>{`
        body {
          background-color: #f9fafb;
        }
      `}</style>
    </div>
  );
}