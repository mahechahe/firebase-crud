import React, {useEffect, useState} from 'react'
import { LinkForm } from './LinkForm'
import {db} from '../firebase/firebase'
import {toast} from 'react-toastify'
import { collection, addDoc, onSnapshot, query,  doc, deleteDoc, updateDoc } from "firebase/firestore";
 
export const Links = () => {

  const [links, setLinks] = useState([])
  const [currenId, setCurrenId] = useState('')


  const addTask = async(linkObject) => {
    if(currenId === ''){

      try {
        await addDoc(collection(db, "links"), {
          url: linkObject.url,
          name: linkObject.name,
          description: linkObject.description
        });
  
        toast('New Link Added', {
          type: 'success',
          autoClose: 2000
        })
      } catch (e) {
        toast('Link Added Incorrect', {
          type: 'error',
          autoClose: 2000
        })
      }

    }else{
      try{
        const linkkDocRef = doc(db, "links", currenId);
        await updateDoc(linkkDocRef, linkObject);
        toast('Link Updated Successfully', {
          type: 'info',
          autoClose: 2000
        })
      }catch(err){
        toast('Link Updated Incorrect', {
          type: 'error',
          autoClose: 2000
        })
      }
    }
    setCurrenId('')
    
  }

  const getLinks = async() => {
    const q = query(collection(db, "links"));

    onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
          docs.push({...doc.data(), id: doc.id})
      });
      setLinks(docs)
    });
  }

  const onDeleteLink = async(id) => {
    if(window.confirm('are you sure you want to delete this link?')){
      await deleteDoc(doc(db, "links", id));
      toast('Link Removed Successfully', {
        type: 'error',
        autoClose: 2000
      })
    }
  }

  useEffect(() => {
    getLinks()
  }, [])

  return (
    <div>
        <div className='col-md-4 p-2'>
          <LinkForm links={links} currenId={currenId} addTask={addTask}></LinkForm>
        </div>
        <div className="col-md-8 p-2">
          {links.map(link => (
            <div className='card mb-1 mt-1' key={link.id}>
              <div className="card-body">
                <div className='d-flex justify-content-between'>
                  <h4>{link.name}</h4>
                  <div>
                    <i className='material-icons text-danger' onClick={() => onDeleteLink(link.id)}>close</i>
                    <i className='material-icons' onClick={() => setCurrenId(link.id)}>create</i>
                  </div>
                </div>
                <p>{link.description}</p>
                <a href={link.url} target="_blank" rel="noreferrer">Go to Website</a>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
