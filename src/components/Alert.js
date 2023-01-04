import React from 'react'

const Alert = (props) => {
  const capitalize = (word) =>{
    const lower = word.toLowerCase();
    if (lower== "danger"){
        return "Error"
    }
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
   props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show w-30 text-center"`} role="alert" style={ {position: "absolute" ,zIndex: "10000000000", right: 0, top: 180}}>
        <strong className='pr-3'>{capitalize(props.alert.type)}</strong> {props.alert.msg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
  )
}

export default Alert