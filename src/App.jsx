import { RiBook2Line } from "react-icons/ri";
import { FaMoon } from "react-icons/fa6";
import { IoMdSunny } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import './App.css'
import {useRef,useState} from "react";
import Modal from "./components/Modal"

function App() {

  const [word, setWord] = useState([])
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [openModal, setOpenModal] = useState(true)
  const audioRef = useRef (null)

  const play = ()=>{
    if(audioRef.current){
      audioRef.current.play()
    }
  }


  async function getApi (){
    setOpenModal(false)
    setWord([])
    setError("")
    try{
      const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.toLocaleLowerCase()}`)
      if(resp.ok){
        const data = await resp.json()
        if (data && data.length > 0) {
          setWord(data) // Se houver dados, atualize o estado com a palavra
        } else {
          setError("No Definitions Found. Sorry pal, we couldn't find definitions for the word you were looking for.") // Mensagem caso a palavra não seja encontrada
        }
      }else {
        setError("No Definitions Found. Sorry pal, we couldn't find definitions for the word you were looking for.") // Mensagem para qualquer erro HTTP
      }
      
    }catch(error){
      
    }
  }

  const dark = ()=>{
    document.querySelector("body").setAttribute('data-theme', 'dark')
  }

  const light = ()=>{
    document.querySelector("body").setAttribute('data-theme', 'light')
  }

  const toggle = (e) =>{
    if(e.target.checked){
      dark()
    }else{
      light()
    }
  }

  const keydonw = (e)=>{
    if(e.code === "Enter"){
      getApi()
    }
  }

    return (
      <>
      <main className="main">
        <div className="top">
          <div className="book">
          <RiBook2Line />
          </div>
          <div className="mode">
          <input type="checkbox" className='checkbox' id='chk' onChange={toggle}/>
              <label for="chk" className="label">
                <FaMoon color="black"/>
                <IoMdSunny color="yellow"/>
                <div className="ball"></div>
              </label>
          </div>
        </div>
        <div className="top-input">
          <div className="input">
            <input 
            type="text" 
            id="input"
            value={input}
            placeholder="Enter the word..."
            onKeyDown={keydonw}
            onChange={(e)=>{
              setInput(e.target.value)
            }}/>
            <CiSearch color="#a544e8" fontSize={23} cursor={'pointer'}
            onClick={getApi}/>
          </div>
        </div>
        {/* Exibir a mensagem de erro, se houver */}
        {error && <p className="error">{error}</p>}
        
        {/* Exibir conteúdo se a palavra foi encontrada */}
        {word.length > 0 && 
        <div className="content-body">
        <div className="word">
          <div className="word-search">
            <h1>{word[0].word}</h1>
            <p>{word[0].phonetic}</p>
          </div>
          
          {word[0].phonetics && word[0].phonetics[0] && word[0].phonetics[0].audio &&
                <div className="audio">
                  <audio ref={audioRef} src={word[0].phonetics[0].audio} controls />
                  <button onClick={play} id="play"><FaPlay /></button>
                </div>
              }
          
        </div>
        <div className="corpo">
        {word.map((part) => (
            part.meanings.map((partOf, index) => (
              <div className="corp" key={index}>
                <div className="types">
                  <p className="type">{partOf.partOfSpeech}</p>
                  <p className="line"></p>
                </div>
                <p className="paragraph">Meaning</p>
                <ul className="content-text">
                  {partOf.definitions.map((definition, defIndex) => (
                   <div>
                     <li key={defIndex}>{definition.definition}</li>
                   </div>
                    
                  ))}
                  
                </ul>
                
              </div>
            ))
          ))}
          <div className="synonymus">
            <p className="para">Synonymus</p>
            {word.map((item)=>(
              item.meanings.map((valor, i)=>(
                <p className="syno" key={i}>{valor.synonyms[i]}</p>
              ))
            ))}
          </div>
          <p className="line"></p>
        </div>
        <div className="source">
          <div className="word-source">
            <p>Source</p>
            <a href={word[0].sourceUrls[0]}>{word[0].sourceUrls[0]}</a>
          </div>
        </div>
        <div className="bottom">
        </div>
        </div>
        }
        <Modal isOpen={openModal} />
      </main>
      </>
    )
}

export default App
