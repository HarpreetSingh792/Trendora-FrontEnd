import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'

const numbers = "1234567890"
const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const sym = "~!@#$%^&(){}?<>/*-+"

const Coupon = () => {
    const [generate, isGnerate] = useState(false);
    const [numb, includeNumb] = useState(false);
    const [ch, includeChar] = useState(false);
    const [symb, includeSymb] = useState(false);
    const [valText, setValText] = useState("");
    const [valNum, setValNum] = useState(0);
    const [coupon, setCoupon] = useState("");
    const [copyToClip, setCopyToClip] = useState(false);

    useEffect(() => {
        if (generate) {

            const str = () => {
                let loopLength = valText != " " ? valNum - valText.length + 1 : valNum;
                let str = '';
                let res = '';
                if (numb) str += numbers;
                if (ch) str += character;
                if (symb) str += sym;
                for (let i = 0; i < loopLength; i++) {
                    let random = Math.floor(Math.random() * str.length);
                    res += str.charAt(random)
                }
                return `${valText}${res}`;
            }
            setCoupon(str);
        }
        return () => {
            isGnerate(false);
        }
    }, [generate, numb, ch, symb])


    const generateHandler = () => {
        if (valNum === 0) {
            alert("Please enter coupon length");
        }
        else if (!numb && !ch && !symb) {
            alert("Please Select One");
        }
        else {
            isGnerate(prev => !prev);
        }

        setCopyToClip(false)

    }
    const copyHandler = async () => {
        await window.navigator.clipboard.writeText(coupon);
        setCopyToClip(true)
    }
    return (
        <Layout>
            <div className='md:p-4 relative grid gap-8'>

                <h1 className='min-[320px]:p-4 md:p-0 text-4xl font-semibold tracking-wider'>Coupon</h1>
                <div className='p-4 w-11/12 h-96 m-auto grid place-content-center place-items-start gap-4'>
                    <section className='flex justify-between min-[320px]:w-72 md:w-96'>
                        <input className='border-2 w-72 rounded-sm px-2' type="text" maxLength={8} placeholder='Text to include' value={valText} onChange={(e) => setValText(e.target.value)} />
                        <input className='border-2 w-20 rounded-sm px-2' type="number" min={8} max={16} value={valNum} onChange={(e) => setValNum(e.target.value)} />
                    </section>
                    <fieldset className='border-2  pl-4 min-[320px]:w-72 md:w-96 rounded-sm'>
                        <legend>Include</legend>
                        <section>
                            <input id="num" type="checkbox" checked={numb} onChange={(e) => includeNumb(prev => !prev)} />
                            <label className='pl-4' htmlFor='num'>Numbers</label>
                        </section>
                        <section>
                            <input id="char" type="checkbox" checked={ch} onChange={(e) => includeChar(prev => !prev)} />
                            <label className='pl-4' htmlFor='char'>Characters</label>
                        </section>
                        <section>
                            <input id='symb' type="checkbox" checked={symb} onChange={(e) => includeSymb(prev => !prev)} />
                            <label className='pl-4' htmlFor='symb'>Symbols</label>
                        </section>
                    </fieldset>
                    <button className=" m-auto transition-all  border-2 border-blue-500 rounded-sm py-2 px-4 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white" onClick={generateHandler}>Generate</button>
                    {
                        coupon && <code className='m-auto text-2xl tracking-widest grid text-gray-400 place-content-center place-items-center'> {coupon} <span className={`${copyToClip?"text-white bg-black cursor-copy":"text-black border-black hover:text-white hover:bg-black"} tracking-normal cursor-pointer border-2  px-4 mt-2 text-lg rounded-sm  transition-all`} onClick={copyHandler}>{copyToClip ? "Copied" : "Copy"}</span></code>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Coupon