import img from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Search, MessageCircle, ChevronDown, Check } from 'lucide-react'
import { Subtitle } from '@storybook/blocks'

const texts = {
  EN: {
    title: "A quality app no matter what your idea is about.",
    description: "No matter the size of your business, you will be able to benefit for any kinds of idea.",
    subtitle: "The Easiest Way",
    description2: " We help you create and manage all successful use content can make your project come true.",
    depoiment: "Everything you need - all in one theme.",
    personName: "John Doe",
  }
}

export function Section() {
  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://amava.websitelayout.net/img/content/content-19.svg"
            alt="Isometric Illustration"
            // width={600}
            // height={400}
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {texts.EN.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {texts.EN.description}
          </p>
          <div className="mb-6">
            <div className="flex items-start mb-2">
              <Check className="w-5 h-5 text-green-500 mr-2 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">{texts.EN.subtitle}</h3>
                <p className="text-gray-600">
                  {texts.EN.description2}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center">
              <img
                src="https://amava.websitelayout.net/img/avatar/avatar-03.jpg"
                alt="John Doe"
                // width={50}
                // height={50}
                className="rounded-full mr-4"
              />
              <div>
                <p className="text-gray-800 font-medium">{`"${texts.EN.depoiment}"`}</p>
                <p className="text-gray-600">- {`${texts.EN.personName}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg">
          <ShoppingCart className="w-6 h-6" />
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </>
  )
}