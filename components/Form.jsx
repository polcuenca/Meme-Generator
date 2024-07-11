import { useState, useEffect } from "react"
export default function Form(){

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    })

    const [allMemes, setAllMemes] = useState([])
    
    useEffect(() =>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    console.log(allMemes)

    function getMemeImage(){
        const randonNum = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randonNum].url
        // console.log(url)
        setMeme(prevMeme => {
            return{
                ...prevMeme,
                randomImage: url
            }
        })
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]:value
        }))
    }

    return(
        <main>
            <div className="form">
                <div>
                     <label className="label" htmlFor="top--text">Top Text</label>
                <input 
                    id="top--text" 
                    type="text" 
                    className="form--input" 
                    placeholder="Top Text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                </div>
               <div>
                 <label className="label" htmlFor="bottom--text">Bottom Text</label>
                 <input 
                    id="bottom--text" 
                    type="text" 
                    className="form--input" 
                    placeholder="Bottom Text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
               </div>
                <button className="form--button" onClick={getMemeImage}>Generate New Image</button>
            </div>
            <div className="meme"> 
                <img className="meme--image" src={meme.randomImage} alt="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            
        </main>
    )
}