import React, { useRef, useState } from "react"
import "./Details.css"
import { motion } from "framer-motion"
import Thankyou from "./Thankyou"

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}

const inputVariants = {
  focus: {
    scale: 1.1
  }
}

export default function Details({
  setCardNumber,
  setCardName,
  setMonth,
  setYear,
  setCvc
}) {
  const [thankyou, showThankyou] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [numberError, setNumberError] = useState(false)
  const [monthError, setMonthError] = useState(false)
  const [yearError, setYearError] = useState(false)
  const [cvcError, setCvcError] = useState(false)
  const [displayError, setDisplayError] = useState(false)
  const nameRef = useRef()
  const numberRef = useRef()
  const monthRef = useRef()
  const yearRef = useRef()
  const cvcRef = useRef()
  const confirmMessage = (e) => {
    e.preventDefault()
    if (nameRef.current.value == "") {
      setNameError(true)
    }
    if (numberRef.current.value == "") {
      setNumberError(true)
    }
    if (monthRef.current.value == "") {
      setMonthError(true)
    }
    if (yearRef.current.value == "") {
      setYearError(true)
    }
    if (cvcRef.current.value == "") {
      setCvcError(true)
    } else {
      showThankyou(true)
      setShowModal(true)
      setNameError(false)
      setNumberError(false)
      setMonthError(false)
      setYearError(false)
      setCvcError(false)
    }
  }

  return (
    <div>
      <div className="Details">
        <form onSubmit={confirmMessage}>
          <p>CardHolder Name</p>
          <input
            maxLength={18}
            placeholder="e.g. Jane Applessed"
            type="text"
            ref={nameRef}
            className={nameError ? "error" : "normal"}
            onChange={(e) => setCardName(e.target.value)}
          />
          {nameError && <p id="error-text">Please enter your details</p>}

          <p>Card number</p>
          <input
            maxLength={19}
            placeholder="e.g. 1234 5678 9123 0000"
            type="number"
            ref={numberRef}
            className={numberError ? "error" : "normal"}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          {numberError && <p id="error-text">Please enter your details</p>}

          <div className="cvc-date">
            <div className="date-inputs">
              <p>exp.date (MM/YY) </p>
              <input
                maxLength="2"
                placeholder="MM"
                className={monthError ? "error" : "normal"}
                type="number"
                ref={monthRef}
                onChange={(e) => {
                  const { value, maxLength } = e.target
                  //make sure month value doesn't go beyond your specified maxLength
                  const month = value.slice(0, maxLength)
                  setMonth(month)
                }}
              />

              <input
                maxLength={2}
                placeholder="YY"
                id="year"
                className={yearError ? "error" : "normal"}
                type="number"
                ref={yearRef}
                onChange={(e) => {
                  const { value, maxLength } = e.target
                  //make sure year value doesn't go beyond your specify maxLength
                  const year = value.slice(0, maxLength)
                  setYear(e.target.value)
                }}
              />
            </div>

            <div className="cvc">
              <p>cvc</p>
              <input
                maxLength={3}
                placeholder="e.g. 123"
                type="number"
                ref={cvcRef}
                className={cvcError ? "error" : "normal"}
                onChange={(e) => {
                  const { value, maxLength } = e.target
                  const cvv = value.slice(0, maxLength)
                  setCvc(cvv)
                }}
              />
            </div>
          </div>

          <div className="btn">
            <button>Confirm</button>
          </div>
        </form>
      </div>

      {showModal && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          className="backdrop"
        >
          {thankyou && <Thankyou setShowModal={setShowModal} />}
        </motion.div>
      )}
    </div>
  )
}
