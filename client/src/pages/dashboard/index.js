"use server"
const index = () => {
    const handleClick = ()=>{
        console.log("click me")
    }
  return (

    <button onClick={handleClick}> inside dashboard</button>
  )
}

export default index