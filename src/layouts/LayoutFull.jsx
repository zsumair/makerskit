import { Link } from "gatsby"
import React from "react"
import { Footer, SignupForm } from "../components"

export const LayoutFull = ({ children }) => {
  return (
    <>
      <header className="bg-white py-6">
        <div className="container text-center">
          <Link to="/" className="inline-block">
            <h2 className="text-3xl uppercase text-indigo-500">
              <span className="text-4xl">M</span>
              <span className="font-sans text-2xl">akerskit</span>
            </h2>
          </Link>
        </div>
      </header>
      {children}
      <div className="bg-white py-8 lg:py-16 mt-8">
        <div className="container">
          <SignupForm />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}
