import React,{useState} from "react";

function NewPoemForm(props) {
  const [formData,setFormData]=useState({
 
    title: "",
    content: "",
    author: ""
  })

    function handleChange(event) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }

 function handleSubmit(event){
  event.preventDefault();
    fetch("http://localhost:8004/poems", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "title": formData.title,
        "content": formData.content,
        "author": formData.author,
      })
    })
     .then(res => res.json())
     .then(data => props.onAdd(data))
     setFormData("");
 }

  return (
    <form onSubmit={handleSubmit} className="new-poem-form">
      <input name="title" onChange={handleChange}  value={formData.title} placeholder="Title" />
      <input name="author" onChange={handleChange}   value={formData.author} placeholder="Author" />
      <textarea name="content" onChange={handleChange} value={formData.content} placeholder="Write your masterpiece here..." rows={10} />
      <input type="submit" value="Share your masterpiece" />
    </form>
  );
}

export default NewPoemForm;
