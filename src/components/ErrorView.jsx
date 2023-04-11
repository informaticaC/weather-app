import React from 'react'

const ErrorView = (err) => {
    console.log(err.message)
    //  switch(err.code) {
    //      case err.PERMISSION_DENIED:
    //          console.log(err.PERMISSION_DENIED)
    //          break;
    //      case err.POSITION_UNAVAILABLE:
    //          // La ubicación no está disponible.
    //          break;
    //      case err.TIMEOUT:
    //          // Se ha excedido el tiempo para obtener la ubicación.
    //          break;
    //      case err.UNKNOWN_ERROR:
    //          // Un error desconocido.
    //          break;
    //    }


  return (
    <div>`ErrorView: ${err.message} `</div>
  )
}

export default ErrorView


