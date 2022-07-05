import React, {useState, useEffect} from "react";
import { doc, getDoc  } from "firebase/firestore";
import {db} from '../firebase/firebase'
import {toast} from 'react-toastify'


export const LinkForm = ({addTask, links, currenId}) => {



  const initialState = {
    url: '',
    name: '',
    description: ''
  }

    const [values, setValues] = useState(initialState)

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    const validateUrl = string => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(string);
    }

    const getLinkById = async(id) => {
      const linkkDocRef = doc(db, "links", id); 
      const docSnap = await getDoc(linkkDocRef);


      if (docSnap.exists()) {
        setValues(docSnap.data())
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!validateUrl(values.url)){
          return toast('Url Invalid', {
            type: 'error',
            autoClose: 2000
          })
        }
        addTask(values)
        setValues(initialState)
    }

    useEffect(() => {
      if(currenId === ''){
        setValues(initialState)
      }else{
        getLinkById(currenId)
      }
    }, [currenId])

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          value={values.url}
          onChange={handleInputChange}
          type="text"
          className="form-control "
          placeholder="https://someurl.com"
          name="url"
        />
      </div>
      
      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
            <i className="material-icons">create</i>
        </div>
        <input
          value={values.name}
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="Website name"
          name="name"
        />
      </div>

      <div className="form-group mb-2">
        <textarea value={values.description} onChange={handleInputChange} name="description" rows="3" className="form-control" placeholder="Write a description"></textarea>
      </div>

      <button className="btn btn-primary btn-block">{currenId === '' ? 'Save' : 'Update'}</button>
    </form>
  );
};
