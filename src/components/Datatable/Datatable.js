import React,{ memo, useState, useEffect } from 'react';

const Datatable = ({data, width, height}) => {
  const [hasError, setHasError] = useState(false)

  const renderTheadHandler = (heads) => {
    return heads.map((head, i) => {
      return(
        <th key={i} className="datatable-headbox">{head.replace("_", " ")}</th>
      )
    })
  }
  const renderTBodyHandler = (arr) => {
    return (arr.map((obj, i)=>{
      return(
        <tr key={i} className="datatable-body_row">
          {Object.values(obj).map((v, j)=>{
            return <td key={j} className="datatable-box">{v}</td>
          })}
        </tr>
      )
    }))
  }
  useEffect(()=>{
    if(data === undefined || data === null || data.length === 0){
      setHasError(true)
    }
    else{
      let data_len = Object.keys(data[0]).length;
      for(let i of data){
        if(Object.keys(i).length !== data_len){
          setHasError(true)
          break
        }
      }
    }
  }, [data])
  
  return (
    hasError ?
      <p className="datatable-error">Error with datatable component!</p> :
      <div className="datatable" style={{width, height}}>
        <table className="datatable-table" cellPadding={0}>
          <thead>
            <tr className="datatable-head">
              {renderTheadHandler(Object.keys(data[0]))}
            </tr>
          </thead>
          <tbody>
            {renderTBodyHandler(data)}
          </tbody>
        </table>
      </div>
    );
}

export default memo(Datatable);
