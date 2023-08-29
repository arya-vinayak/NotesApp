import {useState,useEffect} from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { notesCollection,db } from "./firebase"
import { doc, onSnapshot,addDoc,setDoc,deleteDoc } from "firebase/firestore";

export default function App() {
    const [notes, setNotes] = useState([])
    const [currentNoteId, setCurrentNoteId] = useState("")
    const [tempNoteText,setTempNoteText] = useState("")
    
    const sortedArr = notes.sort((a,b)=>b.updatedAt - a.updatedAt)

    
    


    useEffect(()=>
    {
        if(!currentNoteId)
        {
            setCurrentNoteId(notes[0])
        }

    },[notes])

    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]

    
    useEffect(() => {
        const unsubscribe =onSnapshot(notesCollection,(snapshot)=>
        {
            const notesArr = snapshot.docs.map((doc)=>
            {
                return {...doc.data(),id : doc.id}
            })
            setNotes(notesArr)
        })
        
        return unsubscribe

    }, [])

    //this to maintain tempText in sync with currentNote data
    //By using the optional chaining operator (?.), you are checking if currentNote is defined before attempting to access its body property. If currentNote is undefined, the expression currentNote?.body will result in undefined, and setting tempNoteText to undefined won't cause an error.
    useEffect(()=>{
        setTempNoteText(currentNote?.body)
    },[currentNote])


    //debouncing 

    useEffect(()=>
    {
        const timeoutId = setTimeout(()=>
        {
            if(tempNoteText !== currentNote.body)
            {
                updateNote(tempNoteText)

            }
        },500)

        return ()=>
        {
            clearTimeout(timeoutId)
        }

    },[tempNoteText])



    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt:Date.now(),
            updatedAt:Date.now()
        }
        // setNotes(prevNotes => [newNote, ...prevNotes])
        // setCurrentNoteId(newNote.id)

        const noteRef = await addDoc(notesCollection,newNote)
        setCurrentNoteId(noteRef.id)
    }

    async function updateNote(text) {
        // setNotes(oldNotes => {
        //     const newArray = []
        //     const dummy = oldNotes.map((note)=>
        //     {
        //         note.id === currentNoteId ? newArray.unshift({...note,body:text}):newArray.push(note)
        //     })
        //     return newArray
        // })
        const noteRef = doc(db,"notes",currentNoteId)
        await setDoc(noteRef,{body:text,updatedAt:Date.now()},{merge : true})
    }

    async function deleteNote(event, noteId) {
        // event.stopPropagation()
        // setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
        const docRef = doc(db,"notes",noteId)
        await deleteDoc(docRef)
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={sortedArr}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        <Editor
                            tempNoteText={tempNoteText}
                            setTempNoteText={setTempNoteText}
                        />
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>

            }
        </main>
    )
}
