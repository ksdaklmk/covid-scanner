import { useMemo, useState, useEffect, useCallback } from 'react'
import { decodeJWT } from './utils/jwt'
const MOCK = {
  color: 'red',
  label: 'เสี่ยงมาก'
}
const BG_COLOR = {
  red: '#F03636',
  green: '#2FC20B',
  orange: '#E37D04',
  yellow: '#F0DC26'
}
const FONT_COLOR = {
  red: '#470505',
  green: '#124804',
  orange: '#484105',
  yellow: '#4B2901'
}

const Item = ({ label, value }) => (
  <div className="mr-10">
    <div className="font-light text-sm" style={{ color: '#A6A6A6' }}>
      {label}
    </div>
    <div className="font-semibold">{value}</div>
  </div>
)
const ListItem = ({ label, icon, secondLine }) => (
  <div className="flex">
    <div className="w-12 mr-6">icon</div>
    <div>
      <div className="font-semibold">{label}</div>
      <div className="font-light text-sm" style={{ color: '#A6A6A6' }}>
        {secondLine}
      </div>
    </div>
  </div>
)

export const Result = ({ result, onRescan }) => {
  const [closing, setClosing] = useState(false)

  const decoded = useMemo(() => {
    if (result) return decodeJWT(result)
    return null
  }, [result])
  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      onRescan()
      setClosing(false)
    }, 200)
  }, [setClosing, onRescan])
  console.log('decoded -> decoded', decoded)
  if (!decoded) return null
  return (
    <div
      className={`animated ${
        closing ? 'fadeOutDownBig' : 'fadeInUpBig'
      } fixed w-full h-full left-0 top-0 z-10 overflow-auto`}
      style={{
        animationDuration: '200ms',
        backgroundColor: '#303342',
        boxShadow: '0px 0px 5px rgba(0,0,0,0.3)'
      }}
    >
      <div className="container py-4">
        {/* {result.toString()} */}
        <div className="font-light text-lg px-6" style={{ color: '#A6A6A6' }}>
          ระดับเสี่ยง
        </div>
        <div
          className="text-3xl px-16 rounded-lg py-2 text-center inline-block mb-6 mt-3 mx-4"
          style={{ backgroundColor: BG_COLOR[MOCK.color] }}
        >
          <span
            style={{ color: FONT_COLOR[MOCK.color] }}
            className="font-semibold"
          >
            {MOCK.label}
          </span>
        </div>
        <hr />
        <div className="flex py-10 mx-6">
          <Item label="อายุ" value={21} />
          <Item label="เพศ" value="หญิง" />
          <Item label="สร้างเมื่อ" value="12 ก.พ. 2563" />
        </div>
        <div className="flex py-10 mx-6">
          <ListItem label="มีประวัติเดินทาง" secondLine="ในประเทศกลุ่มเสี่ยง" />
        </div>
        <div>
          <button onClick={handleClose}>สแกนใหม่</button>
        </div>
      </div>
    </div>
  )
}
