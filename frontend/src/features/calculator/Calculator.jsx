import { useState, useMemo } from "react"

const Calculator = ({ benefits, lineItems, getTotal }) => {
  const total = useMemo(() => getTotal?.() ?? 0, [getTotal])
  const hasModa = !!benefits.moda
  console.log('Moda:', hasModa)

  const estimated = useMemo(() => {
    return lineItems.reduce((sum, item) => {
      const fee = Number(item.fee) || 0
      const writeOff = Number(item.write_off) || 0
      const isCovered = !!item.covered
      // const hasModa = !!benefits.moda
      console.log('write off:', writeOff)
      

      let adj = fee
      

      switch (item.code) {
        // Anesthesia
        case "009220": {
          console.log('Adj:', adj)
          const coverage = Number(benefits.anesthesia) || 0
          console.log('coverage', coverage)
          if (hasModa) adj = adj - writeOff
          console.log('Adj after writeoff:', adj)

          if (coverage > 0) {
            const pct = coverage / 100
            console.log('%:', pct)
            adj = fee * pct
          } else {
            adj = fee
          }
          // console.log('Adj:', adj)
        }
      }

      return sum + adj
    }, 0)
  }, [lineItems])

  return (
    <div>Calculator</div>
  )
}

export default Calculator